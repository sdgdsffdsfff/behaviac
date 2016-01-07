---
layout: docs_relatives
title: 等待帧数节点 
date: 2016-01-07 11:52:15 +0800
author: cainhuang
permalink: /docs/zh/references/waitframes/
categories: [reference]
lang: zh
---

等待帧数（WaitFrames）节点在指定的帧数内持续保持为运行（Running）状态，帧数到达或超过之后则返回成功，如下图所示：

![waitframes]({{ site.baseurl }}/img/references/waitframes.png)

图1 等待帧数节点

需要配置“帧数”，可以是常数、属性或方法的返回值（必须是int类型），如下图所示：

![waitframes]({{ site.baseurl }}/img/references/waitframes_prop.png)

图2 等待帧数节点的属性

具体的执行逻辑可以查看[behaviortree/nodes/actions/waitframes.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/actions/waitframes.cpp)
