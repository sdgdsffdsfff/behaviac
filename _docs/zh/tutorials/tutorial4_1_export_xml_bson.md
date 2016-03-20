---
layout: docs_relatives
title: 导出和使用XML/BSON行为树
date: 2015-12-04 17:36:26 +0800
author: cainhuang
permalink: /docs/zh/tutorials/tutorial4_1_export_xml_bson/
categories: [tutorial]
lang: zh
---

## 行为树的导出和使用
目前behaviac组件支持4种文件格式（XML、BSON、C++和C#）行为树的导出。在项目开发过程中，建议使用XML格式的导出文件，以便于调试和查错等；而在最终的发布（release）版本中，可以导出C++或C#格式的行为树文件，以便提高运行效率。

### 导出和使用XML/BSON行为树
- 在编辑器中导出整个工作区文件，在“导出行为树”对话框中，勾选“Xml Behavior Exporter”或“Bson Behavior Exporter”，如下图所示：

![]({{site.url}}{{site.baseurl}}/img/tutorials/tutorial4/exportXMLBson.png)

图1 导出XML/BSON行为树

- 导出行为树文件结束后，回到运行时（游戏）代码端，按以下步骤使用行为树文件：
	- 在游戏的初始化函数中，添加Agent::Register<***>()注册类信息到引擎库中。
	- 调用Workspace::SetFilePath(…)函数，设置行为树文件的加载路径，也即编辑器导出行为树文件所在的目录。
	- 调用Workspace::SetFileFormat(…)函数，设置加载行为树的文件格式，如果不调用则默认加载EFF_xml格式。
	- 通过调用Agent的接口btload(…)加载所需的行为树文件。
	- 通过调用Agent的接口btsetcurrent(…)设置当前准备执行的行为树文件。
	- 行为树的更新执行流程请参考[更新流程]({{ site.baseurl }}/docs/zh/tutorials/tutorial13_updateloop/)。
	- 在游戏的释放函数里面，添加Agent::Unregister<***>()用于释放类型的注册信息。

如下代码样例所示：


```cpp

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

总之，一棵行为树的加载到执行，关键的就是前面提及的三个接口：btload()、btsetcurrent()和btexec()。

更多细节可以参考behaviac组件C++源码中附带的test/demo_running工程的[demo_running.cpp]({{site.repository}}/blob/master/test/demo_running/demo_running.cpp)文件。

类似的，对于C#版的运行时端，采用如下代码样例加载使用刚才导出的行为树：

{% highlight cs %}
public bool Init ()
{
    if (ms_fileSystem == null)
    {
        ms_fileSystem = new BehaviacFileManager();
    }

    //< write log file
    behaviac.Config.IsLogging = true;
    //behaviac.Config.IsSocketing = false;

    behaviac.Workspace.Instance.FilePath = this.WorkspaceExportPath;
    behaviac.Workspace.Instance.FileFormat = behaviac.Workspace.EFileFormat.EFF_xml;

    //register names
    behaviac.Agent.RegisterInstanceName<GameLevelCommon>("GameLevel");
    behaviac.Workspace.Instance.ExportMetas("behaviac/workspace/xmlmeta/BattleCityMeta.xml");

    behaviac.Debug.Log("Behaviac meta data export over.");
    behaviac.Agent.SetIdMask(0xffffffff);

    return true;
}

public void Uninit()
{
    behaviac.Workspace.Instance.Cleanup();
}

// 加载所需的行为树文件
if(behaviorTree.Length > 0)
{
	btloadResult = btload(behaviorTree, true);
	if(btloadResult)
		btsetcurrent(behaviorTree);
	else
		Debug.LogError("Behavior tree data load failed! " + behaviorTree);
}
{% endhighlight %}

更多细节可以参考behaviac组件C#源码中附带的integration/BattleCityDemo工程的[BehaviacSystem.cs]({{site.repository}}/blob/master/integration/BattleCityDemo/Assets/Scripts/BehaviacSystem.cs)文件。
