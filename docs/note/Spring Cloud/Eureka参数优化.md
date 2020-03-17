# Eureka参数优化

* 设置CacheUpdateTask的调度时间间隔，用于从readWriteCacheMap更新数据到readOnlyCacheMap，仅仅在eureka.server.use-read-only-response-cache为true的时候才生效

  ```properties
  eureka.server.response-cache-update-interval-ms=3000
  ```

* 表示eureka client间隔多久去拉取服务注册信息，默认为30秒，对于api-gateway，如果要迅速获取服务注册状态，可以缩小该值，比如5秒 

  ```properties
  eureka.client.registry-fetch-interval-seconds=3
  ```

* 指示eureka服务器在删除此实例之前收到最后一次心跳之后等待的时间（s）默认为30秒

  ```properties
  eureka.instance.lease-renewal-interval-in-seconds=3
  ```

* eureka server清理无效节点的时间间隔，默认60000毫秒，即60秒

  ```properties
  eureka.server.eviction-interval-timer-in-ms=6000
  ```

* leaseExpirationDurationInSeconds，表示eureka server至上一次收到client的心跳之后，等待下一次心跳的超时时间，在这个时间内若没收到下一次心跳，则将移除该instance

  默认为90秒

  如果该值太大，则很可能将流量转发过去的时候，该instance已经不存活了。

  如果该值设置太小了，则instance则很可能因为临时的网络抖动而被摘除掉。

  该值至少应该大于leaseRenewalIntervalInSeconds

  ```properties
  eureka.instance.lease-expiration-duration-in-seconds=6
  ```

* 线上**建议**关闭自我保护机制

  ```properties
  eureka.server.enable-self-preservation=false
  ```

  

以上配置后，基本可以实现服务时效性在秒级