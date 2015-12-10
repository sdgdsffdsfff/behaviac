---
layout: docs_relatives
title: 热加载
date: 2015-12-10 10:40:26 +0800
author: cainhuang
permalink: /docs/zh/tutorials/tutorial12_hotreload/
categories: [tutorial]
lang: zh
---

## 热加载

behaviac组件中的编辑器和运行时库都支持热加载，但是只针对XML/BSON格式的行为树文件。

在编辑器中，只要当前打开的行为树文件在编辑器外由于某种原因得到修改（例如通过项目中的文件版本管理系统强制同步行为树文件，或者通过文本编辑器强制修改行为树XML文件等），那么都可以自动的在编辑器中得到刷新。

对于运行时端（或游戏端），只要在编辑器中修改了行为树文件并重新导出，那么在游戏运行过程中不用退出游戏，最新导出的行为树可以自动进行加载，这样就可以及时查看行为树最新的效果。

行为树的更新执行流程请参考[更新流程]({{ site.baseurl }}/docs/zh/tutorials/tutorial13_updateloop/)。

为了启动热加载功能，需要确保在运行时端直接或间接调用过Workspace::DebugUpdate()函数，有两种方式：

- 如果Agent的行为树是通过调用Workspace::Update()来集中执行的，则无需额外调用Workspace::DebugUpdate()函数
- 如果Agent的行为树是通过调用Agent::btexec()来执行的，则需要游戏每次更新时调用Workspace::DebugUpdate()函数
