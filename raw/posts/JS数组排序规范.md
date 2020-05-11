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

如下图所示：

###### <div style="display: flex; text-align: center; font-size: 1.2rem; line-height: 2"><span style="flex: 3; background-color: green;">*list3*</span><span style="flex: 1">`undefined`</span><span style="flex: 2; color: #fff; background-color: grey;">空元素</span></div>

### 2、排序算法

在es2019之前，规范没有明确排序所使用的算法，大部分js引擎使用的排序算法都采用了基于快速排序的改进算法。改进方案是对不同长度的数组使用对应的排序算法，记数组长度是L，长度阈值是`threshold`

1. 如果L <=`threshold`，使用二分插入排序；
2. 如果L >  `threshold`，使用快速排序。

这样做的原因是对于短数组来说，二分插入排序的效率比快排更高，因为快速排序所产生的额外栈开销盖过了时间上的优势。

但在es2019里明确了排序使用稳定的算法。V8引擎自从v7.0起采用的是timSort，一种基于归并排序的改进算法。现在除了charkra之外所有的引擎都采用了timSort。