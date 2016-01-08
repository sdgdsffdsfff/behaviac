---
layout: docs_relatives
title: 开发功能开关
author: jonygli
date: 2016-01-07 20:10:00 +0800
categories: [doc]
permalink: /docs/zh/articles/config/
lang: zh
---

behaviac的运行时提供有核心的更新行为树的功能，在其之上，还有logging，热加载，连调等调试功能。这些调试功能只是‘开发’功能，在游戏发布后实际上是不需要的。

除了可以在`config.h`中定义`BEHAVIAC_RELEASE`宏为1来完全使‘开发功能’不被编译外。也可以保留这些‘开发’功能但只是使用下面所列的‘开关’来关闭或者打开某些功能。

具体可以参考[优化及性能]({{ site.baseurl }}/docs/zh/tutorials/tutorial10_performence/)

##Cpp##

```cpp
namespace behaviac
{
    class BEHAVIAC_API Config
    {
    public:
        static bool IsProfiling();
        static void SetProfiling(bool bEnabled);

		//logging是否打开
        static bool IsLogging();
        static void SetLogging(bool bLogging);

		//logging打开的情况下，是否每次logging的时候都Flush
        static bool IsLoggingFlush();
        static void SetLoggingFlush(bool bFlush);

		//socket连接是否打开，只有打开socket连接，连调功能才会支持
        static bool IsSocketing();
        static void SetSocketing(bool bSocketing);

		//是否是阻塞模式，当时阻塞模式的时候，游戏会阻塞，等待编辑器的连接，
		//只有成功建立连接后，游戏才继续运行
        static bool IsSocketBlocking();		
        static void SetSocketBlocking(bool bBlocking);

		//游戏和编辑器建立连接的时候使用的端口
        static void SetSocketPort(unsigned short port);
        static unsigned short GetSocketPort();

		//热加载是否打开
		static bool IsHotReload();
		static void SetHotReload(bool bHotReload);
    };
```


具体的代码可以查看[behaviac/base/workspace.h]({{site.repository}}/blob/master/inc/behaviac/base/workspace.h)

##Unity##
C#下同名函数的意义和Cpp一样，此外，`IsSuppressingNonPublicWarning`是个用来控制是否输出非public成员的警告。

当`IsSuppressingNonPublicWarning`为true的时候，Agent的成员（field，method，property）如果不是public的，则输出警告信息，从而可以修改其为public，这样的话，当使用导出格式为c#时其效率就是最高的，而且没有GC Alloc。


具体的代码请查看[behaviac/runtime/workspace.cs]({{site.repository}}/blob/master/integration/unity/Assets/Scripts/behaviac/runtime/Workspace.cs)