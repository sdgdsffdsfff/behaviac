---
layout: docs_relatives
title: 动作节点 
date: 2016-01-06 15:49:15 +0800
author: cainhuang
permalink: /docs/zh/references/action/
categories: [reference]
lang: zh
---

动作（Action）节点在behaviac中几乎是最重要的节点，如下图所示：

![action]({{ site.baseurl }}/img/references/action.png)

图1 动作节点

动作节点通常对应Agent的某个方法（Method），可以从下拉列表里为其选择方法，如下图所示：

![action]({{ site.baseurl }}/img/references/action_prop.png)

图2 动作节点的属性

在设置其方法后，需进一步设置其“决定状态的选项（Status Option）”或“决定状态的函数（Status Functor）”，如上图所示，如果没有正确配置，则视为错误不能被导出。

- “决定状态的选项”的作用是不管动作的方法的返回值是什么，都强制返回设定的EBTStatus值（即Success、Failure或Running）。

- “决定状态的函数”的作用是将动作的方法的返回值从不是EBTStatus类型，转换为执行行为树所需要的EBTStatus值（即Success、Failure或Running）。

有三种设置来决定每次执行动作节点后的状态（Success、Failure或Running）：

- 如果动作节点的方法返回EBTStatus值，那么该值就直接作为动作节点的状态，“决定状态的选项”和“决定状态的函数”将被禁用无需设置。

- 否则，需要设置“决定状态的选项”：当选择Invalid值时，表明需要进一步设置“决定状态的函数”，否则禁用“决定状态的函数”项，并直接使用“决定状态的选项”所选择的值（Success、Failure或Running），表示该方法执行完毕后，动作节点将返回这个设置的值。

- 在“决定状态的函数”项中选择的函数，其返回值必然是EBTStatus，作为动作节点的状态。该函数只有一个或者没有参数，当动作节点的方法无返回值时，该函数没有参数，当动作节点的方法有返回值时，该函数唯一参数的类型为动作节点方法的返回值类型。也即，

	- 当方法的原型是void Method(…)的时候，“决定状态的函数”的原型为：EBTStatus StatusFunctor()。

	- 当方法的原型是ReturnType Method(…)的时候，“决定状态的函数”的原型为：EBTStatus StatusFunctor(ReturnType param)。
	
具体的执行逻辑可以查看[behaviortree/nodes/actions/action.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/actions/action.cpp)
