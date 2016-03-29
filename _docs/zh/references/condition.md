---
layout: docs_relatives
title: 条件节点 
date: 2016-01-18 17:51:15 +0800
author: cainhuang
permalink: /docs/zh/references/condition/
categories: [reference]
lang: zh
---

条件（Condition）节点对左右参数进行比较，如下图所示：

![condition]({{site.url}}{{site.baseurl}}/img/references/condition.png)

图1 条件节点

条件节点根据比较结果返回成功或失败，但永远不会返回正在执行（Running）：

- 如果结果为真，则返回成功。

- 如果结果为假，则返回失败。

通常左参数是Agent的某个属性或某个有返回值的方法，用户可以从下拉列表里选择，右参数是相应类型的常数、Agent的某个属性或某个有返回值的方法，如下图所示：

![condition]({{site.url}}{{site.baseurl}}/img/references/condition_prop.png)

图2 条件节点的属性

条件节点没有提供取反的属性。如果需要取反，请用《[非（Not）节点]({{site.url}}{{site.baseurl}}/docs/zh/references/decorator/)》来装饰。

具体的执行逻辑可以查看[behaviortree/nodes/conditions/condition.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/conditions/condition.cpp)
