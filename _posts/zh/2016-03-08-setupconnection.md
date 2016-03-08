---
layout: news_item
title: 还是不能连调？
author: jonygli
date: 2016-03-08 11:16:00 +0800
categories: [faq]
lang: zh
permalink: /zh/faq/setupconnection/
---

实现连调的功能是通过函数SetupConnection来完成的。

只要你创建了Agent或者加载了BT，SetupConnection就会被自动调用。但是如果没有创建过Agent，也没有加载过BT，SetupConnection没被调用的话，实现连调的功能将没有被初始化。

总结：
 - 创建过Agent
 - 或者加载过BT


