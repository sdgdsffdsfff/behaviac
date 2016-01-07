---
layout: docs_relatives
title: 计算节点 
date: 2016-01-07 9:55:15 +0800
author: cainhuang
permalink: /docs/zh/references/compute/
categories: [reference]
lang: zh
---

计算（Compute）节点对常数、属性或函数的返回值做加减乘除的运算，把结果赋值给某个属性，如下图所示：

![compute]({{ site.baseurl }}/img/references/compute.png)

图1 计算节点

其中，左参数是某个Agent实例的属性，参数1和参数2可以是常数、Agent实例的属性或者方法调用的返回值，操作符可以是”+, -, *, /”，如下图所示：

![compute]({{ site.baseurl }}/img/references/compute_prop.png)

图2 计算节点的属性

请注意这些操作的“粒度”过小，大量这种小粒度的操作可能对性能造成影响。

另外，如果需要修改某些其他没有导出的属性，或做一些复杂的计算时，可以通过[动作节点]({{ site.baseurl }}/docs/zh/references/action/)调用相应的函数来实现修改或计算。

具体的执行逻辑可以查看[behaviortree/nodes/actions/compute.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/actions/compute.cpp)
