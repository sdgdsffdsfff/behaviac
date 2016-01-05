---
layout: docs_relatives
title: Agent实例的用法
date: 2016-01-05 15:25:26 +0800
author: cainhuang
permalink: /docs/zh/tutorials/instance/
categories: [tutorial]
lang: zh
---

在编辑器中，为了给某个节点选择配置属性，首先需要选择一个实例（instance），然后再选择该实例的属性或方法，如下图所示：

![]({{site.url}}{{site.baseurl}}/img/tutorials/tutorial17/instance_list.png)

图1 实例列表

这些实例主要来自于如下三个方面：

- Self：表示当前行为树根节点所配置的Agent类型的实例，类似于程序语言中的this。

- 成员实例：当前行为树根节点所配置的Agent类型的成员属性、定制属性或局部变量，也是Agent或其子类类型。

- 全局实例：运行时端（游戏端）注册和导出的各种Agent或其子类的全局实例。

其中，成员实例无需编写额外代码来进行注册和导出，behaviac组件会自动根据当前行为树根节点所配置的Agent类型，列举出所有的成员实例以供选择。但在使用该成员实例之前，需要确保该实例已经赋过值，不是空指针。

对于全局实例，在运行时端（游戏端）的各种Agent或其子类的实例可以通过注册来导出，如下代码所示：

### C++中全局实例的注册

``` c++

behaviac::Agent::RegisterInstanceName<AgentNodeTest>();
behaviac::Agent::RegisterInstanceName<behaviac::Agent>("Name_Agent_0");

behaviac::Agent* testAgentA = behaviac::Agent::Create<behaviac::Agent>("Name_Agent_0");
AgentNodeTest* testAgentB = behaviac::Agent::Create<AgentNodeTest>(NULL);

behaviac::Agent* testAgent_0 = behaviac::Agent::GetInstance<behaviac::Agent>("Name_Agent_0");
AgentNodeTest* testAgent_1 = behaviac::Agent::GetInstance<AgentNodeTest>();

CHECK_EQUAL(testAgent_0, testAgentA);
CHECK_EQUAL(testAgent_1, testAgentB);

BEHAVIAC_ASSERT(testAgent_0);
BEHAVIAC_ASSERT(testAgent_1);

behaviac::Agent::UnbindInstance("Name_Agent_0");
behaviac::Agent::UnbindInstance("AgentNodeTest");

```

更多细节可以参考behaviac组件C++源码中附带的test工程的[btloadtest.cpp]({{site.repository}}/blob/master/test/btunittest/Others/btloadtest.cpp)文件。

### C# 中全局实例的注册

``` c#

behaviac.Agent.RegisterInstanceName<AgentNodeTest>();
behaviac.Agent.RegisterInstanceName<behaviac.Agent>("Name_Agent_0");

behaviac.Agent.BindInstance(parTestAgent, "Name_Agent_0");
behaviac.Agent.BindInstance(nodeTestAgent, "AgentNodeTest");

behaviac.Agent testAgent_0 = behaviac.Agent.GetInstance<behaviac.Agent>("Name_Agent_0");
AgentNodeTest testAgent_1 = behaviac.Agent.GetInstance<AgentNodeTest>();
AgentNodeTest testAgent_3 = behaviac.Agent.GetAgent("AgentNodeTest") as AgentNodeTest;

Assert.AreEqual(testAgent_0, parTestAgent);
Assert.AreEqual(testAgent_1, nodeTestAgent);
Assert.AreEqual(testAgent_1, testAgent_3);
Assert.NotNull(testAgent_0);
Assert.NotNull(testAgent_1);

behaviac.Agent.UnbindInstance("Name_Agent_0");
behaviac.Agent.UnbindInstance("AgentNodeTest");

```

更多细节可以参考behaviac组件C#源码中附带的integration/unity工程的[OtherUnitTest.cs]({{site.repository}}/blob/master/integration/unity/Assets/Scripts/behaviac/BehaviacUnitTest/Editor/ParUnitTest/OtherUnitTest.cs)文件。