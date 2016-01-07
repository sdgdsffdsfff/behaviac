---
layout: docs_relatives
title: 等待信号节点 
date: 2016-01-07 14:36:15 +0800
author: cainhuang
permalink: /docs/zh/references/waitforsignal/
categories: [reference]
lang: zh
---

等待信号（WaitforSignal）节点模拟了等待某个条件的“阻塞”过程。

等待帧数节点返回Running，直到它上面附加的条件是true的时候：

- 如果有子节点，则执行其子节点，并当子节点结束时，返回该子节点的返回值。
- 如果没有子节点，则直接返回成功。

在图1中，该等待信号节点一直“阻塞”直到它上面附加的条件是true的时候才结束“阻塞”，从而继续序列节点中后面的节点：

![waitforsignal]({{ site.baseurl }}/img/references/waitforsignal.png)

图1 不带子节点的等待帧数节点

而在图2中，则是在该等待信号节点上附加的条件是true的时候，结束“阻塞”而执行其子节点。

![waitforsignal]({{ site.baseurl }}/img/references/waitforsignal2.png)

图2 带子节点的等待帧数节点

具体的执行逻辑可以查看[behaviortree/nodes/actions/waitforsignal.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/actions/waitforsignal.cpp)
