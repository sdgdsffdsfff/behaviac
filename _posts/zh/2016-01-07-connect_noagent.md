---
layout: news_item
title: 连接后，没有 Agent 的实例？
author: jonygli
date: 2016-01-07 20:34:00 +0800
categories: [faq]
permalink: /zh/faq/connect_agent/
lang: zh
---

 1. 请检查SetIdMask 和 SetIdFlag的调用是否合适。IdFlag和IdMask都是int，IdMask是个公用的Mask，而IdFlag是设置给某个Agent实例的，当(IdFlag & IdMask)!= 0的时候，该Agent才被调试。
 1. 或者请确保游戏确实在更新，具体可以参考[更新流程]({{ site.baseurl }}/docs/zh/tutorials/tutorial13_updateloop/)
 1. 请保持导出路径里的文件`behaviors.dbg.xml`，不要删除
