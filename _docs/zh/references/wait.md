---
layout: docs_relatives
title: 等待节点 
date: 2016-01-07 10:47:15 +0800
author: cainhuang
permalink: /docs/zh/references/wait/
categories: [reference]
lang: zh
---

等待（Wait）节点在指定的时间（单位：毫秒ms）内持续保持为运行（Running）状态，时间到达之后则返回成功，如下图所示：

![wait]({{ site.baseurl }}/img/references/wait.png)

图1 等待节点

需要配置“持续时间”，可以是常数、属性或方法的返回值（必须是float类型），如下图所示：

![wait]({{ site.baseurl }}/img/references/wait_prop.png)

图2 等待节点的属性

等待节点的更新逻辑是:

```cpp
if (Workspace::GetInstance()->GetTimeSinceStartup() * 1000.0f - this->m_start >= this->m_time)
{
	return BT_SUCCESS;
}
```

所以，只有保证Workspace::GetInstance()->GetTimeSinceStartup()正确的返回从游戏启动到现在的总时间，等待节点才能正确工作！

该总时间需要通过Workspace::GetInstance()->SetTimeSinceStartup()设置，可以在自己的游戏更新函数中调用该函数。

注意：在C#代码中相应的接口需改为Workspace.Instance.TimeSinceStartup。

具体的执行逻辑可以查看[behaviortree/nodes/actions/wait.cpp]({{site.repository}}/blob/master/src/behaviortree/nodes/actions/wait.cpp)
