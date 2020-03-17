# Mybatis-Spring源码分析

我们在写配置文件的时候会使用`@MapperScan`注解标识mybatis要扫描的mapper类，Spring容器在处理`@Configuration`注解的时候会调用第三方的实现类`MapperScannerRegistrar`调用 `registerBeanDefinitions`方法包mybatis需要的类注册进来.

```java
  @Override
  public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {

    AnnotationAttributes annoAttrs = AnnotationAttributes.fromMap(importingClassMetadata.getAnnotationAttributes(MapperScan.class.getName()));
    ClassPathMapperScanner scanner = new ClassPathMapperScanner(registry);

    .....省略一万字
      
    scanner.doScan(StringUtils.toStringArray(basePackages));
  }
```

`registerBeanDefinitions`方法中实例化了一个`ClassPathMapperScanner`对象，调用`doScan`方法去扫描需要的类。

```java
@Override
  public Set<BeanDefinitionHolder> doScan(String... basePackages) {
    //调用父类的扫描方法  
    Set<BeanDefinitionHolder> beanDefinitions = super.doScan(basePackages);

    if (beanDefinitions.isEmpty()) {
      logger.warn("No MyBatis mapper was found in '" + Arrays.toString(basePackages) + "' package. Please check your configuration.");
    } else {
      //此处关键，处理每个beanDefinition对象生成一个MapperFactoryBean
      processBeanDefinitions(beanDefinitions);
    }

    return beanDefinitions;
  }
```

扫描完成需要注册的类之后，因为mybatis使用的是接口类，没有实现类，不能注册到spring容器中，所有在`processBeanDefinitions`方法中将每个mapper接口的实现类都加上了`MapperFactoryBean`为实现类。并设置它的装配模式为`AbstractBeanDefinition.AUTOWIRE_BY_TYPE`( by type)以及其他的相关属性

```java
private void processBeanDefinitions(Set<BeanDefinitionHolder> beanDefinitions) {
    GenericBeanDefinition definition;
    for (BeanDefinitionHolder holder : beanDefinitions) {
      definition = (GenericBeanDefinition) holder.getBeanDefinition();

      if (logger.isDebugEnabled()) {
        logger.debug("Creating MapperFactoryBean with name '" + holder.getBeanName() 
          + "' and '" + definition.getBeanClassName() + "' mapperInterface");
      }

      // the mapper interface is the original class of the bean
      // but, the actual class of the bean is MapperFactoryBean
      definition.getConstructorArgumentValues().addGenericArgumentValue(definition.getBeanClassName()); // issue #59
        
       //此处关键，为每一个bean的实现类配置为mapperFactoryBean
      definition.setBeanClass(this.mapperFactoryBean.getClass());

      definition.getPropertyValues().add("addToConfig", this.addToConfig);

      boolean explicitFactoryUsed = false;
      if (StringUtils.hasText(this.sqlSessionFactoryBeanName)) {
        definition.getPropertyValues().add("sqlSessionFactory", new RuntimeBeanReference(this.sqlSessionFactoryBeanName));
        explicitFactoryUsed = true;
      } else if (this.sqlSessionFactory != null) {
        definition.getPropertyValues().add("sqlSessionFactory", this.sqlSessionFactory);
        explicitFactoryUsed = true;
      }

      if (StringUtils.hasText(this.sqlSessionTemplateBeanName)) {
        if (explicitFactoryUsed) {
          logger.warn("Cannot use both: sqlSessionTemplate and sqlSessionFactory together. sqlSessionFactory is ignored.");
        }
        definition.getPropertyValues().add("sqlSessionTemplate", new RuntimeBeanReference(this.sqlSessionTemplateBeanName));
        explicitFactoryUsed = true;
      } else if (this.sqlSessionTemplate != null) {
        if (explicitFactoryUsed) {
          logger.warn("Cannot use both: sqlSessionTemplate and sqlSessionFactory together. sqlSessionFactory is ignored.");
        }
        definition.getPropertyValues().add("sqlSessionTemplate", this.sqlSessionTemplate);
        explicitFactoryUsed = true;
      }

      if (!explicitFactoryUsed) {
        if (logger.isDebugEnabled()) {
          logger.debug("Enabling autowire by type for MapperFactoryBean with name '" + holder.getBeanName() + "'.");
        }
          //默认为NO,设置为BY_TYPE
        definition.setAutowireMode(AbstractBeanDefinition.AUTOWIRE_BY_TYPE);
      }
    }
  }
```

根据源码我们可以发现，Mybatis每次获取一个mapper对象其实都是一个代理类MapperFactoryBean