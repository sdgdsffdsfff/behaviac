---
layout: news_item
title: HotReload默认支持吗？需要什么设置？
author: jonygli
date: 2015-12-10 19:48:00 +0800
categories: [faq]
permalink: /zh/faq/hotreload/
lang: zh
---

HotReload是否默认支持要看版本及更新方式了。

 - 首先HotReload只在开发版才是打开的。如果定义了 `BEHAVIAC_RELEASE` 意味着是发行版，属于开发功能的HotReload，连调等功能就不再打开了。
 - 在开发版下，如果是通过 `behaviac::Workspace::GetInstance()->Update()` 更新Agent的，HotReload就是默认支持的。
 - 但是如果是直接调用Agent的btexec来更新的话，由于 `Workspace::DebugUpdate` 没有被调用，HotReload就没有被支持，这种情况下，需要自己负责在合适的地方调用 `Workspace::DebugUpdate` 来支持HotReload。请参考[更新流程]({{ site.baseurl }}/docs/zh/tutorials/tutorial13_updateloop/)
 - 从下面 `Workspace::DebugUpdate` 和 `Workspace::Update` 的代码可以看出，不仅是HotReload，而且实时连调也就是游戏运行时Connect编辑器查看和调试行为树执行情况的功能都取决于是否是通过`behaviac::Workspace::GetInstance()->Update()` 更新的。
 - 对于C#，API是类似的。`behaviac.Workspace.GetInstance().Update()` 以及 `behaviac.Workspace.GetInstance().DebugUpdate()`


```cpp
   void Workspace::Update()
    {
		this->DebugUpdate();

        if (this->m_bExecAgents)
        {
            int contextId = -1;

            Context::execAgents(contextId);
        }
    }
```

```cpp
	void Workspace::DebugUpdate()
	{
		this->LogFrames();
		this->HandleRequests();

		if (this->GetAutoHotReload())
		{
			this->HotReload();
		}
	}
```
