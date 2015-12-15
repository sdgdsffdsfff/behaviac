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

下载完behaviac组件的全部源码后，整个组件的目录结构如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial16/sourceFolder.png)

图1 behaviac组件的目录结构

将behaviac组件整合到自己的项目中时，可以通过两种方式使用behaviac组件：

- 将全部源码（包括behaviac组件的所有[.h]({{site.repository}}/blob/master/inc/behaviac)和[.cpp]({{site.repository}}/blob/master/src)文件）全部复制到自己的游戏项目中。
- 单独编译behaviac组件库，生成lib文件，然后自己的项目包含.h文件和生成的.lib文件。

对于上面的第二种用法，请先参考[如何编译构建]({{ site.baseurl }}/docs/zh/tutorials/how_to_build/)文档来编译构建behavaic组件。

在Windows平台，如果是使用VS来管理项目的，需要在VS的项目“Property Pages”->“Configuration Properties”->“C/C++”->“General”中的“Additional Include Directories”项中添加behaviac组件头文件（即图1中的inc文件夹）所在的路径，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial16/includeHeaderSettings.png)

图2 头文件的路径设置

再在VS的项目“Property Pages”->“Configuration Properties”->“Linker”->“General”中的“Additional Library Directories”项中添加自己编译出的behaviac lib文件（即图1中的lib文件夹）所在的路径，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial16/includeLibSettings.png)

图3 lib文件的路径设置

最后在VS的项目“Property Pages”->“Configuration Properties”->“Linker”->“Input”中的“Additional Dependencies”项中添加自己编译出的behaviac lib文件，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial16/addLibSettings.png)

图4 lib文件的添加设置

注意：上图中的behaviac_debugdll_win32_vs2010.lib文件是用VS2010编译出来的，说明游戏项目也需要用VS2010来编译。如果你的游戏项目使用其他版本的VS，则编译behaviac组件也需要用相应版本的VS来编译。
