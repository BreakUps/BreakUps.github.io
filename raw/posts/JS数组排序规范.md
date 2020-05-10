# JS数组排序规范

`Array.prototype.sort`方法是[ecma](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort) 规范的一部分，以下是此规范的几处细节：

### 1、稀疏数组的排序

> 稀疏数组：存在`undefined`元素或者空元素（empty hole）的数组。

稀疏数组的元素可以分为3类：

1. `undefined`
2. 空元素
3. 既非`undefined`也非空元素

排序时，只对第3类元素进行排序，得到第三类元素的排序结果*list3*。最终，排序后的数组从左到右的3段分别是：

1. *list3*
2. `undefined`元素
3. 空元素

### 2、排序算法

在es2019之前，规范没有明确排序所使用的算法，大部分js引擎使用的排序算法都采用了基于快速排序的改进算法。

但在es2019里明确了排序使用稳定的算法。V8引擎采用的是timSort，一种基于归并排序的改进算法。现在除了charkra之外所有的引擎都采用了timsort。