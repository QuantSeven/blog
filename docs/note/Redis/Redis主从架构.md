# Redis主从架构

## redis replication的核心机制

* redis采用异步方式复制数据到slave节点，不过redis 2.8开始，slave node会周期性地确认自己每次复制的数据量
* 一个master node是可以配置多个slave node的
* slave node也可以连接其他的slave node
* slave node做复制的时候，是不会block master node的正常工作的
* slave node在做复制的时候，也不会block对自己的查询操作，它会用旧的数据集来提供服务; 但是复制完成的时候，需要删除旧数据集，加载新数据集，这个时候就会暂停对外服务了
* slave node主要用来进行横向扩容，做读写分离，扩容的slave node可以提高读的吞吐量

## master持久化对于主从架构的安全保障的意义

> 如果采用了主从架构，那么建议必须开启master node的持久化！
>
> 不建议用slave node作为master node的数据热备，因为那样的话，如果你关掉master的持久化，可能在master宕机重启的时候数据是空的，然后可能一经过复制，salve node数据也丢了
>
> master -> RDB和AOF都关闭了 -> 全部在内存中
>
> master宕机，重启，是没有本地数据可以恢复的，然后就会直接认为自己IDE数据是空的
>
> master就会将空的数据集同步到slave上去，所有slave的数据全部清空
>
> 100%的数据丢失
>
> master节点，必须要使用持久化机制
>
> 第二个，master的各种备份方案，要不要做，万一说本地的所有文件丢失了; 从备份中挑选一份rdb去恢复master; 这样才能确保master启动的时候，是有数据的
>
> 即使采用了后续讲解的高可用机制，slave node可以自动接管master node，但是也可能sentinal还没有检测到master failure，master node就自动重启了，还是可能导致上面的所有slave node数据清空故障

## 主从架构的核心原理

> 当启动一个slave node的时候，它会发送一个PSYNC命令给master node
>
> 如果这是slave node重新连接master node，那么master node仅仅会复制给slave部分缺少的数据; 否则如果是slave node第一次连接master node，那么会触发一次full resynchronization
>
> 开始full resynchronization的时候，master会启动一个后台线程，开始生成一份RDB快照文件，同时还会将从客户端收到的所有写命令缓存在内存中。RDB文件生成完毕之后，master会将这个RDB发送给slave，slave会先写入本地磁盘，然后再从本地磁盘加载到内存中。然后master会将内存中缓存的写命令发送给slave，slave也会同步这些数据。
>
> slave node如果跟master node有网络故障，断开了连接，会自动重连。master如果发现有多个slave node都来重新连接，仅仅会启动一个rdb save操作，用一份数据服务所有slave node。

## 主从复制的断点续传

> 从redis 2.8开始，就支持主从复制的断点续传，如果主从复制过程中，网络连接断掉了，那么可以接着上次复制的地方，继续复制下去，而不是从头开始复制一份
>
> master node会在内存中常见一个backlog，master和slave都会保存一个replica offset还有一个master id，offset就是保存在backlog中的。如果master和slave网络连接断掉了，slave会让master从上次的replica offset开始继续复制
>
> 但是如果没有找到对应的offset，那么就会执行一次resynchronization

## 无磁盘化复制

> master在内存中直接创建rdb，然后发送给slave，不会在自己本地落地磁盘了
>
> repl-diskless-sync
> repl-diskless-sync-delay，等待一定时长再开始复制，因为要等更多slave重新连接过来

## 过期key处理

> slave不会过期key，只会等待master过期key。如果master过期了一个key，或者通过LRU淘汰了一个key，那么会模拟一条del命令发送给slave。