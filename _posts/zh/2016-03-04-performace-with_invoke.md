---
layout: news_item
title: 大量的反射性能不知道怎么样？
author: jonygli
date: 2016-03-07 14:48:00 +0800
categories: [faq]
lang: zh
permalink: /zh/faq/performance_with_invoke/
---


看了下源码 大量的反射性能不知道怎么样？

对于c++，性能没有任何影响。对于C#，当使用的是xml格式的导出文件时，目前会使用到反射机制，但后续版本计划优化这个。目前可以使用导出C#的导出格式，就没有性能损失了。
