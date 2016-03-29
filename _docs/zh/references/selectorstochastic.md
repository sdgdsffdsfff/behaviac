---
layout: docs_relatives
title: 随机选择节点
date: 2016-02-16 11:25:15 +0800
author: cainhuang
permalink: /docs/zh/references/selectorstochastic/
categories: [reference]
lang: zh
---

类似选择节点（Selector），随机选择节点（SelectorStochastic）也是从子节点中选择执行一个，但不像选择节点每次都是按照排列的先后顺序选择，随机选择节点每次选择的时候随机的决定执行顺序，如下图所示：

![selectorstochastic]({{site.url}}{{site.baseurl}}/img/references/selectorstochastic.png)

图1 随机选择节点

例如，选择节点和随机选择节点都有A、B、C、D这四个子节点。对于选择节点，每次都是顺序的按A、B、C、D的顺序选择；而对于随机选择节点，有时按A、B、C、D的顺序选择，有时按B、A、D、C的顺序选择，又有时按A、C、D、B的顺序选择，等等。

随机选择节点有随机数生成器可以配置，该随机数生成器是一个返回值为0.0到1.0之间的float类型的函数，如下图所示：

![selectorstochastic]({{site.url}}{{site.baseurl}}/img/references/selectorstochastic_prop.png)

图2 随机选择节点的属性

该随机数生成器也可以为空，则用系统的缺省实现。

具体的执行逻辑可以查看[behaviortree/nodes/composites/selectorstochastic.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/composites/selectorstochastic.cpp)
