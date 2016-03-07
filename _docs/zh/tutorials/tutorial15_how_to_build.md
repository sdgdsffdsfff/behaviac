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

 1. 请参考[构建](http://www.behaviac.com/docs/zh/articles/build/)
 1. `/example`下是两个C++的demo**
     运行的时候可能需要参考对应example里的readme文件进行相应设置

### Unity下构建C#

![cs.png]({{ site.baseurl }}/img/faq/cs.png)
`/integration`目录下是C#的两个项目：

 - `/integration/unity`是单元测试
 - `/integration/BattleCityDemo`是unity下的tank demo

 自己的项目需要将目录`/integration/unity/Assets/Scripts/behaviac/runtime`下的所有源码直接复制过去，或者在Unity编辑器中导入`/integration/behaviac.unitypackage`包（安装完发布的BehaviacSetup_***.exe后，会在安装目录下的/integration文件夹中找到behaviac.unitypackage包）。

