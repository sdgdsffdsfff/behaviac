---
layout: news_item
title: 连调的时候总是打开同一个workspace，什么鬼？
author: jonygli
date: 2015-12-10 20:48:00 +0800
categories: [FAQ]
permalink: /zh/faq/connect_same_workspace
lang: zh
---

请检查是否已经打开了另一个使用behaviac的demo或游戏。

比如，当在运行tank的那个unity demo的时候，再运行spaceship的那个demo，这个时候如果试图用编辑器连调spaceship，编辑器中打开的就总是tank的workspace。
原因在于demo中缺省端口是同一个。

1. 要么干脆关掉不需要连调的那个demo
1. 或者选择使用另一个端口