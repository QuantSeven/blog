# Redis的并发竞争问题  

![](/images/Redis并发竞争问题以及解决方案.png)



> 这个也是线上非常常见的一个问题，就是多客户端同时并发写一个key，可能本来应该先到的数据后到了，导致数据版本错了。或者是多客户端同时获取一个key，修改值之后再写回去，只要顺序错了，数据就错了。
>
> 而且redis自己就有天然解决这个问题的CAS类的乐观锁方案

