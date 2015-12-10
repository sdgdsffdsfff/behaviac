---
layout: docs_relatives
title: C++运行时端的使用上手
date: 2015-12-10 10:40:26 +0800
author: cainhuang
permalink: /docs/zh/tutorials/tutorial14_cpp_workflow/
categories: [tutorial]
lang: zh
---

## C++运行时端的使用上手

运行时（游戏）端使用行为树之前，需要确保行为树文件已经成功导出。

如何注册和导出元信息请参考[C++元信息的注册和导出]({{ site.baseurl }}/docs/zh/tutorials/tutorial3_1_meta_cpp_register/)，如何导出行为树请参考[导出和使用XML/BSON行为树]({{ site.baseurl }}/docs/zh/tutorials/tutorial4_1_export_xml_bson/)。

通过编辑器导出行为树文件后，运行时端的执行主要分为三个部分：

- 初始化
- 循环更新
- 清理

### 1 初始化

在游戏的初始化函数中，添加初始化behaviac组件所需的功能，例如注册Agent子类信息、设置行为树文件的加载路径和文件格式、创建Agent子类的实例、加载行为树并设置当前所需执行的行为树等。

如下代码所示：

``` c++

bool InitBehavic(behaviac::Workspace::EFileFormat ff)
{
    behaviac::Config::SetSocketBlocking(false);
    behaviac::Config::SetSocketPort(8081);

    behaviac::Agent::Register<CBTPlayer>();

    behaviac::Workspace::GetInstance()->SetFilePath("../test/demo_running/behaviac/exported");
    behaviac::Workspace::GetInstance()->SetFileFormat(ff);

    behaviac::Workspace::GetInstance()->ExportMetas("../test/demo_running/behaviac/demo_running.xml");

    //behaviac::Agent::SetIdMask(kIdMask_Wolrd | kIdMask_Opponent);
    behaviac::Workspace::GetInstance()->SetDeltaFrames(1);

    return true;
}

bool InitPlayer(const char* pszTreeName)
{
    g_player = behaviac::Agent::Create<CBTPlayer>();

    bool bRet = false;
    bRet = g_player->btload(pszTreeName);
    assert(bRet);

    g_player->btsetcurrent(pszTreeName);

    return bRet;
}

```

### 2 循环更新

在游戏的主循环中，添加执行Agent实例的行为树相关代码，也即通过调用Agent类的接口btexec()或Workspace类的接口Update()来执行行为树。

这两种执行方式的区别，请参考[更新流程]({{ site.baseurl }}/docs/zh/tutorials/tutorial13_updateloop/)。

如下代码样例所示：

``` c++

void UpdateLoop()
{
	int i  = 0;
	int frames = 0;
	behaviac::EBTStatus status = behaviac::BT_RUNNING;

	while (status == behaviac::BT_RUNNING)
	{
		cout << "frame " << ++frames << std::endl;
		status = g_player->btexec();
	}
}

```

### 3 清理

最后的清理过程，包括销毁Agent子类的实例，以及反注册Agent子类信息等。

如下代码样例所示：

``` c++

void CleanupPlayer()
{
    behaviac::Agent::Destroy(g_player);
}

void CleanupBehaviac()
{
    behaviac::Agent::UnRegister<CBTPlayer>();

	behaviac::Workspace::GetInstance()->Cleanup();
}

```

以上步骤的完整代码，请参考[demo_running.cpp]({{site.repository}}/blob/master/test/demo_running/demo_running.cpp)文件。
