---
layout: docs_relatives
title: 如何编译构建
date: 2015-12-14 15:10:26 +0800
author: cainhuang
permalink: /docs/zh/tutorials/how_to_build/
categories: [tutorial]
lang: zh
---

## 如何编译构建

请到[https://github.com/TencentOpen/behaviac](https://github.com/TencentOpen/behaviac)下载或克隆源码。

### 构建编辑器

源码目录结构如图：
![source_designer_path.png]({{ site.baseurl }}/img/faq/source_designer_path.png)

请使用vs2010或以上打开并构建`tools/designer/BehaviacDesigner.sln`。

### 构建C++运行时

1. 在源码目录结构中的build目录运行`premake.bat`产生各平台的项目文件，例如在`build/vs2013`中产生的是vs2013的项目文件，`build/linux`中产生的是linux平台下的项目文件，
![build_premake.png]({{ site.baseurl }}/img/faq/build_premake.png)
1. 分别打开相应目录下的项目文件使用相应toolchain构建，例如使用vs2013打开`build/vs2013`下的behaviac.sln构建windows平台下的运行时库以及测试demo。
1. `/example`下是两个C++的demo
![examples.png]({{ site.baseurl }}/img/faq/examples.png)

分别打开对应的sln文件构建即可。

	- airebattledemo是cocos集成behaviac的demo
	- spaceship是SDL集成behaviac的demo

**运行的时候可能需要参考对应example里的readme文件进行相应设置**

### Unity下构建C# 

![cs.png]({{ site.baseurl }}/img/faq/cs.png)
`/integration`目录下是C#的两个项目：

 - `/integration/unity`是单元测试
 - `/integration/BattleCityDemo`是unity下的tank demo