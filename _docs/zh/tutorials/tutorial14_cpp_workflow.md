---
layout: docs_relatives
title: C++运行时端的使用上手
date: 2015-12-04 14:40:26 +0800
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
<div class="note info">
  <h5>关于文件路径的说明</h5>
</div>

 - Workspace::SetFilePath指定的是Workspace的导出路径，可以是绝对路径。当指定的是相对路径的时候，相对的是当前**工作路径**（一般都是运行程序所在目录）。
 - Agent::btload指定的是相对于Workspace::SetFilePath指定的路径的，没有扩展名的，可以有目录结构的层次化文件名，如“node_test/selector_loop_ut_7”，可以再编辑器里打开该行为树后，右键文件页选取“复制文件名”获取

![copy_filepath]({{site.baseurl}}/img/tutorials/tutorial14/copy_filepath.png)

 - 例如：
    - 如果运行程序所在目录（或者VS里指定的工作路径$(TargetDir)）是"D:\Test\bin"
    - Workspace::SetFilePath指定的相对路径是“../behaviac/workspace/exported”
    - btload指定是“node_test/selector_loop_ut_7”
    - 则workspace的导出路径实际是“D:/Test/behaviac/workspace/exported”，
    而相应的导出行为树文件是“D:/Test/behaviac/workspace/exported/node_test/selector_loop_ut_7.xml”或
    “D:/Test/behaviac/workspace/exported/node_test/selector_loop_ut_7.bson.bytes”。
    - 具体是xml或bson则由Workspace::SetFileFormat确定。
    - 当指定格式是cpp或c#的时候，导出的行为树是cpp或c#源码，已经编译构建进可执行程序，Agent::btload指定的只是用来标识该行为树的，从而代码可以据此创建相应的行为树，不像xml或bson格式的时候不需要加载数据文件。
 - 如果Agent::btload加载失败，请注意检查当前路径，Workspace::SetFilePath设定的导出路径，以及Agent::btload指定的文件标识。还可以在当前路径里检查log文件`_behaviac_$_$_.log`

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
