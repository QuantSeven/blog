# Redis面试题

1. <font size=3>**redis和memcached有什么区别？redis的线程模型是什么？为什么单线程的redis比多线程的memcached效率要高得多（为什么redis是单线程的但是还可以支撑高并发）？**</font>

* 面试官心里分析 

  > 这个是问redis的时候，最基本的问题吧，redis最基本的一个内部原理和特点，就是redis实际上是个单线程工作模型，你要是这个都不知道，那后面玩儿redis的时候，出了问题岂不是什么都不知道？

  > 还有可能面试官会问问你redis和memcached的区别，不过说实话，最近这两年，我作为面试官都不太喜欢这么问了，memched是早些年各大互联网公司常用的缓存方案，但是现在近几年基本都是redis，没什么公司用memcached了

* 面试题剖析

  * redis和memcached有啥区别

    > * 1）Redis支持服务器端的数据操作：Redis相比Memcached来说，拥有更多的数据结构和并支持更丰富的数据操作，通常在Memcached里，你需要将数据拿到客户端来进行类似的修改再set回去。这大大增加了网络IO的次数和数据体积。在Redis中，这些复杂的操作通常和一般的GET/SET一样高效。所以，如果需要缓存能够支持更复杂的结构和操作，那么Redis会是不错的选择。
    >
    > * 2）内存使用效率对比：使用简单的key-value存储的话，Memcached的内存利用率更高，而如果Redis采用hash结构来做key-value存储，由于其组合式的压缩，其内存利用率会高于Memcached。
    >
    > * 3）性能对比：由于Redis只使用单核，而Memcached可以使用多核，所以平均每一个核上Redis在存储小数据时比Memcached性能更高。而在100k以上的数据中，Memcached性能要高于Redis，虽然Redis最近也在存储大数据的性能上进行优化，但是比起Memcached，还是稍有逊色。
    >
    > * 4）集群模式：memcached没有原生的集群模式，需要依靠客户端来实现往集群中分片写入数据；但是redis目前是原生支持cluster模式的，redis官方就是支持redis cluster集群模式的，比memcached来说要更好

  * redis的线程模型

     ![](/images/Redis单线程模型.png)

  * 为啥redis单线程模型也能效率这么高

    > * 纯内存操作  
    >
    > * 核心是基于非阻塞的IO多路复用机制。
    >
    > * 单线程反而避免了多线程的频繁上下文切换问题。

​      

2. <font size=3>**redis都有哪些数据类型？分别在哪些场景下使用比较合适？**</font> 

* 面试官心里分析

  > 除非是我感觉看你简历，就是工作3年以内的比较初级的一个同学，可能对技术没有很深入的研究过，我才会问这类问题，在宝贵的面试时间里，我实在是不想多问
  >
  > 其实问这个问题呢。。。主要就俩原因
  >
  > 第一，看看你到底有没有全面的了解redis有哪些功能，一般怎么来用，啥场景用什么，就怕你别就会最简单的kv操作
  >
  > 第二，看看你在实际项目里都怎么玩儿过redis
  >
  > 要是你回答的不好，没说出几种数据类型，也没说什么场景，你完了，面试官对你印象肯定不好，觉得你平时就是做个简单的set和get。

* 面试题剖析

  > **（1）string**
  >
  > 这是最基本的类型了，没啥可说的，就是普通的set和get，做简单的kv缓存
  >
  > **（2）hash**
  >
  > 这个是类似map的一种结构，这个一般就是可以将结构化的数据，比如一个对象（前提是这个对象没嵌套其他的对象）给缓存在redis里，然后每次读写缓存的时候，可以就操作hash里的某个字段。
  >
  > key=150
  >
  > value={
  >   “id”: 150,
  >   “name”: “zhangsan”,
  >   “age”: 20
  > }
  >
  > hash类的数据结构，主要是用来存放一些对象，把一些简单的对象给缓存起来，后续操作的时候，你可以直接仅仅修改这个对象中的某个字段的值
  >
  > value={
  >   “id”: 150,
  >   “name”: “zhangsan”,
  >   “age”: 21
  > }
  >
  > **（3）list**
  >
  > 有序列表，这个是可以玩儿出很多花样的
  >
  > 微博，某个大v的粉丝，就可以以list的格式放在redis里去缓存
  >
  > key=某大v
  >
  > value=[zhangsan, lisi, wangwu]
  >
  > 比如可以通过list存储一些列表型的数据结构，类似粉丝列表了、文章的评论列表了之类的东西
  >
  > 比如可以通过lrange命令，就是从某个元素开始读取多少个元素，可以基于list实现分页查询，这个很棒的一个功能，基于redis实现简单的高性能分页，可以做类似微博那种下拉不断分页的东西，性能高，就一页一页走
  >
  > 比如可以搞个简单的消息队列，从list头怼进去，从list尾巴那里弄出来
  >
  > **（4）set**
  >
  > 无序集合，自动去重
  >
  > 直接基于set将系统里需要去重的数据扔进去，自动就给去重了，如果你需要对一些数据进行快速的全局去重，你当然也可以基于jvm内存里的HashSet进行去重，但是如果你的某个系统部署在多台机器上呢？
  >
  > 得基于redis进行全局的set去重
  >
  > 可以基于set玩儿交集、并集、差集的操作，比如交集吧，可以把两个人的粉丝列表整一个交集，看看俩人的共同好友是谁？对吧
  >
  > 把两个大v的粉丝都放在两个set中，对两个set做交集
  >
  > **（5）sorted set**
  >
  > 排序的set，去重但是可以排序，写进去的时候给一个分数，自动根据分数排序，这个可以玩儿很多的花样，最大的特点是有个分数可以自定义排序规则
  >
  > 比如说你要是想根据时间对数据排序，那么可以写入进去的时候用某个时间作为分数，人家自动给你按照时间排序了
  >
  > 排行榜：将每个用户以及其对应的什么分数写入进去，zadd board score username，接着zrevrange board 0 99，就可以获取排名前100的用户；zrank board username，可以看到用户在排行榜里的排名
  >
  > zadd board 85 zhangsan
  >
  > zadd board 72 wangwu
  >
  > zadd board 96 lisi
  >
  > zadd board 62 zhaoliu
  >
  > 96 lisi
  >
  > 85 zhangsan
  >
  > 72 wangwu
  >
  > 62 zhaoliu
  >
  > zrevrange board 0 3
  >
  > 获取排名前3的用户
  >
  > 96 lisi
  >
  > 85 zhangsan
  >
  > 72 wangwu
  >
  > zrank board zhaoliu

3. <font size=3>**Redis的过期策略都有哪些？内存淘汰机制都有哪些**</font>

* 面试题剖析

  > （1）设置过期时间
  >
  > > 我们set key的时候，都可以给一个expire time，就是过期时间，指定这个key比如说只能存活1个小时？10分钟？这个很有用，我们自己可以指定缓存到期就失效。
  > >
  >
  > 如果假设你设置一个一批key只能存活1个小时，那么接下来1小时后，redis是怎么对这批key进行删除的？
  >
  > **答案是：定期删除+惰性删除**
  >
  > 所谓定期删除，指的是redis默认是每隔100ms就随机抽取一些设置了过期时间的key，检查其是否过期，如果过期就删除。假设redis里放了10万个key，都设置了过期时间，你每隔几百毫秒，就检查10万个key，那redis基本上就死了，cpu负载会很高的，消耗在你的检查过期key上了。注意，这里可不是每隔100ms就遍历所有的设置过期时间的key，那样就是一场性能上的灾难。实际上redis是每隔100ms随机抽取一些key来检查和删除的。
  >
  > 但是问题是，定期删除可能会导致很多过期key到了时间并没有被删除掉，那咋整呢？所以就是惰性删除了。这就是说，在你获取某个key的时候，redis会检查一下 ，这个key如果设置了过期时间那么是否过期了？如果过期了此时就会删除，不会给你返回任何东西。
  >
  > 并不是key到时间就被删除掉，而是你查询这个key的时候，redis再懒惰的检查一下
  >
  > 通过上述两种手段结合起来，保证过期的key一定会被干掉。
  >
  > 很简单，就是说，你的过期key，靠定期删除没有被删除掉，还停留在内存里，占用着你的内存呢，除非你的系统去查一下那个key，才会被redis给删除掉。
  >
  > 但是实际上这还是有问题的，如果定期删除漏掉了很多过期key，然后你也没及时去查，也就没走惰性删除，此时会怎么样？如果大量过期key堆积在内存里，导致redis内存块耗尽了，咋整？
  >
  > **答案是：走内存淘汰机制。**
  >
  > > 如果redis的内存占用过多的时候，此时会进行内存淘汰，有如下一些策略：
  > >
  > > redis 10个key，现在已经满了，redis需要删除掉5个key
  > >
  > > 1个key，最近1分钟被查询了100次
  > >
  > > 1个key，最近10分钟被查询了50次
  > >
  > > 1个key，最近1个小时倍查询了1次
  >
  > 
  >
  > > 1）noeviction：当内存不足以容纳新写入数据时，新写入操作会报错，这个一般没人用吧，实在是太恶心了
  > >
  > > 2）allkeys-lru：当内存不足以容纳新写入数据时，在键空间中，移除最近最少使用的key（这个是最常用的）
  > >
  > > 3）allkeys-random：当内存不足以容纳新写入数据时，在键空间中，随机移除某个key，这个一般没人用吧，为啥要随机，肯定是把最近最少使用的key给干掉啊
  > >
  > > 4）volatile-lru：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，移除最近最少使用的key（这个一般不太合适）
  > >
  > > 5）volatile-random：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，随机移除某个key
  > >
  > > 6）volatile-ttl：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，有更早过期时间的key优先移除

4. <font size=3>**了解什么是redis的雪崩和穿透？redis崩溃之后会怎么样？系统该如何应对这种情况？如何处理redis的穿透？**</font>

   > **(1). 面试官心里分析**
   >
   > 其实这是问到缓存必问的，因为缓存雪崩和穿透，那是缓存最大的两个问题，要么不出现，一旦出现就是致命性的问题。所以面试官一定会问你
   >
   > **(2).面试题剖析**
   >
   > 
   >
   > ​    缓存雪崩发生的现象以及解决方案
   >
   > ​    ![](/images/01_缓存雪崩现象.png) 
   >
   > ​    缓存雪崩的事前事中事后的解决方案
   >
   > ​     a. 事前：redis高可用，主从+哨兵，redis cluster，避免全盘崩溃
   >
   > ​     b. 事中：本地ehcache缓存 + hystrix限流&降级，避免MySQL被打死
   >
   > ​     c. 事后：redis持久化，快速恢复缓存数据
   >
   > 
   >
   > ​    
   > ​     缓存雪崩解决方案:
   >
   > ​    ![](/images/02_如何解决缓存雪崩.png) 
   >
   > ​    
   >
   > ​    缓存穿透现象以及解决方案
   >
   > ​     ![](/images/03_缓存穿透现象以及解决方案.png) 

5.  