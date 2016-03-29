---
layout: docs_relatives
title: 与节点 
date: 2016-01-18 18:14:15 +0800
author: cainhuang
permalink: /docs/zh/references/and/
categories: [reference]
lang: zh
---

与（And）节点接受两个以上的条件子节点，执行逻辑"与（&&）"操作，如下图所示：

![and]({{site.url}}{{site.baseurl}}/img/references/and.png)

图1 与节点

只要有一个条件子节点的返回值为失败，与节点则返回失败。所有条件子节点都返回为成功，与节点则返回成功。

具体的执行逻辑可以查看[behaviortree/nodes/conditions/and.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/conditions/and.cpp)
