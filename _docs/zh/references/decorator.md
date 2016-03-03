---
layout: docs_relatives
title: 装饰节点 
date: 2016-01-19 10:27:15 +0800
author: cainhuang
permalink: /docs/zh/references/decorator/
categories: [reference]
lang: zh
---

装饰节点作为控制分支节点，必须且只接受一个子节点。装饰节点的执行首先执行子节点，并根据自身的控制逻辑以及子节点的返回结果决定自身的状态。

装饰节点都有属性“子节点结束时作用（DecorateChildEnds）”可以配置，如果该值配置为真，则仅当子节点结束（成功或失败）的时候，装饰节点的装饰逻辑才起作用。

## 输出消息（Log）节点

输出消息节点作为调试的辅助工具，执行完子节点后，输出配置的消息，如下图所示：

![log]({{ site.baseurl }}/img/references/log.png)

图1 输出消息节点

可以在“输出消息”属性中设置想输出的任何消息，如下图所示：

![log]({{ site.baseurl }}/img/references/log_prop.png)

图2 输出消息节点的属性

具体的执行逻辑可以查看[behaviortree/nodes/decorators/decoratorlog.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratorlog.cpp)

## 非（Not）节点

非节点将子节点的返回值取反，如下图所示：

![not]({{ site.baseurl }}/img/references/not.png)

图3 非节点

类似于逻辑“非”操作，非节点对子节点的返回值执行如下操作：

- 如果子节点失败，那么此节点返回成功。

- 如果子节点成功，那么此节点返回失败。

- 如果子节点返回正在执行，则同样返回正在执行。

具体的执行逻辑可以查看[behaviortree/nodes/decorators/decoratornot.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratornot.cpp)

## 循环（Loop）节点

循环节点循环执行子节点指定的次数，如下图所示：

![loop]({{ site.baseurl }}/img/references/loop.png)

图4 循环节点

具体的执行逻辑可以查看[behaviortree/nodes/decorators/decoratorloop.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratorloop.cpp)

## 循环直到（LoopUntil）节点

循环直到节点在指定的次数到达后返回成功，在指定的次数到达前一直返回正在执行。如果指定的次数小于0，则表示无限循环，总是返回正在执行。如下图所示：

![loopuntil]({{ site.baseurl }}/img/references/loopuntil.png)

图5 循环直到节点

循环直到节点除了像循环节点可以配置循环的次数，还有一个属性“直到子树”需要配置，如下图所示：

![loopuntil_prop]({{ site.baseurl }}/img/references/loopuntil_prop.png)

图6 循环直到节点的属性

循环直到节点有两个结束条件，指定的“循环次数”到达或者子树的返回值与配置的“直到子树”值一样：

- 指定的“循环次数”到达的时候，则返回成功。

- 指定的“循环次数”小于0的时候，则是无限循环，等同于只检查子树的返回值是否满足。

- 子树的返回值满足的时候：

	- 如果“直到子树”设置为真，意味着直到子树返回成功，也返回成功。
	
	- 如果“直到子树”设置为假，意味着直到子树返回失败，也返回失败。

具体的执行逻辑可以查看[behaviortree/nodes/decorators/decoratorloopuntil.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratorloopuntil.cpp)

## 重复（Repeat）节点

重复节点根据指定的次数，在一次更新过程中重复执行子节点然后返回，如下图所示：

![repeat]({{ site.baseurl }}/img/references/repeat.png)

图7 重复节点

重复节点根据子节点的返回值相应的返回：

- 如果子节点失败了，则返回失败。

- 如果子节点一直运行，则本节点一直阻塞。但如果“子节点结束时作用”不为真，则不会阻塞。

- 其他情况，则返回成功。

- 本节点只能成功或失败，不会返回运行。

重复节点可以配置重复执行的“次数”和“子节点结束时作用”，如下图所示：

![repeat_prop]({{ site.baseurl }}/img/references/repeat_prop.png)

图8 重复节点的属性

具体的执行逻辑可以查看[behaviortree/nodes/decorators/decoratorrepeat.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratorrepeat.cpp)

## 时间（Time）节点

时间节点用于在指定的时间内，持续调用其子节点，如下图所示：

![time]({{ site.baseurl }}/img/references/time.png)

图9 时间节点

时间节点可以配置其属性“时间”，该属性是float或double类型，可以配置一个常量、成员属性或方法的返回值，如下图所示：

![time]({{ site.baseurl }}/img/references/time_prop.png)

图10 时间节点的属性

具体的执行逻辑可以查看[behaviortree/nodes/decorators/decoratortime.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratortime.cpp)

## 帧数（Frames）节点

帧数节点用于在指定的帧数内，持续调用其子节点，如下图所示：

![frames]({{ site.baseurl }}/img/references/frames.png)

图11 帧数节点

帧数节点可以配置其属性“帧数”，该属性是int类型，可以配置一个常量、成员属性或方法的返回值，如下图所示：

![frames]({{ site.baseurl }}/img/references/frames_prop.png)

图12 帧数节点的属性

具体的执行逻辑可以查看[behaviortree/nodes/decorators/decoratorframes.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratorframes.cpp)

## 计数限制（CountLimit）节点

计数限制节点不同于循环节点，它在指定的循环次数到达前返回子节点返回的状态，无论成功、失败还是正在执行，如下图所示：

![countlimit]({{ site.baseurl }}/img/references/countlimit.png)

图13 计数限制节点

计数限制节点在指定的循环次数到达后不再执行。如果指定的循环次数小于0，则表示无限循环，等同于什么操作都没有，只是执行子节点并且返回子节点的返回值。

此外，计数限制节点上还可以添加中断条件作为重新开始条件，如下图所示：

![countlimit]({{ site.baseurl }}/img/references/countlimit_interupt.png)

图14 带中断条件的计数限制节点

具体的执行逻辑可以查看[behaviortree/nodes/decorators/decoratorcountlimit.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratorcountlimit.cpp)

## 返回成功直到（SuccessUntil）/返回失败直到（FailureUntil）

返回成功直到节点在指定的次数到达前返回成功，指定的次数到达后返回失败。如果指定的次数小于0，则总是返回成功。如下图所示：

![successuntil]({{ site.baseurl }}/img/references/successuntil.png)

图15 返回成功直到节点

返回失败直到节点在指定的次数到达前返回失败，指定的次数到达后返回成功。如果指定的次数小于0，则总是返回失败。如下图所示：

![failureuntil]({{ site.baseurl }}/img/references/failureuntil.png)

图16 返回失败直到节点

具体的执行逻辑可以分别查看[behaviortree/nodes/decorators/decoratorsuccessuntil.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratorsuccessuntil.cpp)和[behaviortree/nodes/decorators/decoratorfailureuntil.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/decorators/decoratorfailureuntil.cpp)
