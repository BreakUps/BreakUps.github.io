# 深入理解JS类型转换规则

在使用JS的过程中，经常遇到各种数据类型之间的转换。而相比其他的静态类型语言，JS的类型转换因为场景多、跨度广而比较复杂，这篇文章对各种场景下JS的类型转换做一个小结。



首先来梳理一下JS中的数据类型
## 1、JS数据类型：

- 原始数据类型：

  1. 数值，如1，1.2；`number`
  2. 字符串，如"double quote string"，'single quote string'，\`template string\`；`string`
  3. 布尔值，true和false；`boolean`
  4. null；`object`
  5. NaN，数值类型中的一种特殊数据类型；`number`
  6. undefined；`undefined`
  7. 符号，一种特殊的类型，特点是每一个符号都是独一无二的，如Symbol('symbol')；`symbol`

- 复合数据类型：

  1. 对象（对象的引用）；`object`

## 2、各种数据类型之间的转换规则：

#### 1、原始数据类型之间的转换

原始类型之间的转换可以按照目标类型分为3类：toNumber（转成数值型，转换结果可能为NaN）、toString（转成字符串）、toBoolean（转成布尔值），当然是没有转换成null或undefiend的。

- toNumber

- toString
- toBoolean

#### 2、从对象到原始数据类型

从对象到原始数据类型的转换规则可以抽象为——一个签名是toPrimitive(hint)的函数。下面详细介绍这个函数：

参数hint代表的是：进行转换时传入的目标原始数据类型的提示，有3种传入值：

- "string"
- "number"
- "default"

根据hint，toPrimitive方法会按照优先级规则调用对象obj的3个方法来进行转换：

1. 如果` obj[Symbol.toPrimitive]`方法存在，调用` obj[Symbol.toPrimitive](hint)`
2. 否则，如果hint是"string"  或  hint是"default"且obj是Date类型，则依次尝试`obj.toString()`和`obj.valueOf()`，直到结果是原始数据类型；如果hint是"number"  或  hint是"default"但obj不是Date类型，则依次尝试`obj.valueOf()`和`obj.toString()`，直到结果是原始数据类型；
3. 经过以上调用，如果最终结果仍不是原始数据类型，则抛出异常`Uncaught TypeError: Cannot convert object to primitive value`

接下来介绍转换发生的时机，以及相应时机下的hint：

| 时机                                                         | hint      |
| ------------------------------------------------------------ | --------- |
| `alert(obj)，String(obj)`和属性访问`[]`                      | "string"  |
| `+`，`==`(非严格比较)                                        | "default" |
| 数学操作，包括各种数学操作符和`Number(obj)`，如 `-`，`>`，`<` | "number"  |



