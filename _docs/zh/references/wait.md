---
layout: docs_relatives
title: 等待节点 
date: 2016-01-07 10:47:15 +0800
author: cainhuang
permalink: /docs/zh/references/wait/
categories: [reference]
lang: zh
---

等待（Wait）节点在指定的时间（单位：毫秒ms）内持续保持为运行（Running）状态，时间到达之后则返回成功，如下图所示：

![wait]({{ site.baseurl }}/img/references/wait.png)

图1 等待节点

需要配置“持续时间”，可以是常数、属性或方法的返回值（必须是float类型），如下图所示：

![wait]({{ site.baseurl }}/img/references/wait_prop.png)

图2 等待节点的属性

具体的执行逻辑可以查看[behaviortree/nodes/actions/wait.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/actions/wait.cpp)
