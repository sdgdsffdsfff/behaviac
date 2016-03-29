---
layout: docs_relatives
title: 或节点 
date: 2016-01-18 18:06:15 +0800
author: cainhuang
permalink: /docs/zh/references/or/
categories: [reference]
lang: zh
---

或（Or）节点接受两个以上的条件子节点，执行逻辑"或（||）"操作，如下图所示：

![or]({{site.url}}{{site.baseurl}}/img/references/or.png)

图1 或节点

只要有一个条件子节点的返回值为成功，或节点则返回成功。所有条件子节点都返回为失败，或节点则返回失败。

具体的执行逻辑可以查看[behaviortree/nodes/conditions/or.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/conditions/or.cpp)
