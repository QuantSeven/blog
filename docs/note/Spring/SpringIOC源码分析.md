# SpringIOC源码分析

1. **`AnnotationConfigApplicationContext `对注解Bean 初始化**

   ```java
   public class AnnotationConfigApplicationContext extends GenericApplicationContext implements AnnotationConfigRegistry {
       private final AnnotatedBeanDefinitionReader reader;
       private final ClassPathBeanDefinitionScanner scanner;
   
       //默认构造函数，初始化一个空容器，容器不包含任何Bean 信息，需要在稍后通过调用其register()
       //方法注册配置类，并调用refresh()方法刷新容器，触发容器对注解Bean 的载入、解析和注册过程
       public AnnotationConfigApplicationContext() {
           this.reader = new AnnotatedBeanDefinitionReader(this);
           this.scanner = new ClassPathBeanDefinitionScanner(this);
       }
   
       public AnnotationConfigApplicationContext(DefaultListableBeanFactory beanFactory) {
           super(beanFactory);
           this.reader = new AnnotatedBeanDefinitionReader(this);
           this.scanner = new ClassPathBeanDefinitionScanner(this);
       }
   
       //最常用的构造函数，通过将涉及到的配置类传递给该构造函数，以实现将相应配置类中的Bean 自动注册到容器中
       public AnnotationConfigApplicationContext(Class<?>... componentClasses) {
           this();
           this.register(componentClasses);
           this.refresh();
       }
   	//该构造函数会自动扫描以给定的包及其子包下的所有类，并自动识别所有的Spring Bean，将其注册到容器中
       public AnnotationConfigApplicationContext(String... basePackages) {
           this();
           this.scan(basePackages);
           this.refresh();
       }
   
       public void setEnvironment(ConfigurableEnvironment environment) {
           super.setEnvironment(environment);
           this.reader.setEnvironment(environment);
           this.scanner.setEnvironment(environment);
       }
   
       public void setBeanNameGenerator(BeanNameGenerator beanNameGenerator) {
           this.reader.setBeanNameGenerator(beanNameGenerator);
           this.scanner.setBeanNameGenerator(beanNameGenerator);
           this.getBeanFactory().registerSingleton("org.springframework.context.annotation.internalConfigurationBeanNameGenerator", beanNameGenerator);
       }
   
       public void setScopeMetadataResolver(ScopeMetadataResolver scopeMetadataResolver) {
           this.reader.setScopeMetadataResolver(scopeMetadataResolver);
           this.scanner.setScopeMetadataResolver(scopeMetadataResolver);
       }
   
       public void register(Class<?>... componentClasses) {
           Assert.notEmpty(componentClasses, "At least one component class must be specified");
           this.reader.register(componentClasses);
       }
   
       public void scan(String... basePackages) {
           Assert.notEmpty(basePackages, "At least one base package must be specified");
           this.scanner.scan(basePackages);
       }
   
       public <T> void registerBean(@Nullable String beanName, Class<T> beanClass, @Nullable Supplier<T> supplier, BeanDefinitionCustomizer... customizers) {
           this.reader.registerBean(beanClass, beanName, supplier, customizers);
       }
   }
   ```

   通过对AnnotationConfigApplicationContext 的源码分析，我们了解到Spring 对注解的处理分为
   两种方式:

   * (1).接将注解Bean 注册到容器中：
     可以在初始化容器时注册；也可以在容器创建之后手动调用注册方法向容器注册，然后通过手动刷新容
     器，使得容器对注册的注解Bean 进行处理

   * (2).通过扫描指定的包及其子包下的所有类

     在初始化注解容器时指定要自动扫描的路径，如果容器创建以后向给定路径动态添加了注解Bean，则
     需要手动调用容器扫描的方法，然后手动刷新容器，使得容器对所注册的Bean 进行处理。
     接下来，将会对两种处理方式详细分析其实现过

2. **`AnnotationConfigApplicationContext `注册注解Bean**

   ```java
    private <T> void doRegisterBean(Class<T> beanClass, @Nullable String name, @Nullable Class<? extends Annotation>[] qualifiers, @Nullable Supplier<T> supplier, @Nullable BeanDefinitionCustomizer[] customizers) {
        //根据指定的注解Bean 定义类，创建Spring 容器中对注解Bean 的封装的数据结构
           AnnotatedGenericBeanDefinition abd = new AnnotatedGenericBeanDefinition(beanClass);
           if (!this.conditionEvaluator.shouldSkip(abd.getMetadata())) {
               abd.setInstanceSupplier(supplier);
               ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(abd);
               abd.setScope(scopeMetadata.getScopeName());
               String beanName = name != null ? name : this.beanNameGenerator.generateBeanName(abd, this.registry);
               //处理注解Bean 定义中的通用注解
               AnnotationConfigUtils.processCommonDefinitionAnnotations(abd);
               int var10;
               int var11;
               if (qualifiers != null) {
                   Class[] var9 = qualifiers;
                   var10 = qualifiers.length;
   				//如果在向容器注册注解Bean 定义时，使用了额外的限定符注解，则解析限定符注解。
   //主要是配置的关于autowiring 自动依赖注入装配的限定条件，即@Qualifier 注解
   //Spring 自动依赖注入装配默认是按类型装配，如果使用@Qualifier 则按名称
                   for(var11 = 0; var11 < var10; ++var11) {
                       Class<? extends Annotation> qualifier = var9[var11];
                       if (Primary.class == qualifier) {
                           abd.setPrimary(true);
                       } else if (Lazy.class == qualifier) {
                           abd.setLazyInit(true);
                       } else {
                           abd.addQualifier(new AutowireCandidateQualifier(qualifier));
                       }
                   }
               }
   
               if (customizers != null) {
                   BeanDefinitionCustomizer[] var13 = customizers;
                   var10 = customizers.length;
   
                   for(var11 = 0; var11 < var10; ++var11) {
                       BeanDefinitionCustomizer customizer = var13[var11];
                       customizer.customize(abd);
                   }
               }
   //创建一个指定Bean 名称的Bean 定义对象，封装注解Bean 定义类数据
               BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(abd, beanName);
               definitionHolder = AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);
               //向IOC 容器注册注解Bean 类定义对象
               BeanDefinitionReaderUtils.registerBeanDefinition(definitionHolder, this.registry);
           }
       }
   ```

   从上面的源码我们可以看出，注册注解Bean 定义类的基本步骤：

   * (1)需要使用注解元数据解析器解析注解Bean 中关于作用域的配置
   * (2)使用AnnotationConfigUtils 的processCommonDefinitionAnnotations 方法处理注解Bean
     定义类中通用的注解
   * (3)使用AnnotationConfigUtils 的applyScopedProxyMode 方法创建对于作用域的代理对象
   * (4)通过BeanDefinitionReaderUtils 向容器注册Bean

3. **`ClassPathBeanDefinitionScanner `扫描给定的包及其子包**

   AnnotationConfigApplicationContext 通过调用类路径Bean 定义扫描器ClassPathBeanDefinitionScanner 扫描给定包及其子包下的所有类，主要源码如

   ```java
   protected Set<BeanDefinitionHolder> doScan(String... basePackages) {
           Assert.notEmpty(basePackages, "At least one base package must be specified");
           Set<BeanDefinitionHolder> beanDefinitions = new LinkedHashSet();
           String[] var3 = basePackages;
           int var4 = basePackages.length;
   
           for(int var5 = 0; var5 < var4; ++var5) {
               String basePackage = var3[var5];
               Set<BeanDefinition> candidates = this.findCandidateComponents(basePackage);
               Iterator var8 = candidates.iterator();
   
               while(var8.hasNext()) {
                   BeanDefinition candidate = (BeanDefinition)var8.next();
                   ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(candidate);
                   candidate.setScope(scopeMetadata.getScopeName());
                   String beanName = this.beanNameGenerator.generateBeanName(candidate, this.registry);
                   if (candidate instanceof AbstractBeanDefinition) {
                       this.postProcessBeanDefinition((AbstractBeanDefinition)candidate, beanName);
                   }
   
                   if (candidate instanceof AnnotatedBeanDefinition) {
                       AnnotationConfigUtils.processCommonDefinitionAnnotations((AnnotatedBeanDefinition)candidate);
                   }
   
                   if (this.checkCandidate(beanName, candidate)) {
                       BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(candidate, beanName);
                       definitionHolder = AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);
                       beanDefinitions.add(definitionHolder);
                       this.registerBeanDefinition(definitionHolder, this.registry);
                   }
               }
           }
   
           return beanDefinitions;
       }
   
   ```

   类路径Bean 定义扫描器ClassPathBeanDefinitionScanner 主要通过findCandidateComponents
   方法调用其父类ClassPathScanningCandidateComponentProvider 类来扫描获取给定包及其子包
   下的类

4. `refresh()`方法

   ```java
    public void refresh() throws BeansException, IllegalStateException {
           synchronized(this.startupShutdownMonitor) {
               this.prepareRefresh();
               
               ConfigurableListableBeanFactory beanFactory = this.obtainFreshBeanFactory();
               //为BeanFactory 配置容器特性，例如类加载器、事件处理器等
               this.prepareBeanFactory(beanFactory);
   
               try {
                   //为容器的某些子类指定特殊的BeanPost 事件处理器
                   this.postProcessBeanFactory(beanFactory);
                   //调用所有注册的BeanFactoryPostProcessor 的Bean
                   this.invokeBeanFactoryPostProcessors(beanFactory);
                   //为BeanFactory 注册BeanPost 事件处理器.
   				//BeanPostProcessor 是Bean 后置处理器，用于监听容器触发的事件
                   this.registerBeanPostProcessors(beanFactory);
                   //初始化信息源，和国际化相关
                   this.initMessageSource();
                   //初始化容器事件传播器
                   this.initApplicationEventMulticaster();
                   //调用子类的某些特殊Bean 初始化方法
                   this.onRefresh();
                   //为事件传播器注册事件监听器.
                   this.registerListeners();
                   //初始化所有剩余的单例Bean
                   this.finishBeanFactoryInitialization(beanFactory);
                   //初始化容器的生命周期事件处理器，并发布容器的生命周期事件
                   this.finishRefresh();
               } catch (BeansException var9) {
                   if (this.logger.isWarnEnabled()) {
                       this.logger.warn("Exception encountered during context initialization - cancelling refresh attempt: " + var9);
                   }
   
                   this.destroyBeans();
                   this.cancelRefresh(var9);
                   throw var9;
               } finally {
                   this.resetCommonCaches();
               }
   
           }
       }
   ```

   ConfigurableListableBeanFactorybeanFactory = obtainFreshBeanFactory();启动了Bean定义资源的载入、注册过程，而finishBeanFactoryInitialization 方法是对注册后的Bean 定义中的预实例化(lazy-init=false,Spring 默认就是预实例化,即为true)的Bean 进行处理的地方

5. 