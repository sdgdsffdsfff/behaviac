---
layout: docs_relatives
title: 状态机
date: 2016-02-18 14:28:00 +0800
author: cainhuang
permalink: /docs/zh/references/fsm/
categories: [reference]
lang: zh
---

behaviac组件不仅支持行为树，也支持有限状态机（FSM），并且支持行为树跟状态机的相互嵌套调用。

behaviac组件中的状态机主要用到了状态（State）、等待状态（WaitState）和等待帧数状态（WaitFramesState）三种节点，以及转换（Transition）和总是转换（AlwaysTransition）两种附件，如下图所示：

![fsm_nodes]({{site.url}}{{site.baseurl}}/img/references/fsm_nodes.png)

图1 状态机相关节点和附件

## 状态节点

状态节点（State）是状态机中的基本组成部分之一，可以在状态节点上添加前置、后置以及转换等附件，如下图所示：

![state]({{site.url}}{{site.baseurl}}/img/references/state.png)

图2 状态节点

- 在状态节点上添加的前置：表明进入该状态节点时，需要执行的操作。

- 在状态节点上添加的后置：表明退出该状态节点时，需要执行的操作。

- 在状态节点上添加的转换：表明满足该转换所表示的条件时，由当前状态切换到转换所指向的下一个状态。

如下图所示，可以编辑状态节点的相关属性：

![state]({{site.url}}{{site.baseurl}}/img/references/state_prop.png)

图3 状态节点的属性

- 名字：为状态节点指定一个有意义的名字，以便区分其他状态节点。

- 方法：表示该状态节点需要执行的操作。

- 结束状态：如果勾选，表示该状态作为结束状态，即在执行完该状态节点之后，整个状态机也直接结束。

具体的执行逻辑可以查看[fsm/fsmstate.cpp]({{site.repository}}/blob/master/src/fsm/fsmstate.cpp)

## 等待状态节点

等待状态节点（WaitState）是一种特殊的状态节点，可以在状态节点上添加前置、后置以及等待转换等附件，如下图所示：

![waitstate]({{site.url}}{{site.baseurl}}/img/references/waitstate.png)

图4 等待状态节点

添加等待状态节点时，会自动的生成唯一的等待转换附件，不接受添加其他类型的转换附件。

如下图所示，可以编辑等待状态节点的相关属性：

![waitstate]({{site.url}}{{site.baseurl}}/img/references/waitstate_prop.png)

图5 等待状态节点的属性

相比状态节点的属性，等待状态节点少了“方法”属性，但多出了一个“持续时间”属性，用来指定需要等待多长时间，可以是常数、属性或方法的返回值。

具体的执行逻辑可以查看[fsm/waitstate.cpp]({{site.repository}}/blob/master/src/fsm/waitstate.cpp)

## 等待帧数状态节点

等待帧数状态节点（WaitFramesState）也是一种特殊的状态节点，可以在状态节点上添加前置、后置以及等待转换等附件，如下图所示：

![waitframesstate]({{site.url}}{{site.baseurl}}/img/references/waitframesstate.png)

图6 等待帧数状态节点

添加等待帧数状态节点时，会自动的生成唯一的等待转换附件，不接受添加其他类型的转换附件。

如下图所示，可以编辑等待帧数状态节点的相关属性：

![waitframesstate]({{site.url}}{{site.baseurl}}/img/references/waitframesstate_prop.png)

图7 等待帧数状态节点的属性

相比状态节点的属性，等待帧数状态节点少了“方法”属性，但多出了一个“帧数”属性，用来指定需要等待多少帧数，可以是常数、属性或方法的返回值。

具体的执行逻辑可以查看[fsm/waitframesstate.cpp]({{site.repository}}/blob/master/src/fsm/waitframesstate.cpp)

## 转换附件

转换附件（Transition）是状态机中的基本组成部分之一，它表示一个条件，当这个条件满足时，由所在的状态切换到另一个状态，如下图所示：

![transition]({{site.url}}{{site.baseurl}}/img/references/transition.png)

图8 转换附件

如下图所示，类似条件节点来编辑转换附件的相关属性：

![transition]({{site.url}}{{site.baseurl}}/img/references/transition_prop.png)

图9 转换附件的属性

此外，在上图中有个“效果”的属性，是转换附件执行完之后需要执行的额外操作。

具体的执行逻辑可以查看[fsm/startcondition.cpp]({{site.repository}}/blob/master/src/fsm/startcondition.cpp)

## 总是转换附件

总是转换附件（AlwaysTransition）是一种特殊的转换附件，表示无条件从所在的状态切换到另一个状态，如下图所示：

![alwaystransition]({{site.url}}{{site.baseurl}}/img/references/alwaystransition.png)

图10 总是转换附件

具体的执行逻辑可以查看[fsm/alwaystransition.cpp]({{site.repository}}/blob/master/src/fsm/alwaystransition.cpp)
