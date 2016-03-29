---
layout: docs_relatives
title: 空操作节点 
date: 2016-01-07 11:52:15 +0800
author: cainhuang
permalink: /docs/zh/references/noop/
categories: [reference]
lang: zh
---

空操作（Noop）节点只是作为占位，仅执行一次就返回成功，如下图所示：

![noop]({{site.url}}{{site.baseurl}}/img/references/noop.png)

图1 空节点

具体的执行逻辑可以查看[behaviortree/nodes/actions/noop.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/actions/noop.cpp)
