# Eclipse


* [下载地址](#下载地址)
* [显示内存](#显示内存)
* [解决卡死现象](#解决卡死现象)
* [调整Eclipse运行内存](#调整eclipse运行内存)
    * [设置JDK参数](#设置jdk参数)
    * [设置Tomcat参数](#设置tomcat参数)
* [Eclipse自动导包设置](#eclipse自动导包设置)
* [Eclipse注释模板设置](#eclipse注释模板设置)
* [Eclipse代码格式化设置](#eclipse代码格式化设置)
* [Eclipse设置不格式化注释](#eclipse设置不格式化注释)
* [设置编码格式](#设置编码格式)
* [设置Tab键为4个空格](#设置tab键为4个空格)
* [快捷键设置](#快捷键设置)
* [插件](#插件)







## 下载地址

* [http://www.eclipse.org/downloads/packages](http://www.eclipse.org/downloads/packages)


## 显示内存

> 在eclipse中打开heap状态`windows->perference->general->右边show heap status打上勾->OK `，这时会在Eclipse最下面显示一个内存显示了

## 解决卡死现象

> Eclipse中jsp、js文件编辑时，卡死现象解决

- 1、取消验证

> `windows`–>`perferences`–>`validation`
>
> 把除了`manual`下面的全部点掉，`build`下只留`classpath dependency Validator`
 
- 2、关闭拼写检查

> `windows`–>`perferences`–>`general`–>`editors`->`Text Editors`->`spelling`

## 调整Eclipse运行内存

> 在eclipse的安装目录下编辑`eclipse.ini`文件
 
[JVM参数设置](/Java/Tomcat.md#四)

```bash
# JDK8以下
-Xms128M -Xmx512M -XX:PermSize=64M -XX:MaxPermSize=128M
# JDK8
-Xms128M -Xmx512M -XX:MetaspaceSize=512m -XX:MaxMetaspaceSize=1024m
```

```diff
-Xms128m JVM初始分配的堆内存
-Xmx512m JVM最大允许分配的堆内存，按需分配
-XX:PermSize=64M JVM初始分配的非堆内存，JDK8之前
-XX:MaxPermSize=128M JVM最大允许分配的非堆内存，按需分配，JDK8之前
-XX:MetaspaceSize=512m 元数据，JDK8
-XX:MaxMetaspaceSize=1024m 最大元数据，JDK8
```

#### 设置JDK参数

![](/images/Eclipse中JDK的JVM参数设置.png)

#### 设置Tomcat参数

![](/images/Eclipse中Tomcat的JVM参数设置.png)



## Eclipse自动导包设置

> 在Eclispe中，打开`Window`->`Preferences`->`Java`->`Editor`->`Save Actions`然后选中`Organize impots`

![](/images/Eclipse保存自动优化设置.png)



## Eclipse注释模板设置

> 编辑注释模板的方法：`Window`->`Preference`->`Java`->`Code Style`->`Code Template`然后展开`Comments`节点就是所有需设置注释的元素

- 注释的使用：输入`/**`然后回车自动出来

![](/images/Eclipse自动添加注释.png)

- 创建新文件(New Java files)注释标签

```java
${filecomment}
${package_declaration}


/**
 * @Title: ${file_name}
 * @Package ${package_name}
 * @Description: 
 * @author: woytu.com
 * @date: ${date} ${time}
 * @version V1.0
 * @Copyright: ${year} woytu.com Inc. All rights reserved.
 */
${typecomment}
${type_declaration}
```

- 字段(Fields)注释标签

```java
 /**
 * @Fields ${field} : 
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- 构造函数(Constructors)标签

```java
/**
 * @Title: ${enclosing_type}
 * ${tags}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- 方法(Methods)标签

```java
/**
 * 
 * ${tags} ${return_type}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- 覆盖方法(Overriding Methods)标签

```java
/**
 * <p>Title: ${enclosing_method}</p>
 * <p>Description: </p>
 * ${tags}
 * ${see_to_overridden}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- 代表方法(Delegate Methods)标签

```java
/**
 * ${tags}
 * ${see_to_target}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- getter方法标签

```java
/**
 * @Title: ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- setter方法标签

```java
/**
 * @Title: ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

## Eclipse代码格式化设置

```java
1.Window->Preferences

// Java 格式化
2.Java->Code Style->Formatter->New->Edit->Line Wrapping
3.Maximum Line width = 180
4.Set line width for preview window = 180

5.Java->Code Style->Formatter->New->Edit->Comments
6.Maximum line width for comments = 180

// JavaScript 格式化
2.JavaScript->Code Style->Formatter->New->Edit->Line Wrapping
3.Maximum Line width = 180
4.Set line width for preview window = 180

5.JavaScript->Code Style->Formatter->New->Edit->Comments
6.Maximum line width for comments = 180

// JSP|HTML页面 格式化
2.Web->HTML Files->Editor
3.Line width = 180
4.Inline Elements 选中所有-> Remove
```


## Eclipse设置不格式化注释

> Eclipse默认自带的风格模板不能直接操作，需要先创建一个新的风格模板才能操作

![](/images/Eclipse不格式化注释.png)

## 设置编码格式

- 设置工作空间编码格式

> 在`Window`->`Preferences`->`General`->`Workspace下`，面板`Text file encoding`选择`UTF-8`

>![](/images/Eclipse设置工作空间编码.png)

- 设置文档编码格式

> 在`Window`->`Preferences`->`General`->`Content Type`->`Text`的最下面设置为编码格式为`UTF-8`

![](/images/Eclipse设置文档编码.png)

- 设置Web编码格式

> 在`Window`->`Preferences`->`Web`->`CSS Files、HTML Files、JSP Files` 面板选择`ISO 10646/Unicode(UTF-8)`

![](/images/Eclipse设置Web文件编码.png)

- 设置项目的文档编码格式

> 选择`项目`->`右键`->`Properties`->`Resource`设置编码为`UTF-8`


## 设置Tab键为4个空格

![](/images/Eclipse-Insert-spaces-for-tabs.png)

![](/images/Eclipse-Tab-policy.png)


## 快捷键设置

> `Window`->`Preference`->`General`->`Keys`

### IDEA与Eclipse快捷键对应关系

| 功能                                                                                             | IDEA                                          | Eclipse                                         |
|--------------------------------------------------------------------------------------------------|-----------------------------------------------|-------------------------------------------------|
| 查找（一样）                                                                                     | Ctrl + F                                      | Ctrl + F                                        |
| 光标处往下添加空行（一样）                                                                       | Shift + Enter                                 | Shift + Enter                                   |
| 撤销（一样）                                                                                     | Ctrl + Z                                      | Ctrl + Z                                        |
| 选中区域添加注释 （—样）                                                                         | Ctrl + Shift + /                              | Ctrl - Shift + /                                |
| 往上滑屏（一样）                                                                                 | Ctrl + ↑                                      | Ctrl + ↑                                        |
| 往下滑屏（一样）                                                                                 | Ctrl + ↓                                      | Ctrl + ↓                                        |
| 删除下一个单词（一样）                                                                           | Ctrl + Delete                                 | Ctrl + Delete                                   |
| 删除上一个单词（一样）                                                                           | Ctrl + Backspace                              | Ctrl + Backspace                                |
| 跳到单词首处（一样）                                                                             | Ctrl + ←                                      | Ctrl + ←                                        |
| 跳到单词尾处（一样）                                                                             | Ctrl + →                                      | Ctrl + →                                        |
| 递进式向右选择代码（一样）                                                                       | Shift + Alt + →                               | Shift + Alt + →                                 |
| 递进式向左选择代码（一样）                                                                       | Shift + Alt + ←                               | Shift + Alt + ←                                 |
| 跳到指定行                                                                                       | Ctrl + G                                      | Ctrl + L                                        |
| 光标处往上添加空行                                                                               | Ctrl + Alt + Enter                            | Ctrl + Shift + Enter                            |
| 代码提示                                                                                         | Ctrl + Alt + 空格                             | Alt + /                                         |
| 取消撤销                                                                                         | Ctrl + Shift + Z                              | Ctrl + Y                                        |
| 选中区域取消注释                                                                                 | Ctrl + Shift + /                              | Ctrl + Shift + \                                |
| 添加或取消注释                                                                                   | Ctrl + /                                      | Ctrl + /  <br>   Ctrl + Shift + C               |
| 格式化全局代码                                                                                   | Ctrl + Alt + L                                | Ctrl + Shift + F                                |
| 格式化选中代码                                                                                   | Ctrl + Alt + L                                | Ctrl + I                                        |
| 打开文件结构图                                                                                   | Ctrl + F12 <br>  Alt + 7                 | Ctrl + F3  <br>  Ctrl + O                       |
| 编译项目，因为IDEA一个窗口只能显示一个项目，Eclipse可以显示多个项目                              | Ctrl + F9                                     | Ctrl + B（编译所有项目）                        |
| 全局查找class                                                                                    | Ctrl + N                                      | Project-BuiId Project  <br>    Ctrl + Shift + T |
| 根据文件内容当前工作空间查找文件                                                                 | Ctrl + Shift + F                              | Ctrl + H                                        |
| 根据文件名当前工作空间查找文件                                                                   | Ctrl + Shift + N                              | Ctrl + Shift + R                                |
| 删除整行                                                                                         | Shift + Delete  <br>  Ctrl + Y                | Ctrl + D                                        |
| 向下复制一行                                                                                     | Ctrl + D                                      | Ctrl + Alt + ↓                                  |
| 向上移动整行                                                                                     | Shift + Alt + ↑                               | Alt + ↑                                         |
| 向下移动整行                                                                                     | Shift + Alt + ↓                               | Alt + ↓                                         |
| 快速定位下一个错误代码处                                                                         | F2                                            | Ctrl + .                                        |
| 快速定位上一个错误代码处                                                                         | Shift + F2                                    | Ctrl + ,                                        |
| 快速修正错误                                                                                     | Alt + Enter                                   | Ctrl + 1                                        |
| 查找下一个选中的字符串                                                                           | F3                                            | Ctrl + K                                        |
| 查找上一个选中的字符串                                                                           | Shift + F3                                    | Ctrl + Shift + K                                |
| 优化导入的类和包                                                                                 | Ctrl + Alt + O                                | Ctrl + Shift + O                                |
| 重命名文件                                                                                       | Shift + F6                                    | F2                                              |
| 批量重命名变量                                                                                   | Shift + F6                                    | Shift + Alt + R                                 |
| 快速定位到上一方法或属性                                                                         | Alt + ↑                                       | Ctrl + Shift + ↑                                |
| 快速定位到下一方法或属性                                                                         | Alt + ↓                                       | Ctrl + Shift + ↓                                |
| 关闭当前窗口                                                                                     | Ctrl + F4                                     | Ctrl + W                                        |
| 查看类的继承关系                                                                                 | Ctrl + H                                      | Ctrl + T                                        |
| 查看引用的方法或类                                                                               | Ctrl + B  <br>  Ctrl + 鼠标左键               | F3  <br>  Ctrl + 鼠标左键                       |
| 递进式选择代码块                                                                                 | Ctrl + W                                      | Shift + Alt + ↑                                 |
| 递进式取消选择代码块                                                                             | Ctrl + Shift + W                              | Shift + Alt + ↓                                 |
| 在某个调用的方法名上使用会跳到具体的实现处                                                       | Ctrl + Alt + B                                | 按住Ctrl,选择open implementation                |
| 移动上一个光标所在处                                                                             | Ctrl + Alt + ←                                | Alt + ←                                         |
| 移动下一个光标所在处                                                                             | Ctrl + Alt + →                                | Alt + →                                         |
| 展开所有代码                                                                                     | Ctrl + Shift + +                              | Ctrl + Shift + * （小键盘）                     |
| 折詡斤有代码                                                                                     | Ctrl + Shift + -                              | Ctrl + Shift + / （小键盘）                     |
| 选择常用代码块                                                                                   | Ctrl + Alt + T                                | Shift + Alt + Z                                 |
| 可以生成构造器/Getter/Setter等                                                                   | Alt + Insert                                  | Shift + Alt + S                                 |
| 编辑源                                                                                           | F4                                            |                                                 |
| 移动                                                                                             | F6                                            |                                                 |
| 复制                                                                                             | F5                                            |                                                 |
| 查找类中的方法或变量                                                                             | Ctrl + Alt + Shift + N                        |                                                 |
| 向左切换窗口                                                                                     | Alt + ←                                       |                                                 |
| 向右切换窗口                                                                                     | Alt + →                                       |                                                 |
| 复制上一个单词                                                                                   | Alt + /                                       |                                                 |
| 还原默认布局                                                                                     | Shift + F12                                   |                                                 |
| 将当前窗口独立                                                                                   | Shift + F4                                    |                                                 |
| 运行（Run）当前项目                                                                              | Shift + F10                                   |                                                 |
| 调试（Debug）当前项目                                                                            | Shift + F9                                    |                                                 |
| 向光标处插入当前行                                                                               | Shift + Insert                                |                                                 |
| 显示所有使用处                                                                                   | Ctrl + Alt + F7                               |                                                 |
| 快速抽取方法                                                                                     | Ctrl + Alt + M                                |                                                 |
| 对选中的代码弹出环绕选确出层                                                                     | Ctrl + Alt + T                                |                                                 |
| 快速引进变量                                                                                     | Ctrl + Alt + V                                |                                                 |
| 寻找类或是变量被调用的地方，以弹出框的方式显示                                                   | Ctrl + Alt + F7                               |                                                 |
| 动态模板环绕                                                                                     | Ctrl + Alt + J                                |                                                 |
| 内联                                                                                             | Ctrl + Alt + N                                |                                                 |
| 安去删除字段或方法                                                                               | Alt + Delete                                  |                                                 |
| 快速打开或隐藏工程面板                                                                           | Alt+ 1                                        |                                                 |
| 收藏                                                                                             | Alt + 2                                       |                                                 |
| TODO                                                                                             | Alt + 6                                       |                                                 |
| 查找一属性或方法被谁调用                                                                         | Alt + F7  <br>  Ctrl + F7                     |                                                 |
| 定位到对应数值的书签位置                                                                         | Ctrl + 1,2,3... 9                             |                                                 |
| 替换文本                                                                                         | Ctrl + R                                      |                                                 |
| 复制整行（不选中字符串）                                                                         | Ctrl + C                                      |                                                 |
| 剪切整行（不选中字符串）                                                                         | Ctrl + X                                      |                                                 |
| 停止项目                                                                                         | Ctrl + F2                                     |                                                 |
| 快速查找文档                                                                                     | Ctrl + Q                                      |                                                 |
| 跳到父类                                                                                         | Ctrl + U                                      |                                                 |
| 重写父类方法                                                                                     | Ctrl + 0                                      |                                                 |
| 方法参数提示                                                                                     | Ctrl + P                                      |                                                 |
| 在光标所在的错误代码处显示错误信息                                                               | Ctrl + F1                                     |                                                 |
| 插入代码模板                                                                                     | Ctrl + J                                      |                                                 |
| 最近的文件                                                                                       | Ctrl + E                                      |                                                 |
| 快速切换方案（界面外观、代码风格、快捷键映射等菜单）                                             | Ctrl + ~                                      |                                                 |
| 转到下一个拆分器                                                                                 | Ctrl + Tab                                    |                                                 |
| 转到上一个拆分器                                                                                 | Ctrl + Shift + Tab                            |                                                 |
| 可以将最近使用的剪贴板内容选择插入到文本                                                         | Ctrl + Shift + V  <br>  Ctrl + Shift + Insert |                                                 |
| 向上移动整个代码块                                                                               | Ctrl + Shift + ↑                              |                                                 |
| 向下移动整个代码块                                                                               | Ctrl + Shift + ↓                              |                                                 |
| 最近更改的文件                                                                                   | Ctrl + Shift + E                              |                                                 |
| 自动结束代码，行末自动添加分号                                                                   | Ctrl + Shift + Enter                          |                                                 |
| 高亮显示所有该选中文本，按Esc高亮消失                                                            | Ctrl + Shift + F7                             |                                                 |
| 翻译选中的字符串                                                                                 | Ctrl + Shift + X                              |                                                 |
| 根据输入内容查找整个项目或指定目录内文件                                                         | Ctrl + Shift + F                              |                                                 |
| 自动将下一行合并到当前行末尾                                                                     | Ctrl + Shift + J                              |                                                 |
| 批量替换                                                                                         | Ctrl + Shift + R                              |                                                 |
| translation插件翻译选中的字符串                                                                  | Ctrl + Shift + Y                              |                                                 |
| 智能代码提示                                                                                     | Ctrl + Shift + Space                          |                                                 |
| 将选中字符串的字母转为大写/小写                                                                  | Ctrl + Shift + U                              |                                                 |
| 删除到行末                                                                                       | Ctrl + Shift + Delete                         |                                                 |
| 标记标签                                                                                         | Ctrl + Shift + 1,2,3...9                      |                                                 |
| 隐藏恢复所有窗口                                                                                 | Ctrl + Shift + F12                            |                                                 |
| 重新编译                                                                                         | Ctrl + Shift + F9                             |                                                 |
| 关闭活动窗口                                                                                     | Ctrl + Shift + F4                             |                                                 |
| 复制路径                                                                                         | Ctrl + Shift + C                              |                                                 |
| 复制引用，必须选择类名                                                                           | Ctrl + Shift + Alt + C                        |                                                 |
| 简期贴 弹出重构菜单                                                                              | Ctrl + Shift + Alt + V                        |                                                 |
| 弹出重构菜单                                                                                     | Ctrl + Shift + Alt + T                        |                                                 |
| 运行（Run）选择的项目                                                                            | Shift + Alt + F10                             |                                                 |
| 调试（Debug）选择的项目                                                                          | Shift + Alt + F9                              |                                                 |
| 最近修改记录                                                                                     | Shift + Alt + C                               |                                                 |
| 不仅可以把焦点移到编辑器上，而且还可以隐藏当前（或最后活动的）工具窗口                           | Shift + Esc                                   |                                                 |
| 把焦点从编辑器移到最近使用的工具窗口                                                             | F12                                           |                                                 |
| 要打开编辑器光标字符处使用的类或者方法Java文档的浏览器                                           | Shift + F1                                    |                                                 |
| 实现方法                                                                                         | Ctrl + I                                      |                                                 |
| 查找整个工程中使用的某一个类、方法或者变量的位置                                                 | Alt + F7                                      |                                                 |
| 跳转到导航栏                                                                                     | Alt + Home                                    |                                                 |
| 快速修正                                                                                         |                                               | Ctrl + 1                                        |
| 打开外部Java文档                                                                                 |                                               | Shift + F2                                      |
| 显示重构菜单                                                                                     |                                               | Shift + Alt + T                                 |
| 在workspace中捜索选中元素的声明                                                                  |                                               | Ctrl + G                                        |
| 在workspace中捜索选中的文本                                                                      |                                               | Ctrl + Alt + G                                  |
| 在workspace中搜索选中元素的引用                                                                  |                                               | Ctrl + Shift + G                                |
| 关闭所有窗口                                                                                     |                                               | Ctrl + Shift + F4  <br>  Ctrl + Shift + W       |
| 快速搜索选中字符串                                                                               |                                               | Ctrl + Shift + L                                |
| 将选中字符串的字母转为大写                                                                       |                                               | Ctrl + Shift + X                                |
| 将选中字符串的字母转为小写                                                                       |                                               | Ctrl + Shift + Y                                |
| 下一个视图                                                                                       |                                               | Ctrl + F7                                       |
| 上一个视图                                                                                       |                                               | Ctrl + Shift + F7                               |
| 下一个编辑器                                                                                     |                                               | Ctrl + F6                                       |
| 上一个编辑器                                                                                     |                                               | Ctrl + Shift + F6                               |
| 下一个透视图                                                                                     |                                               | Ctrl + F8                                       |
| 上一个透视图                                                                                     |                                               | Ctrl + Shift + F8                               |
| 最大化/最小化当前视图或编辑器                                                                    |                                               | Ctrl + M                                        |
| debug最后一个方法或应用                                                                          |                                               | F11                                             |
| 运行最后一个方法或应用                                                                           |                                               | Ctrl + F11                                      |
| debug跳入方法                                                                                    |                                               | F5                                              |
| debug向下逐行调试                                                                                |                                               | F6                                              |
| debug跳出方法                                                                                    |                                               | F7                                              |
| debug直接跳转到下一个断点                                                                        |                                               | F8                                              |
| 显示提示                                                                                         |                                               | F2                                              |
| 打开选中元素的类型继矛结构                                                                       |                                               | F4                                              |
| 刷新                                                                                             |                                               | F5                                              |
| 更新maven项目                                                                                    |                                               | Alt + F5                                        |
| 显示当前选择资源（工程，or 文件 or 文件）的属性                                                  |                                               | Alt + Enter                                     |
| 快速显示当前Editer的下拉列表（如果当前页面没有显示的用黑体表示）                                 |                                               | Ctrl + E                                        |
| 折叠当前类中的所有代码                                                                           |                                               | Ctrl + /（小键盘）                              |
| 展开当前类中的所有代码                                                                           |                                               | Ctrl + *（小键盘）                              |
| 放大字体                                                                                         |                                               | Ctrl + +                                        |
| 缩小字体                                                                                         |                                               | Ctrl + -                                        |
| Ctrl+Shift+P定位到对于的匹配符（譬如{}）（从前面定位后面时，光标要在匹配符里面，后面到前面则反之 |                                               | Ctrl + Shift + F9                               |
| 抽取方法（这是重构里面最常用的方法之一 了，尤其是对一大堆泥团代码有用）                          |                                               | Shift + Alt + M                                 |
| 修改函数结构（比较实用,有N个函数调用了这个方法,修改一次搞定）                                    |                                               | Shift + Alt + C                                 |
| 抽取本地变量（可以直接把一些魔法数字和字符串抽取成一个变量，尤其是多处调用的时候）               |                                               | Shift + Alt + L                                 |
| 把Class中的local变量变为field变量（比较实用的功能）                                              |                                               | Shift + Alt + F                                 |
| 合并变量（可能这样说有点不妥Inline）                                                             |                                               | Shift + Alt + I                                 |
| 移动函数和变量（不怎么常用）                                                                     |                                               | Shift + Alt + V                                 |
| 重构的后悔药（Undo）                                                                             |                                               | Shift + Alt + Z                                 |
| 全局上下文信息                                                                                   |                                               | Alt + ?                                         |
| 全局显示视图菜单                                                                                 |                                               | Ctrl + F10                                      |
| 全局显示系统菜单                                                                                 |                                               | Alt + -                                         |
| 在当前文件中显示选中的字符串                                                                     |                                               | Ctrl + Shift + U                                |
| 保存所有                                                                                         |                                               | Ctrl + Shift + S                                |
| 向上复制一行                                                                                     |                                               | Ctrl + Alt + ↑                                  |
| 回到最后一次编辑的地方                                                                           |                                               | Ctrl + Q                                        |
| 选择文件打开方式                                                                                 |                                               | Shift + Alt + W                                 |
| 分屏显示当前文件                                                                                 |                                               | Ctrl + Shift + -                                |


## 插件

- 反编译`Eclipse Class Decompiler`