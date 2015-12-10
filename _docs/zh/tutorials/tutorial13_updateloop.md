---
layout: docs_relatives
title: 运行时端的更新流程
date: 2015-12-10 10:40:26 +0800
author: cainhuang
permalink: /docs/zh/tutorials/tutorial13_updateloop/
categories: [tutorial]
lang: zh
---

## 运行时端的更新流程

在运行时端（下面以C++版来加以说明，C#版基本类似），整个工作区的更新可以通过Workspace::Update()函数来执行，该函数主要包括两大功能：

- 调用DebugUpdate()函数来更新一些连调和热加载相关的功能。
- 根据m_bExecAgents来判断是否需要执行所有Agent实例的btexec()函数。

如下样例代码所示： 

``` c++

void Workspace::DebugUpdate()
{
	this->LogFrames();
	this->HandleRequests();

	if (this->GetAutoHotReload())
	{
		this->HotReload();
	}
}

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

对于C++版，行为树的执行可以调用behaviac::Workspace::GetInstance()->Update()，也可以直接调用Agent的接口btexec()。

Workspace的Update()会遍历所有的Agent实例并依次执行btexec()，但在自己的游戏项目中，可能在一帧中需要对某些Agent多次调用btexec()，而另一些Agent只需调用一次，这时候就需要自己调用该Agent的btexec()，而不是调用Workspace的Update()。

此外，为了支持连调和热加载，请务必保证在自己游戏的更新函数中调用了DebugUpdate()函数，但如果已经调用了behaviac::Workspace::GetInstance()->Update()，那么就不需要再单独调用DebugUpdate()。

特别注意：对于C#版，behaviac.Workspace.IsExecAgents默认设为false。

- 如果将behaviac.Workspace.IsExecAgents设为true，使用behaviac.Workspace.Instance.Update()集中进行更新，Agent自己的更新就不需要调用btexec()了。
- 如果将behaviac.Workspace.IsExecAgents设为false，则不使用behaviac.Workspace.Instance.Update()集中进行更新，Agent自己的更新就需要调用btexec()了。
