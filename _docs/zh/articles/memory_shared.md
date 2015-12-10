---
layout: docs_relatives
title: 共享资源和实例数据
author: jonygli
date: 2015-12-10 19:48:00 +0800
categories: [doc]
permalink: /docs/zh/articles/memory_shared/
lang: zh
---

每个行为树都只有一份单独的数据作为资源被加载。

每个使用行为树的对象（Agent）依据这个共享的资源创建独立的实例数据，例如对于Sequence节点，实例数据中只是存储更新到哪个子树，至于Sequence节点的配置信息等则被共享。


![memory_shared]({{ site.baseurl }}/img/faq/memory_shared.png)

-------------------------------

 - 加载行为树请使用`Workspace::Load`或`Agent::btload`
 - 卸载行为树请使用`Workspace::UnLoad`或`Agent::btunload`
 - `Workspace::CreateBehaviorTreeTask`用来根据加载的行为树资源创建实例数据，而它配套的是`Workspace::DestroyBehaviorTreeTask`
 - 一般情况下，不需要**显示**调用`Workspace::CreateBehaviorTreeTask`和`Workspace::DestroyBehaviorTreeTask`
 	- 初始化的时候调用`Workspace::Load`或`Agent::btload`加载可能会用到的行为树
 	- 游戏循环的时候，根据需要，调用`Agent::btsetcurrent`指定该Agent当前的行为树，后续`Agent::btexec`更新的就是当前行为树，除非再次调用`Agent::btsetcurrent`修改当前行为树
 	- 退出的时候，调用`Workspace::UnLoad`或`Agent::btunload`，或`Workspace::UnLoadAll`卸载行为树资源。而行为树实例是在`Agent::btsetcurrent`的时候被创建的，释放Agent的时候被Agent负责释放
 - C#代码是同名类型里的同名函数，如`Workspace.Load`和`Agent.btload`