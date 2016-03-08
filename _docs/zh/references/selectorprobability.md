---
layout: docs_relatives
title: 概率选择节点
date: 2016-02-16 10:40:15 +0800
author: cainhuang
permalink: /docs/zh/references/selectorprobability/
categories: [reference]
lang: zh
---

类似选择节点（Selector），概率选择节点（SelectorProbability）也是从子节点中选择执行一个，但不像选择节点每次都是按照排列的先后顺序选择，概率选择节点每次选择的时候根据子节点的“概率”进行选择，概率越大，被选到的机会越大，如下图所示：

![selectorprobability]({{ site.baseurl }}/img/references/selectorprobability.png)

图1 概率选择节点

注意：选择节点是按照从上到下的顺序依次执行子节点，一直到第一个返回成功的那个子节点则返回成功，或者如果所有子节点都返回失败则返回失败。

而概率选择节点则是根据概率“直接”选择并执行某个子节点，无论其返回成功还是失败，概率选择节点也将返回同样的结果。如果该子节点返回失败，概率选择也返回失败，它不会像选择节点那样会继续执行接下来的子节点。

概率选择节点有随机数生成器可以配置，该随机数生成器是一个返回值为0.0到1.0之间的float类型的函数，如下图所示：

![selectorprobability]({{ site.baseurl }}/img/references/selectorprobability_prop.png)

图2 概率选择节点的属性

该随机数生成器也可以为空，则用系统的缺省实现。

概率选择节点的子节点只能是“权值”的子节点（如图1所示），在添加子节点时，该权值节点会被系统自动添加。所有权值子节点的相加之和不需要是100，执行时会进行归一化操作，子节点的概率是该子节点的权值/总和。

概率选择节点的选择算法是基于概率区间的，比如上图1中的3个子节点的权值分别是20、30、50，归一化后的概率分别是0.2、0.3、0.5，那么对应的概率区间分别是[0.0, 0.2)、[0.2, 0.5)、[0.5, 1.0)。概率选择节点的随机数生成器随机产生一个[0.0, 1.0)之间的随机数，看这个随机数落在哪个区间，则执行第几个子节点。例如，随机数为0.45，落在第二个区间[0.2, 0.5)，则选择执行第二个子节点。

具体的执行逻辑可以查看[behaviortree/nodes/composites/selectorprobability.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/composites/selectorprobability.cpp)
