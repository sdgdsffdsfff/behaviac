---
layout: docs_relatives
title: behaviac overview
date: 2016-03-21 12:33:26 +0800
author: jonygli
permalink: /docs/en/articles/overview/
categories: [doc]
lang: en
---

## Overview

### What it is

 - behaviac is an AI development framework for games. Also, it is a rapid designing tool for developing game prototypes.
 - It supports behavior tree, finite state machine, hierarchical task network, etc. It is easy to edit and debug.
 - It supports all platforms and is applicable to both the client and the server. It helps to speed up the Iterative development.
 - Currently it is being used by many projects within Tencent. It is also open source on famous domestic and foreign websites like GitHub and CSDN.
 - It supports both C++ and C# and has native support of C# for Unity Engine. It supports all main stream platforms, including Windows, Linux, Android, iOS, etc.
 - It has powerful function, great extensibility, and plentiful documents. Also, it supports both Chinese and English UI.
 - This component can be used in (but not limited) to in-game logic, character’s AI, control of rendering, etc.
 - All source code, both the designer and runtime are open source and they can be accessed by [https://github.com/TencentOpen/behaviac](https://github.com/TencentOpen/behaviac)

### Features and User Value

 - The interaction between Designer and C++/C# when running is based on Meta. It can utilize program codes sufficiently. Also it provides GUI for high-level logic.
 - Users can create and edit Meta in Designer. It is convenient for game designers to implement prototypes in advance.
 - It supports exporting files in different file formats such as XML, BSON, C++, C#, etc. It provides high efficiency for loading and executing. Also it uses Hot-loading to boost the efficiency of the development.
 - Designer is fully functioned. It supports Prefab, Undo/Redo, Sub tree, Event, etc.
 - The types of data and types of nodes that it supported can be easily expanded.
 - It supports real-time debugging and offline debugging. It shows logic graphically and make debugging convenient.
 - These are use cases that are supported but not limited to (not just for AI):
     - Character AI
     - Squad Logic
     - Strategy AI
     - In-Game Tutor
     - Animation Control
     - Player Avatars

### Project Link

You can get more information from [https://github.com/TencentOpen/behaviac](https://github.com/TencentOpen/behaviac).
and you can ask questions for anwsers at [http://bbs.behaviac.com/](http://bbs.behaviac.com/)

## Background

One goal of the video game’s AI is to find a plan of logic development that is easy and expandable. Highly used technologies include FSM, HFSM, GOAP, HTN, etc.
One goal of the video game’s AI is to find a plan of logic development that is easy and expandable. Highly used technologies include FSM, HFSM, GOAP, HTN, etc.
Behavior Tree is the next generation AI technology. Its original concept is brought up a decade ago. Triple A titles like Halo, Spore and Crysis all used Behavior Tree. Currently, many well-known game engines have integrated or provided their own Behavior Tree component, for example: Unreal engine, Unity engine, etc.


### Finite State Machine

Many programmers are familiar with Finite State Machine. State machine technology has become mature and popular among video game developments. It reflects the change of input from the start of the system to the current.

 - Action：It means the description of the event that is underway at a given time.
 - State： It means the object’s certain state. At the current state, it may have different behaviors and properties
 - Transition： It means the change of state. Also, it has to satisfy the conditions that ensure the transition would happen to execute.
  - State Machine：A State Machine is a manager that controls object’s state. An object’s state would not change without a reason; it changes when certain Event is triggered. 

Different states may decide an object’s different properties and behaviors. .
The following picture shows finite state machine that maintains a graph. All nodes in the graph are states. A line between nodes is state transition that is according to the execution of certain rules between states. Logic in any nodes can be described as:

 - If satisfy condition 1 then jump to state 1;
 - If satisfy condition 2 then jump to state 2;
 - ….;
 - Or else don’t jump and keep the current state.

![]({{site.url}}{{site.baseurl}}/img/overview/fsm.png)

The finite state machine has advantages. For some simple AI, it is more convenient to use state machine. But when it comes to some complex AI, the logic would be complicated and overloaded. Also, when there is a need to expand the current behavior logic, coding would be difficult. Because the number of states that are required to be maintained increases manifold.

### Behavior Tree

Behavior Tree makes the process of achieving AI requiring more skill. Framework designers comprehensively consider all possible situations and make every situation a type of abstract node. What game developers need to do is to connect all the nodes according to the rules to make a Behavior Tree that is required. Hence, the Behavior Tree would have more object-oriented properties. 

#### Basic concept
On the concept, Behavior Tree is a script that is showed to users in the form of a tree. **The execution result of a node is managed by its parent node to decide what to do next.** Since there is no more transition between nodes, they wouldn’t be called state, nodes are only behaviors.

![]({{site.url}}{{site.baseurl}}/img/overview/bt.png)

Leaf nodes and branch nodes can mainly be split into five categories: action, condition, composite, decorator and attachment. Action and condition nodes are Leaf nodes, composite and decorator nodes are branch nodes. The attachment must attach to the other four types of nodes and cannot be existed independently. 

**Every node must provide its return value to its parent node after the execution ends. Return values of nodes include Success, Failure and Running**. Basic behaviors (Leaf nodes) may execute successfully or failed to execute. The execution result of the high level behavior (branch note) is depended on its child node’s execution result. The failure of one child node’s execution may lead its parent node to select other child nodes.

#### Commonly used nodes in Behavior Tree

 - Action node: It belongs to Leaf node. It is used to describe an action that is executed. 
 - Condition node: It belongs to Leaf node. It is used to describe whether a condition can hold. 
 - Selector node: It belongs to Composite node. It is used to execute child nodes in order. If one of its child node return successfully, then the whole branch would return successfully. Otherwise the whole branch would fail to return. It is similar to OR logic in programming.
 - Sequence node: It belongs to Composite node. It is used to execute child nodes in order. If one of its child nodes fails to return, then the whole branch would fail to return. Otherwise the whole branch would return successfully. It is similar to AND logic in programming.

#### The execution of a Behavior Tree

The execution of a Behavior Tree is driven by cyclical updates of frames. Not every frame needs to be updated, but it requires to be executed periodically. The execution of Behavior Tree is similar to the concept of Coroutine, a running behavior tree continues its execution in the next update. The next execution of an ended Behavior Tree that returned either successfully or failed would start from the root node.

A Behavior Tree needs to configure an Agent type at first. An Agent is an AI character in the game. All of the nodes in this Behavior Tree (mainly Leaf nodes) can select agent’s properties, methods and other properties to configure. Information like Agent type, property and method are called Meta.

#### Advantages of Behavior Tree

 - The separation of behavior logic and status data. Any nodes can be used repeatedly. 
 - High re-usability can combine different nodes to achieve different Behavior Trees.
 - Linear layout, easy to expand.
 - Can configure, game designers can handle the work.

## behaviac Overview

behaviac includes designer and runtime: Designer is used for editing Behavior Tree and Runtime library is used for explaining and executing Behavior Tree. Runtime library has to be integrated to users’ own game projects.
Designer interacts with runtime through Meta.

![]({{site.url}}{{site.baseurl}}/img/overview/meta.png)

### Meta

Meta is the core of behaviac, it contains information of Agent type, property, method, etc. Agent is in charge of executions of Behavior Trees in games. Every Agent contains its data or the action to execute itself; this data is called Property and this action is called Method. Meta is the description of an Agent. It contains its property and method.

Runtime library produces a XML file that describes agent’s Meta. Runtime library can export Meta and provide Meta to the Designer. The Designer can also edit and export Meta to Runtime library.

#### C++ Meta

```cpp

BEGIN_PROPERTIES_DESCRIPTION(AgentNodeTest)
{
    //CLASS_DISPLAYNAME(L"测试behaviac::Agent")
    //CLASS_DESC(L"测试behaviac::Agent的说明")
    REGISTER_PROPERTY(testVar_0);
    REGISTER_PROPERTY(testVar_1).DISPLAYNAME(L"testVar_1").DESC(L"testVar_1 property").RANGE(100);
    REGISTER_PROPERTY(testVar_2);
    REGISTER_PROPERTY(testVar_3);
    REGISTER_PROPERTY(waiting_timeout_interval);
    REGISTER_PROPERTY(testVar_str_0);

    REGISTER_METHOD(setEventVarInt);
    REGISTER_METHOD(setEventVarBool);
    REGISTER_METHOD(setEventVarFloat);
    REGISTER_METHOD(setEventVarAgent);
    REGISTER_METHOD(getConstOne);
    REGISTER_METHOD(setTestVar_0);
    REGISTER_METHOD(setTestVar_1);
    REGISTER_METHOD(setTestVar_2);
    REGISTER_METHOD(setTestVar_0_2);
    REGISTER_METHOD(setTestVar_R);
    REGISTER_METHOD(setTestVar_3);
    REGISTER_METHOD(enter_action_0);
    REGISTER_METHOD(exit_action_0);
    REGISTER_METHOD(enter_action_1);
    REGISTER_METHOD(exit_action_1);
    REGISTER_METHOD(enter_action_2);
    REGISTER_METHOD(exit_action_2);
    REGISTER_METHOD(createGameObject);
    REGISTER_METHOD(testGameObject);
    REGISTER_METHOD(createExtendedNode);
    REGISTER_METHOD(testExtendedRefType);
    REGISTER_METHOD(testExtendedStruct);
    REGISTER_METHOD(switchRef);

    REGISTER_METHOD(CanSeeEnemy);
    REGISTER_METHOD(Move);
    REGISTER_METHOD(MoveToTarget);
}
END_PROPERTIES_DESCRIPTION()

```

#### C# Meta

{% highlight cs %}

[behaviac.TypeMetaInfo()]
public class AgentNodeTest : behaviac.Agent
{
    [behaviac.MemberMetaInfo()]
    public int testVar_0 = -1;

    [behaviac.MemberMetaInfo("testVar_1", "testVar_1 property", 100)]
    public int testVar_1 = -1;

    [behaviac.MemberMetaInfo()]
    public float testVar_2 = -1.0f;

    [behaviac.MemberMetaInfo()]
    public float testVar_3 = -1.0f;

    [behaviac.MemberMetaInfo()]
    public int waiting_timeout_interval = 0;

    [behaviac.MemberMetaInfo()]
    public string testVar_str_0 = string.Empty;

    [behaviac.MemberMetaInfo()]
    public string testVar_str_1 = string.Empty;

    public bool m_bCanSee = false;

    public int event_test_var_int = -1;
    public bool event_test_var_bool = false;
    public float event_test_var_float = -1.0f;
    public AgentNodeTest event_test_var_agent = null;
}
{% endhighlight %}

One of the traits of behaviac is to create and edit Meta in the Designer. Game designers can edit Behavior Trees and Meta. In the early stage of a project, before programmers write codes, game designers can manually create some Meta like Agent types, properties and methods. This can boost the creation of the game prototype. Game designers can edit a game’s prototype without waiting for programmers.

The picture below shows by opening the Meta browser that is in the Designer, users can view or create Agent type. After selecting one Agent type, users can view its information such as property, methods and expand Agent type’s members’ properties, methods, etc.

![]({{site.url}}{{site.baseurl}}/img/overview/metabrowser.png)

### Data Type

Data Type is divided into Agent, Enumeration：Enumeration and Structure.

 - Agent：It is the basic composed element of a Behavior Tree. In the Meta browser, we can view all the Agent types that are exported and created. These Agent types include   variables and methods. We can add agent subclasses in the Meta browser; add properties and methods to its members. But we need to write required logic code to achieve methods.
 - Enumeration：Enumeration types that are used on the game end will be exported in the Meta files. In the Meta browser we can add enumeration types, export and generate C++ or C# source code. Then add the source code into the game end code.
 - Structure：Structures that are used on the game end will be exported in the Meta files. In the Meta browser we can add structure types. But we can only add member property, cannot add member method. Can also exported and generate C++ or C# source code to add them into the game end code.

The pictures below shows, when build a new Behavior Tree, firstly we select an Agent type for the root node to identify the kind of Agent that the new Behavior Tree uses. All of this Behavior Tree’s Leaf nodes can use this Agent type’s property and method.

![]({{site.url}}{{site.baseurl}}/img/articles/agenttype_selector.png)
![]({{site.url}}{{site.baseurl}}/img/overview/agenttype.png)

### Instance

It is mentioned in the previous paragraphs that we need to set an Agent type for a new Behavior Tree, so its Leaf nodes can use this Agent type’s property and method. This is called use Self’s property and method. 

The picture below shows, some node’s parameter may use property and method that don’t belong to self. In this situation we need to select Instance then select the Agent type’s property and method that belong to the Instance.

All Agent type’s instances in the Runtime end are required to pass register and be exported to Meta files. So the Designer can get the instance list and list all the instances for users to choose. Please refer to the user manual for the register method.

![]({{site.url}}{{site.baseurl}}/img/overview/properties.png)

### Variable

Variable is divided into Field, Property, Custom-built Property and Partial Variable

 - Member Field：The type of field in object-oriented programming (C++/C#).
 - Member Property：The type of property in C#. Contains getter and setter.
 - Custom Property：Mainly are member properties that are newly built for Agent property in Designer. 
 - Local Variable：Local Variable is a variable that is limited to one specific behavior tree

behaviac supports Read-only variables. So the Variable can only be read in the Designer. Local variable does not only support basic data type like int, float, bool, but it also supports complicated pointer type or reference type.

### Method
Method includes Member Method, Customer Method, Task, etc.

 - Member Method：Type of member method in object-oriented programming.
 - Customer Method：Method that is created in the Designer. However, custom method is only created in the designer to use as a place holder. Trees using Custom Method can't be exported.
 - Task：It is used to describe interfaces (include interface names and parameter lists) that are required by a sub tree. It is similar to the definition of Method. Will combine the definition of the sub tree to introduce Task more in the later paragraphs. 

In the Designer users can edit Behavior Trees according to Meta that is exported and created. Picture below shows that user can select or set every node’s property, method and parameters according to needs of a Behavior Tree’.

![]({{site.url}}{{site.baseurl}}/img/overview/action.png)

## Workplace

To begin to use behaviac, at first users need to create a Workspace in the Designer.
Files in Workspace have .workspace.xml as their extension names. They are in charge of managing the configure file of all Behavior Trees in game projects.


![]({{site.url}}{{site.baseurl}}/img/overview/workspace.png)

This configuration file can point XML Meta file, Behavior Tree file’s path, the path for exported files. User can edit related setting through ‘Create Workspace’ or ‘Edit Workspace’ in the Designer.

![]({{site.url}}{{site.baseurl}}/img/overview/editworkspace.png)

The differences between a Behavior Tree’s source file and exported file are a Behavior Tree’s source file is the original source file (XML format) that is used and edited by game designers in the Designer. It includes some extra information like properties that UI requires. An exported file is a simple version of a behavior file. It is high-efficiency execution file that is only used by Runtime end.

Source file is like raw data, it needs to be exported first in order to be used in execution. Exported file is like Game data that is processed and can be used directly. Workplace file, source file, Meta file are not required in the game. Only exported files are required in the game. 

Currently it supports four exported format XML, BSON, C++ and C#. XML and BSON are used in the development stage. C++ and C# are used in the final release. C++ and C#’s memory and performance are better than XML and BSON. So we recommend using C++ and C# format behavior tree exported files during the final release.

## Behavior Tree

behaviac provides a lot of nodes and attachments with various functions. It also supports expanding the types of nodes that it requires. Moreover, behaviac support advance usage like sub tree, event, Prefab.

### Nodes and Attachment

Behavior Tree’s nodes can be divided into 5 major categories: Action, Condition, Composite, modify, attachment. Picture below shows, Action nodes and Condition nodes are leaf nodes. Composite nodes and modifier nodes are branch nodes. Attachment has to be attached to these four nodes and cannot be existed independently.

behaviac also supports expanding new types of nodes.

![]({{site.url}}{{site.baseurl}}/img/articles/nodes.png)

To support Sub tree function, behaviac also support Referenced Behavior type.

Nodes can have attachments like Preaction and Postaction. Preaction can mean execute some condition or operation. If it is a condition then Preaction has to return successfully first to continue executing the current node. Postaction only means operations that are continuing to execute after the execution of the current node.

![]({{site.url}}{{site.baseurl}}/img/overview/attachments.png)

Event is the special attachment that makes one Behavior Tree as another Behavior Tree’s node (usually as the root node). It is used to switch Behavior Tree when respond event happens.

To support some special application, behaviac also adds Interrupted Condition for Combination nodes like Sequence node and Selector node. Adding Interrupted Condition is to let Sequence node decides whether to execute the current node when it executes every child node in sequence according to the execution result of Interrupted Condition.

![]({{site.url}}{{site.baseurl}}/img/overview/interupt.png)

In Designer users can use mouse to drag these nodes into the newly created Behavior Tree. Also to drag Preaction and Postaction attachments to the specific node.

### Prefab

behaviac’s Designer provides Prefab function to let users use Behavior Trees that are already edited for convenience purposes.
The mechanism of behaviac Prefab is similar to Unity engine’s Prefab. If Prefab is used and a node’s property of this Prefab is changed in the location that the Prefab is used, an Instance of this Prefab is created in the Behavior Tree that the Prefab is located. Any node’s property of the Prefab is changed; other Behavior Trees that use this prefab is would change accordingly. If none of the node’s property of the prefab is changed, it will keep the same property as the parent prefab.
In Designer user can save Behavior Trees that are edited as Prefabs. Prefabs would be in the Prefabs directory to distinguish from Behavior Trees that projects need (in Behaviors directory).

![]({{site.url}}{{site.baseurl}}/img/overview/behaviors.png)

Picture below shows, firstly build a Prefab Behavior Tree called ‘Prefab_安全的随机移动’ . Then drag the Prefab Behavior Tree into the Behavior Tree ‘Tank_SafeWander_RandomFire’. Users can see that the Prefab Behavior Tree is duplicated and expanded in there. This boosts the speed of Behavior Tree editing.

![]({{site.url}}{{site.baseurl}}/img/overview/prefab.png)

![]({{site.url}}{{site.baseurl}}/img/overview/prefabinstance.png)

### Sub tree and Recursion

In the Designer, users can drag one Behavior Tree into another Behavior Tree; added one Behavior Tree as Referenced Behavior to another Behavior Tree. Picture below shows, action_ut_0 is a sub tree of action_ut_1. The node that action_ut_0 is on is a Referenced Behavior.


![]({{site.url}}{{site.baseurl}}/img/overview/subtree.png)

Beside sub tree function, behaviac also supports Recursion function. To use Recursion users need to make the current Behavior Tree as its own sub tree. Avoid create an endless loop by using Variable.

Picture below shows, using testVar_0 to avoid an endless loop: when first enter testVar_0==0, so the following sequence can be executed. First assign testVar_0 to 1, when re-enter the Recursion testVar_0==1, the condition that testVar_0==0 is not satisfied. So the following sequence would not be entered, the endless loop is avoided.

![]({{site.url}}{{site.baseurl}}/img/overview/reverse.png)

### Event Processing

During the process of execution of a Behavior Tree when status and conditions are changed or Events happen, how to interrupt the current execution is an important question.

Currently, behaviac supports three ways to process when status and conditions are changed or Event happens: parallel nodes, SelectorMonitor nodes and Event attachment. Parallel nodes and SelectorMonitor nodes re-evaluate all the child nodes when the execution of a Behavior Tree happens. Unlike other nodes that keep the child nodes from the last execution for the next execution. Event attachment responds when Event happens to the game logic.

#### Parallel Nodes

To use parallel nodes to process Event, users need to express the Event in the format of a condition and monitor this condition. Quit if this condition is not satisfied. The concept of this method is vague. It is also complicated to use.

![]({{site.url}}{{site.baseurl}}/img/articles/parallel_condition.jpg)

#### SelectorMonitor

SelectorMonitor node and WithPrecondition node as the expansion of the traditional Behavior Tree can process the change of Event and Status naturally. SelectorMonitor node and WithPrecondition node can only be used when they are paired. SelectorMonitor can only add WithPrecondition node as its child node. WithPrecondition node can only be added as SelectorMonitor’s child node.

 - SelectorMonitor node is a dynamic selector node. SelectorMonitor node chooses its first child node that returns successfully same as the Selector node. But it reselects its child node during every execution. 
 - WithPrecondition node has condition sub tree and action sub tree. Only when the condition sub tree returns successfully, the action sub tree can be executed. 


![]({{site.url}}{{site.baseurl}}/img/articles/selector_monitor.png)

#### Event Attachment

Event as an attachment is mainly used when the game logic sends out Event; after receiving the respond, it interrupts the current ongoing Behavior Tree and switch to another Behavior Tree that is set.

请详看文档《[事件处理]({{site.url}}{{site.baseurl}}/docs/zh/tutorials/tutorial11_event/)》。

### Hot-loading

behaviac Designer and Runtime library both support Hot-loading, but only for Behavior Tree files that are in XML and BSON formats.
In the Designer, whenever the Behavior Tree file that is currently open is changed outside of the Designer for whatever reason, it would refresh automatically in the Designer.
For Runtime end (or game end), if the Behavior Tree file is changed and re-exported in the Designer, the newest exported Behavior Tree will be automatically loaded during the running of the game without the need of quitting the game. So we can check the Behavior Tree’s newest effect in time.

### FSM

behaviac also supports traditional FSM. FSM is mainly constructed by State and Transition like in the picture below.

![]({{site.url}}{{site.baseurl}}/img/overview/fsm.png)

Similar to the concept of the sub tree, one trait of behaviac is to support to make one whole edited FSM as another FSM’s ‘sub tree’. Moreover, one FSM can be referenced reciprocally with a Behavior Tree and to be each other’s sub tree; one whole FSM can be a Behavior Tree’s ‘Referenced Behavior’ and a whole Behavior Tree can be one FMS’s ‘referenced Status’.
In behaviac Designer, status is independently existed, similar to a Behavior Tree’s node. Transition is attached to some status like attachment in a Behavior Tree. The editing of FSM is simple, just drag ‘Status’ nodes and ‘Transition’ attachment to a newly created FSM like in the picture below.

![]({{site.url}}{{site.baseurl}}/img/overview/states.png)

Similar to nodes in the Behavior Tree, users can add pre attachment and post attachment to FSM’s Status nodes. It means the pre-condition and the post operation that are required for the current Status node when it is executed.

### Debug

Designer support functions like online debugging with the game end like in the picture below, 

![]({{site.url}}{{site.baseurl}}/img/overview/connect.png)

#### watch the propery value

![]({{site.url}}{{site.baseurl}}/img/overview/agentproperties.png)

#### break point 
set break point on a node, highlight a Behavior Tree’s execution path

![]({{site.url}}{{site.baseurl}}/img/overview/breakpoints.png)

#### offline debugging

behaviac also supports offline debugging, the execution information can be saved and dumpped to a file and loaded later.


### Unit test and Demo
behaviac provides unit test and game Demo in both C++ and C#. Can enter through menu-item: ‘help’ -> ‘control explanation’ in Designer. Then click to open the unit test or game demo’s workplace that is required like in the picture below

![]({{site.url}}{{site.baseurl}}/img/articles/start_page_en.png)

### Open Source

behaviac is open source on the github website [https://github.com/TencentOpen/behaviac](https://github.com/TencentOpen/behaviac)

