---
layout: docs_relatives
title: 任务节点
date: 2016-02-17 18:31:00 +0800
author: cainhuang
permalink: /docs/zh/references/task/
categories: [reference]
lang: zh
---

任务节点（Task）用于描述一个接口，该接口的入口参数为当前的行为树提供了局部变量，这些局部变量可以根据需要用于该行为树所有子节点，如下图所示：

![task]({{site.url}}{{site.baseurl}}/img/references/task.png)

图1 任务节点

注意：任务节点只能作为行为树的第一个子节点存在，在任务节点上可以添加其他子节点。

在任务节点的任务属性中需要选择在元信息浏览器中创建的事件，如下图所示：

![task]({{site.url}}{{site.baseurl}}/img/references/task_prop.png)

图2 任务节点的属性

带有任务节点的行为树主要用于事件的处理，请详看文档《[事件处理]({{ site.baseurl }}/docs/zh/tutorials/tutorial11_event/)》。

具体的执行逻辑可以查看[htn/task.cpp]({{site.repository}}/blob/master/src/htn/task.cpp)