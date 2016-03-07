---
layout: docs_relatives
title: Agent实例的用法
date: 2016-01-05 15:25:26 +0800
author: cainhuang
permalink: /docs/zh/tutorials/instance/
categories: [tutorial]
lang: zh
---

在编辑器的节点属性窗口中，为了给某个节点选择和配置属性，首先需要选择一个实例（instance），然后再选择该实例的属性或方法，如下图所示：

![]({{site.url}}{{site.baseurl}}/img/tutorials/tutorial17/instance_list.png)

图1 实例列表

这些实例主要来自于如下三个方面：

- Self：表示当前行为树根节点所配置的Agent类型的实例，类似于程序语言中的this。

- 成员实例：当前行为树根节点所配置的Agent类型的成员属性、定制属性或局部变量，也是Agent或其子类类型。

- 全局实例：运行时端（游戏端）注册和导出的各种Agent或其子类的全局实例。

其中，成员实例无需编写额外代码来进行注册和导出，behaviac组件会自动根据当前行为树根节点所配置的Agent类型，列举出所有的成员实例以供选择。但在使用该成员实例之前，需要确保该实例已经赋过值，不是空指针/引用。

对于全局实例，在运行时端（游戏端）的各种Agent或其子类实例的名字注册和绑定的设计意图，主要是为了支持单件（Singleton）或者类似确定的全局性的实例（同一个类可能会有若干个实例而不是仅仅有一个实例），例如：player，camera，director等。

注意：只有通过RegisterInstanceName注册过的“名字”才在导出元信息时被导出；而BindInstance和Create等与实例相关的函数在执行行为树的时候才需要，如果只是导出元信息则不需要。

### C++中全局实例的注册

Agent::RegisterInstanceName可以注册一个名字，该名字表示游戏中某个Agent类的实例，如下代码所示：


```cpp

behaviac::Agent::RegisterInstanceName<AgentNodeTest>();
behaviac::Agent::RegisterInstanceName<behaviac::Agent>("Name_Agent_0");

```

需要说明的是，游戏中需要调用Agent::Create或Agent::BindInstance创建实例并且绑定到该名字。如果指定的名字没有注册或注册的类型不同或该名字已经绑定，则调用Agent::CreateInstance的时候会有runtime的错误。

当调用Agent::RegisterInstanceName和Agent::Create而没有指定名字的时候，该Agent类型的名字将作为实例的名字被注册和绑定，如下代码所示：


```cpp

behaviac::Agent* testAgentA = behaviac::Agent::Create<behaviac::Agent>("Name_Agent_0");
AgentNodeTest* testAgentB = behaviac::Agent::Create<AgentNodeTest>(NULL);

behaviac::Agent* testAgent_0 = behaviac::Agent::GetInstance<behaviac::Agent>("Name_Agent_0");
AgentNodeTest* testAgent_1 = behaviac::Agent::GetInstance<AgentNodeTest>();

behaviac::Agent::BindInstance(testAgent_0, "Name_Agent_0");
behaviac::Agent::BindInstance(testAgent_1, “AgentNodeTest”);

CHECK_EQUAL(testAgent_0, testAgentA);
CHECK_EQUAL(testAgent_1, testAgentB);

behaviac::Agent::UnbindInstance("Name_Agent_0");
behaviac::Agent::UnbindInstance("AgentNodeTest");

```

更多细节可以参考behaviac组件C++源码中附带的test工程的[btloadtest.cpp]({{site.repository}}/blob/master/test/btunittest/Others/btloadtest.cpp)文件。

### C# 中全局实例的注册

类似的，在C#中实例的注册和绑定相关代码如下：

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
