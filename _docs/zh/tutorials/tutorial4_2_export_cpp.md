---
layout: docs_relatives
title: 导出和使用C++行为树
date: 2015-12-04 17:37:26 +0800
author: cainhuang
permalink: /docs/zh/tutorials/tutorial4_2_export_cpp/
categories: [tutorial]
lang: zh
---

## 导出和使用C++行为树
- 在“导出行为树”对话框中，选择“C++ Behavior Exporter”，如下图所示：

![]({{site.url}}{{site.baseurl}}/img/tutorials/tutorial4/exportCpp.png)

图1 导出C++行为树

- 点击上图中右侧的“…”设置按钮，在弹出的“C++导出设置”对话框中设置生成文件所在的位置，并可以添加项目中游戏类（从Agent类派生而来）所在的.h头文件，添加的头文件将会被包含在生成的.cpp文件中，如图2所示：

![]({{site.url}}{{site.baseurl}}/img/tutorials/tutorial4/cppExportSettings.png)

图2 导出C++的设置

- 回到“导出行为树”对话框，点击“导出”按钮，开始导出`C++`文件。在指定的导出位置（默认为当前工作区的导出路径）会自动生成一个名为`behaviac_generated`的文件夹，里面生成了`behaviors`和`types`两个子文件夹，如图3所示：

 - `behaviors`文件夹中含有`generated_behaviors.h`及其他单个的行为树`.inl`文件（如果没有勾选“导出统一文件？”，则对每一棵行为树都会生成独立的`.inl`文件，这些.inl文件会自动include在`generated_behaviors.h`文件中，无需在自己的项目中再include这些`.inl`文件，只需要include这个`generated_behaviors.h`文件即可）。
 - `types`文件夹中含有`agentproperties.h`（为Agent类定制的属性和方法，会扩展在该文件中）、`customizedtypes.h/customizedtypes.cpp`（自定义的枚举和结构体类型，会生成在这两个文件中）以及其他自定义`Agent`子类的文件（这些文件是为添加的`Agent`子类自动生成的`.h/.cpp`文件，需要程序员补充代码进一步实现这些`Agent`子类的逻辑）。

![]({{site.url}}{{site.baseurl}}/img/tutorials/tutorial4/exportedCppFiles.png)

图3 导出的C++文件

- 注意：这些自动生成的文件（除了上面提及的单个的行为树`.inl`文件之外）都需要包含到自己的游戏项目中，一起参与整个项目代码的编译和构建。

- 在项目中包含了这些自动生成的代码文件后，就可以与前面提及的[导出和使用XML/BSON行为树]({{site.url}}{{site.baseurl}}/docs/zh/tutorials/tutorial4_1_export_xml_bson/)一样的接口和方式加载使用这些C++文件，只是需要将文件格式改为`EFF_cpp`：


```cpp

behaviac::Workspace::GetInstance()->SetFileFormat(behaviac::Workspace::EFF_cpp);

```
