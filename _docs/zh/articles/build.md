---
layout: docs_relatives
title: 构建
date: 2016-01-28 11:26:13 +0800
author: jonygli
permalink: /docs/zh/articles/build/
categories: [doc]
lang: zh
---

## Cpp
我们使用cmake来生成对应平台的项目文件。

### Windows平台
 * 首先下载并安装最新版的[cmake](https://cmake.org/files/v3.4/cmake-3.4.3-win32-x86.exe)
 * 运行build目录下的cmake_generate_projects.bat生成项目文件
 * 如果需要build android版本
 	* 需要安装vs2015
 	* 下载并安装[cmake android](https://github.com/Microsoft/CMake/tree/feature/VCMDDAndroid), 直接覆盖
 	* 运行build目录下的cmake_generate_projects_android.bat生成项目文件

### 其他平台
 * 相应安装最新版的[cmake](https://cmake.org/files/v3.4/cmake-3.4.3-win32-x86.exe)
 * 运行build目录下的cmake_generate_projects.sh生成项目文件
 	* mac上，运行build目录下的cmake_generate_projects_mac.sh生成项目文件

### 构建
 * 无论Windows平台还是其他平台，项目文件都生成到目录cmake_binary
 * 项目文件生成到目录cmake_binary，根据选用的build tool chain（vs2013，make，etc.）打开相应目录的项目文件或运行make等进行构建
 * .bat里使用的是vs2013和vs2015，用户可以根据自己的需要选择相应的编译器，比如vs2008，vs2010等。
 * .a,.lib,.dll,.exe等被生成到根目录的lib目录和bin目录
 * 生成的项目配置(mvsc, linxu, xcode)包含了Debug和Release，请根据需要构建Debug或Release版本

## Unity
Unity下的源码在integration/unity下，请copy源码或者使用unitypackage
