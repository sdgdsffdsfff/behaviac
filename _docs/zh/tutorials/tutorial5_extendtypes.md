---
layout: docs_relatives
title: 扩展使用已有的类型
date: 2015-12-04 18:02:16 +0800
author: cainhuang
permalink: /docs/zh/tutorials/tutorial5_extendtypes/
categories: [tutorial]
lang: zh
---

在某些情况下，除了运行时库（C++）中提供支持的一些基本类型（bool、short、int、float等）之外，behaviac还支持扩展使用已有的或者用户自定义的类、结构体和枚举类型。
这里有两种情况，其处理方式是不同的：

- 有些类型是程序中本来就有的，该类型可能是某个第三方库中提供的，但这些类型是不方便随意修改的。
- 另外一些可以随便修改的类型，请参考[自定义类或结构体]({{ site.baseurl }}/docs/zh/tutorials/tutorial6_customtypes/)。

### 字符串和数组类型

需要注意的是，behaviac组件为了支持C++的反射系统，对字符串和数组类型有如下要求：

- 字符串：不要使用std::string，需要使用behaviac::string，因为behaviac::string使用了定制的allocator，可以对内存的使用进行统一的管理。
- 数组：不要使用std::vector，需要使用behaviac::vector。

### char类型

此外，需要对char、signed char和unsigned char做出一些必要的说明：

- 在C++中，char、signed char和unsigned char是三个不同的类型。
- 在编辑器中，分别对应char、sbyte、ubyte。
- 对于C#，char、sbyte和byte是基本类型，分别对应编辑器中的char、sbyte和ubyte。

### 扩展使用已有的类型

对于已有的不能修改源码的类型，需要按照如下步骤进行扩展：

- 在.h文件中，通过宏BEHAVIAC_EXTEND_EXISTING_TYPE特化某个需要的类型。
如下代码样例所示（假设TestNS::Float2是某个第三方库中的类型，需要用到但不能修改它）：

```cpp

BEHAVIAC_EXTEND_EXISTING_TYPE(myFloat2, TestNS::Float2);

```

- 定义一个“相似”的struct（myFloat2），该struct的作用是用来定义那个已存在的类的成员，以便behaviac能够访问该类。

- 通过DECLARE_BEHAVIAC_STRUCT的第二个参数isRefType为true或false表示该类型是否为引用类型，如下代码所示。

```cpp

struct myFloat2
{
    float x;
    float y;
    DECLARE_BEHAVIAC_STRUCT (myFloat2, false);
    myFloat2()
	{
	}
	myFloat2(const TestNS::Float2& v) : x(v.x), y(v.y)
	{
	}
};

```

- 在命名空间StringUtils的嵌套子空间Private中实现该类型的ToString()和FromString()函数。注意myFloat2中需要实现相应的转换构造函数（myFloat2(const TestNS::Float2& v)），如下代码样例所示：

```cpp

namespace behaviac
{
    // ValueToString & ValueFromString
    namespace StringUtils
    {
        namespace Private
        {
            template<>
            inline behaviac::string ToString(const TestNS::Float2& val)
            {
                //myFloat2::ToString is defined by DECLARE_BEHAVIAC_STRUCT(myFloat2)
                myFloat2 temp(val);
                return temp.ToString();
            }

            template<>
            inline bool FromString(const char* str, TestNS::Float2& val)
            {
                myFloat2 temp;

                //myFloat2::FromString is defined by DECLARE_BEHAVIAC_STRUCT(myFloat2)
                if (temp.FromString(str))
                {
                    val.x = temp.x;
                    val.y = temp.y;
                    return true;
                }

                return false;
            }
        }
    }
}

```

- 实现该类型的模板函数SwapByteTempl()，注意该函数不能放在任何命名空间（namespace）中，如下代码样例所示：

```cpp

template< typename SWAPPER >
inline void SwapByteTempl(TestNS::Float2& v)
{
	SwapByteTempl< SWAPPER >(v.x);
	SwapByteTempl< SWAPPER >(v.y);
}

```

- 在命名空间behaviac的嵌套子空间Details中实现该类型的Equal()模板函数，如下代码样例所示：

```cpp

namespace behaviac
{
	namespace Details
 	{
       	template<>
		inline bool Equal(const TestNS::Float2& lhs, const TestNS::Float2& rhs)
        {
			return Tag::IsEqualWithEpsilon(lhs.x, rhs.x) && Tag::IsEqualWithEpsilon(lhs.y, rhs.y);
		}
	}
}

```

- 在初始化注册（Register）的部分需要加上如下的代码，反注册（UnRegister）的部分添加相应UnRegister的代码。注意：这部分Register/UnRegister的代码不是必须的，如果该类型没有用作par或者没有用作条件比较，就可以不需要。

```cpp

behaviac::TypeRegister::Register<TestNS::Float2>("TestNS::Float2");

behaviac::TypeRegister::UnRegister<TestNS::Float2>("TestNS::Float2");

```

详细代码可以参考behaviac组件C++源码库中btunittest工程的[extendstruct.h]({{site.repository}}/blob/master/test/btunittest/ext/extendstruct.h)文件。
