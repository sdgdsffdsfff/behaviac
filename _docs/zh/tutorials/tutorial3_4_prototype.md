---
layout: docs_relatives
title: 快速原型设计
date: 2015-12-04 13:18:38 +0800
author: cainhuang
permalink: /docs/zh/tutorials/tutorial3_4_prototype/
categories: [tutorial]
lang: zh
---

## 快速原型设计
本文主要介绍在不需要程序员编写任何代码的前提下，策划如何在编辑器中快速开发行为树原型。

### 1 新建工作区
打开编辑器，点击菜单项“文件”->“新建工作区”新建一个自己的工作区，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/newWorkspace.png)

图1.1 新建工作区

暂不设置“元数据位置”，表示没有从运行时端导出任何元信息文件，元信息都会在编辑器中创建出来。

点击确认，创建完之后，整个编辑器几乎是空的，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/emptyEditor.png)

图1.2 初始的编辑器

### 2 新建行为树

从工具栏中点击“新建行为树”按钮，开始创建我们的第一棵行为树，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/newBehavior.png)

图2.1 新建行为树

创建后，将这棵行为树命名为“first_behavior”，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/firstBehavior.png)

图2.2 第一棵行为树

从图2.2中可以看出这棵行为树只有一个根节点，鼠标点击该根节点后，可以看到它的Agent类型只有一个`behaviac::Agent`可以选择，但是不要选它，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/rootAgentType.png)

图2.3 根节点的Agent类型

### 3 新建自定义的Agent子类及其属性和方法

为了让行为树可以描述一个Agent类型，首先需要创建一个我们的Agent子类，通过菜单项“视图”->“元信息浏览”（或通过快捷键Ctrl+M）打开元信息浏览器，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/metaBrowser.png)

图3.1 元信息浏览器

点击元信息浏览器右上角的“新建”按钮，开始创建我们的第一个Agent子类，命名为`FirstAgent`，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/newAgent.png)

图3.2 新建Agent子类

从上图可以看出，`FirstAgent`类没有任何的成员属性和方法，我们接着为其添加属性和方法。

点击元信息浏览器中间靠右的“新建”按钮，为`FirstAgent`类添加第一个成员属性，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/createProperty.png)

图3.3 新建成员属性

为这个属性命名为`FirstProperty`，并设置为int类型，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/createFirstProperty.png)

图3.4 新建成员属性

创建完之后，我们可以看到，`FirstAgent`类已经有了第一个成员属性`FirstProperty`，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/firstProperty.png)

图3.5 新建成员属性

类似的，在元信息浏览器中，选择“成员类型”为“Method”，为`FirstAgent`类添加第一个成员方法，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/createMethod.png)

图3.6 新建成员方法

创建完之后，我们可以看到，`FirstAgent`类已经有了第一个成员方法`FirstMethod`，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/firstMethod.png)

图3.7 新建成员方法

这样，我们的第一个Agent子类（`FirstAgent`）就有了一个成员属性（`FirstProperty`）和一个成员方法（`FirstMethod`）。

在元信息浏览器上点击下面的“确认”按钮，关闭元信息浏览器，回到编辑器主视口，继续编辑之前创建的第一棵行为树。

### 4 编辑行为树

鼠标选中根节点，为其设置Agent类型，这时，我们可以看到有了`FirstProperty`可供选择，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/selectAgentType.png)

图4.1 设置Agent类型

编辑该行为树，通过鼠标将左边的节点列表中的节点拖拽到主视口中，为该行为树添加一个序列节点、一个条件节点和一个动作节点，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/editBehavior.png)

图4.2 为行为树添加节点

为条件节点选择刚才创建的属性`FirstProperty`，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/editCondition.png)

图4.3 设置条件节点

为动作节点选择刚才创建的方法`FirstMethod`，如下图所示：

![]({{site.baseurl}}/img/tutorials/tutorial3/editAction.png)

图4.4 设置动作节点

这样，我们就编辑完了第一棵行为树。
