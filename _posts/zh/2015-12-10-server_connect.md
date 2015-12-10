---
layout: news_item
title: 服务器端也可以连调吗？
author: jonygli
date: 2015-12-10 21:48:00 +0800
categories: [FAQ]
permalink: /zh/faq/server_connect
lang: zh
---

是的，服务器端也可以连调。游戏运行在服务器端，编辑器运行在PC上，可以是可以完美连调的。

由于连调的时候编辑器和游戏是通过socket通信，所以，既支持同机连调，也支持远程连调。只要确保能够ping通相应IP及端口，就可以连调。


请参考[behaviac可以用在服务器端]({{ site.baseurl }}/zh/faq/serverside/)

