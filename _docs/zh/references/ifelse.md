---
layout: docs_relatives
title: 条件执行节点
date: 2016-02-16 18:47:15 +0800
author: cainhuang
permalink: /docs/zh/references/ifelse/
categories: [reference]
lang: zh
---

条件执行节点（IfElse）是behaviac组件的一个扩展或快捷方式。条件执行节点必须要有3个子节点，第一个子节点是条件分支，第二个子节点是“真时执行”分支，第三个子节点是“假时执行”分支。如果条件为真，那么执行“真时执行”分支；否则，执行“假时执行”分支。而条件执行节点的执行结果则根据具体执行分支的执行结果来决定，如下图所示：

![ifelse]({{ site.baseurl }}/img/references/ifelse.png)

图1 条件执行节点

如果不使用条件执行节点，完全可以用序列（Sequence）和选择（Selector）节点来实现相同的功能，只不过没有条件执行节点简洁。

具体的执行逻辑可以查看[behaviortree/nodes/composites/ifelse.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/composites/ifelse.cpp)