# Window 下安装

## 下载地址
[https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch)

## 安装

* 解压缩到本地目录

 ```java
 D:\Development\soft\elasticsearch-7.4.2
 ```

* 运行

 进入到 bin目录
 ![](/images/es-install.png)

 打卡bin文件可以看到elasticsearch.bat，用来启动服务，启动后信息如下

![](/images/es-install-console.png)

**说明：ES的java端口为9300，http端口为9200.**

启动完成之后，在浏览器中访问http://127.0.0.1:9200/，出现如下图所示内容表明Elasticsearch启动成功

![](/images/es-install-success.png)

## 监控插件ElasticSearch HEAD

### 下载地址：
[https://github.com/mobz/elasticsearch-head](https://github.com/mobz/elasticsearch-head)

### 安装
* 解压缩到本地

```java
`D:\Development\soft\elasticsearch-head-5.0.0
```

执行npm install命令安装，再执行npm run start 运行，如下表示成功

![](/images/es-head.png)

访问http://localhost:9100,出现如下图所示界面，在连接地址处输入http://127.0.0.1:9200 Elasticsearch连接成功

![](/images/es-panel.png)


* 说明：
  

正常情况下，集群得健康状态分为三种：

&emsp;&emsp;【1】green 最健康得状态，说明所有的分片包括备份都可用

&emsp;&emsp;【2】yellow 基本的分片可用，但是备份不可用（或者是没有备份）

&emsp;&emsp;【3】red 部分的分片可用，表明分片有一部分损坏。此时执行查询部分数据仍然可以查到

* 配置

在连接ElasticSearch时会出现无连接的情况，此时我们需要对es进行配置文件的修改
在config文件下找到elasticsearch.yml配置文件

![](/images/es-config.png)

在文件中加入如下配置：
```yaml
http.cors.enabled: true
http.cors.allow-origin: "*"
```

重新启动ElasticSearch，在es-head中进行连接即可。