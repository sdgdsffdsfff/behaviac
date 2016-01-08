---
layout: news_item
title: 双击后没有BT树的更新显示？
author: jonygli
date: 2016-01-07 11:35:00 +0800
categories: [FAQ]
permalink: /zh/faq/connect_noupdate
lang: zh
---

虽然有Agent的实例列了出来，但双击后没有BT树的更新显示。

如果是直接调用Agent::btexec更新的，没有调用behaviac::Workspace::GetInstance()->Update()的话会导致这种情况。

可以参考[更新流程]({{ site.baseurl }}/docs/zh/tutorials/tutorial13_updateloop/)