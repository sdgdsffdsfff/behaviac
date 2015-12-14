---
layout: docs_relatives
title: C++项目中对behaviac组件的配置
date: 2015-12-14 15:20:26 +0800
author: cainhuang
permalink: /docs/zh/tutorials/cpp_include/
categories: [tutorial]
lang: zh
---

## C++项目中对behaviac组件的配置

将behaviac组件整合到自己的项目中时，可以通过两种方式使用behaviac组件：

- 将全部源码（包括behaviac组件的所有[.h]({{site.repository}}/blob/master/inc/behaviac)和[.cpp]({{site.repository}}/blob/master/src)文件）全部复制到自己的游戏项目中。
- 单独编译behaviac组件库，生成lib文件，然后自己的项目包含.h文件和生成的.lib文件。

对于第二种用法，请首先参考[如何编译构建]({{ site.baseurl }}/docs/zh/tutorials/how_to_build/)文档来编译构建behavaic组件。

在Windows平台，如果是使用VS来管理项目的，需要设置头文件所在的路径，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial16/includeHeaderSettings.png)

图1 头文件的路径设置

再包含编译behaviac组件生成的lib文件所在的路径，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial16/includeLibSettings.png)

图2 lib文件的路径设置

最后将编译behaviac组件生成的lib文件添加进来，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial16/addLibSettings.png)

图3 lib文件的添加设置
