---
layout: docs_relatives
title: 赋值节点 
date: 2016-01-07 9:34:15 +0800
author: cainhuang
permalink: /docs/zh/references/assignment/
categories: [reference]
lang: zh
---
 
赋值（Assignment）节点实现了赋值的操作，可以把右边的值赋值给左侧的参数，如下图所示：

![assignment]({{ site.baseurl }}/img/references/assignment.png)

图1 赋值节点

其中，左参数是某个Agent实例的属性，右参数可以是常数、Agent实例的属性或者方法调用的返回值，如下图所示：

![assignment]({{ site.baseurl }}/img/references/assignment_prop.png)

图2 赋值节点的属性

当需要对某个属性做一些加减乘除运算的时候，可以用[计算节点]({{ site.baseurl }}/docs/zh/references/compute/)。

另外，如果需要修改某些其他没有导出的属性，或做一些复杂的计算时，可以通过[动作节点]({{ site.baseurl }}/docs/zh/references/action/)调用相应的函数来实现修改或计算。

具体的执行逻辑可以查看[behaviortree/nodes/actions/assignment.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/actions/assignment.cpp)
