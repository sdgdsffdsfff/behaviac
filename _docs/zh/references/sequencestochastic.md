---
layout: docs_relatives
title: 随机序列节点
date: 2016-02-16 14:51:15 +0800
author: cainhuang
permalink: /docs/zh/references/sequencestochastic/
categories: [reference]
lang: zh
---

类似序列节点（Sequence），随机序列节点（SequenceStochastic）也是从子节点中顺序执行，但不像序列节点每次都是按照排列的先后顺序，随机序列节点每次执行的时候随机的决定执行顺序，如下图所示：

![sequencestochastic]({{ site.baseurl }}/img/references/sequencestochastic.png)

图1 随机选择节点

例如，序列节点和随机序列节点都有A、B、C、D这四个子节点。对于序列节点，每次都是按A、B、C、D的顺序依次执行，而对于随机序列节点，有时按A、B、C、D的顺序执行，有时按B、A、D、C的顺序执行，又有时按A、C、D、B的顺序执行，等等。

与随机选择节点相同的是，随机序列节点也有随机数生成器可以配置，该随机数生成器是一个返回值为0.0到1.0之间的float类型的函数，如下图所示：

![sequencestochastic]({{ site.baseurl }}/img/references/sequencestochastic_prop.png)

图2 随机选择节点的属性

该随机数生成器也可以为空，则用系统的缺省实现。

具体的执行逻辑可以查看[behaviortree/nodes/composites/sequencestochastic.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/composites/sequencestochastic.cpp)
