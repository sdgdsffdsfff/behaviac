---
layout: news_item
title: 行为树的执行支持暂停和继续机制吗？
author: cainhuang
date: 2015-12-14 14:55:00 +0800
categories: [faq]
permalink: /zh/faq/pause_resume/
lang: zh
---

首先区分对待行为树的执行是通过Workspace::Update()还是Agent::btexec()来发起的，具体区别可以参考运行时端的[更新流程]({{ site.baseurl }}/docs/zh/tutorials/tutorial13_updateloop/)。

- 如果是通过Workspace::Update()来更新执行的，则用Workspace::SetIsExceAgents(false/true)来暂停和继续执行。

- 如果用的是Agent::btexec()，则用Agent::SetActive(false/true)。

总的来说，两种情况都可以用Agent::SetActive()，只是第一种用法更方便。
