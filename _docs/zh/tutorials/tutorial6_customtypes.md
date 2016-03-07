---
layout: docs_relatives
title: 自定义类或结构体
date: 2015-12-04 18:12:16 +0800
author: cainhuang
permalink: /docs/zh/tutorials/tutorial6_customtypes/
categories: [tutorial]
lang: zh
---

## 自定义类或结构体
- 在.h文件中，任意编写一个自定义的类或结构体，并用宏DECLARE_BEHAVIAC_STRUCT声明该类或者结构体为非虚类，如下代码样例所示：


```cpp

struct TypeTest_t
{
	int		name;
	float	weight;
	bool	bLive;

	DECLARE_BEHAVIAC_STRUCT(TypeTest2_t);
};

```

上面的用法定义出来的TypeTest_t在导出的元信息中为值类型（也即在导出的元信息中其值IsRefType为false），值类型可以在编辑器中设置其成员属性。与值类型对应的是引用类型，引用类型不会导出其成员属性，在编辑器中也不用配置其成员属性。

另外，宏DECLARE_BEHAVIAC_STRUCT也可以带2个参数，第一个参数为类型，第二个参数为true表示该类型用作为引用类型（也即导出元信息后其值IsRefType为true），否则不用第二个参数表示为值类型，如下代码所示：


```cpp

DECLARE_BEHAVIAC_STRUCT(TypeTest2_t, true);

```

- 在.cpp文件中，通过一系列宏注册该类或结构体自身的描述及其属性：


```cpp

BEGIN_PROPERTIES_DESCRIPTION(TypeTest2_t)
{
	CLASS_DISPLAYNAME(L"测试结构体")
	CLASS_DESC(L"自定义结构体")

	REGISTER_PROPERTY(name);
	REGISTER_PROPERTY(weight).DISPLAYNAME(L”重量”);
	REGISTER_PROPERTY(bLive) .DISPLAYNAME(L”是否活着”).DESC(L”存活状态”);
}
END_PROPERTIES_DESCRIPTION()

```

- 在初始化注册（Register）的部分需要加上如下的代码，反注册（UnRegister）的部分添加相应UnRegister的代码。注意这部分Register/UnRegister的代码不是必须的，如果该类型没有用作par或者没有用作条件比较，就可以不需要。


```cpp

behaviac::TypeRegister::Register< TypeTest2_t >(" TypeTest2_t ");

behaviac::TypeRegister::UnRegister< TypeTest2_t >(" TypeTest2_t ");

```

更多细节可以参考behaviac组件C++源码库中btunittest工程的[reflectionunittest.cpp]({{site.repository}}/blob/master/test/btunittest/Others/reflectionunittest.cpp)文件中TypeTest2_t结构体相关的代码。
