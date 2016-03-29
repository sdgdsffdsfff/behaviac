---
layout: docs_relatives
title: 等待帧数节点 
date: 2016-01-07 11:52:15 +0800
author: cainhuang
permalink: /docs/zh/references/waitframes/
categories: [reference]
lang: zh
---

等待帧数（WaitFrames）节点在指定的帧数内持续保持为运行（Running）状态，帧数到达或超过之后则返回成功，如下图所示：

![waitframes]({{site.url}}{{site.baseurl}}/img/references/waitframes.png)

图1 等待帧数节点

需要配置“帧数”，可以是常数、属性或方法的返回值（必须是int类型），如下图所示：

![waitframes]({{site.url}}{{site.baseurl}}/img/references/waitframes_prop.png)

图2 等待帧数节点的属性

等待帧数节点的更新逻辑是:

```cpp
if (Workspace::GetInstance()->GetFrameSinceStartup() - this->m_start + 1 >= this->m_frames)
{
	return BT_SUCCESS;
}
```

因此，只有保证Workspace::GetInstance()->GetFrameSinceStartup()正确的返回从游戏启动到当前的总帧数，等待帧数节点才能正确工作。

该总帧数需要通过Workspace::GetInstance()->SetFrameSinceStartup()设置，可以在自己的游戏更新函数中调用该函数。

注意：在C#代码中相应的接口需改为Workspace.Instance.FrameSinceStartup，默认实现方式是返回Unity的当前系统帧数Time.frameCount，一般情况无需自己重新实现，直接使用即可，不用类似以上C++的接口方式每帧更新时再额外调用Workspace.Instance.FrameSinceStartup为其赋值。

具体的执行逻辑可以查看[behaviortree/nodes/actions/waitframes.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/actions/waitframes.cpp)
