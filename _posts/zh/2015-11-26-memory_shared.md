---
layout: news_item
title: 内存使用高效吗？
author: jonygli
date: 2015-11-27 19:48:00 +0800
categories: [FAQ]
permalink: /zh/faq/memory_shared
lang: zh
---

每个行为树都只有一份单独的数据作为资源被加载。

每个使用行为树的对象（Agent）依据这个共享的资源创建独立的实例数据，例如对于Sequence节点，实例数据中只是存储更新到哪个子树，至于Sequence节点的配置信息等则被共享。


![memory_shared]({{ site.baseurl }}/img/faq/memory_shared.png)

-------------------------------

 - 加载行为树请使用`Workspace::Load`或`Agent::btload`
 - 卸载行为树请使用`Workspace::UnLoad`或`Agent::btunload`
 - `Workspace::CreateBehaviorTreeTask`用来根据加载的行为树资源创建实例数据，而它配套的是`Workspace::DestroyBehaviorTreeTask`
 - C#代码是同名类型里的同名函数，如`Workspace.Load`和`Agent.btload`