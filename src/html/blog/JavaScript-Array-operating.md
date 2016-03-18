# JavaScript Array 常用操作

>基本数组的常用操作，做个备份。

### 概要
在JavaScript中，数组以 Array 为构造函数，是一个高阶的类似有序列表的数据类型。

### 声明语法
```javascript	
	var arr1 = []; //建议使用［］声明数组对象;
	var arr2 = new Array();
	var arr3 = new Array(5); //new个数组对象，length是5
```
##### 元素列
向 Array 构造函数传递以 ”,“ 分号分割的一组数据（即元素列）时，将返回一个以这些数据为数组元素的数组对象（当元素列仅有一个数据且为数值时除外，这是接下来要说的内容）。数据的个数为元素个数，即数组长度。

##### 数组长度
向 Array 构造函数传递一个在 0 到 232-1 之间的整数，将返回一个以此为长度的数组对象。通过length属性可以访问这个值。如果传入的参数不是有效的数值，则抛出RangeError异常。如果传入的参数不是数值，则创建一个长度为1的数组，传入的参数即为数组的第一个元素。

##### 数组索引 
每个元素列会有个单独的Length索引值，JavaScript 数组的索引值（index）从0开始，即数组第一个元素的索引值为0。最后一个元素的索引值等于该数组的长度减1（Array.length -1）。
```javascript
	var arr = [1,2,3,4,5];
	console.log(arr[0]) // 1
	console.log(arr[arr.length-1]) // 5
```

### >方法

#### Mutator 方法

这些方法可以改变数组自身:  

#### pop
移除数组的最后一个元素，返回值是被删除的元素。
```javascript
	Array.pop()
``` 
###### javascript 代码示例：
```javascript
	var arr = [1, 2, 3];
	arr.pop();
	console.log(arr)  // [1, 2]
```
#### push
在数组的末尾添加一个或者多个元素，返回值是新的数组的长度。
```javascript
	Array.push(element1, element2, ..., elementN)
``` 
##### <span name="table"/>
| 参数  | 描述|
| ------------- | ------------- |
| arguments[0] | 必需。向数组添加的第一个元素。  |
| arguments[1] | 可选。向数组添加的第二个元素。 |
| arguments[n] | 可选。可添加若干个元素  |

###### javascript 代码示例：
```javascript
	var arr = [2, 3, 4];
	arr.push(0);
	console.log(arr)  // [2, 3, 4, 0]
```
#### reverse
颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在的第一个，也就是数组的索引发生了变化。
```javascript
	Array.reverse()
``` 
###### javascript 代码示例：
```javascript
	var arr = [1, 2, 3, 4];
	arr.reverse();
	console.log(arr)  // [4, 3, 2, 1]
```
#### shift
删除数组的第一个元素，返回值是删除的元素。
```javascript
	Array.shift()
``` 
###### javascript 代码示例：
```javascript
	var arr = [2, 3, 4];
	arr.shift();
	console.log(arr)  // [3, 4]
```
#### sort
对数组中的元素进行排序。
```javascript
	Array.sort()
``` 
###### javascript 代码示例：
```javascript
	var arr = [1, 11, 0, 99, 67, 100];
	arr.sort();
	console.log(arr)  // [0, 1, 100, 11, 67, 99]
```
#### splice
添加或删除数组中的一个或多个元素。
```javascript
	Array.splice(index, length, element1, element2, ..., elementN)
``` 
##### <span name="table"/>
| 参数  | 描述|
| ------------- | ------------- |
| arguments[0] | 必需。从数组的哪一位开始修改内容。如果超出了数组的长度，则自动从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位。  |
| arguments[1] | 必需。整数，表示要移除的数组元素的个数。如果 howmany 是 0，则不移除元素。这种情况下，至少应添加一个新元素。 |
| arguments[2] | 可选。要添加进数组的元素。如果不指定，则 splice 只删除数组元素。  |
| arguments[N] | 可选。要添加进数组的元素。如果不指定，则 splice 只删除数组元素。  |

###### javascript 代码示例：
```javascript
	var arr = [1, 11, 0, 99, 67, 100];
	arr.splice(5,1);
	console.log(arr)  // [0, 1, 100, 11, 67, 99]
	arr.splice(3,3,2,4,5);
	console.log(arr)  // [1, 11, 0, 2, 4, 5]
```
#### unshift
添加一个或者多个元素在数组的开头，返回值是新的数组的长度。
```javascript
	Array.unshift(element1, element2, ..., elementN)
``` 
##### <span name="table"/>
| 参数  | 描述|
| ------------- | ------------- |
| arguments[0] | 必需。向数组添加的第一个元素。  |
| arguments[1] | 可选。向数组添加的第二个元素。 |
| arguments[n] | 可选。可添加若干个元素  |

###### javascript 代码示例：
```javascript
	var arr = [2, 3, 4];
	arr.unshift(0,1,5);
	console.log(arr)  // [0, 1, 5, 2, 3, 4]
```


### Accessor 方法

这些过程不改变数组自身:

#### concat
返回一个包含此数组和其他数组和/或值的结合的新数组
```javascript
	Array.concat(Array1, Array2, ..., ArrayN )
```
##### <span name="table"/>
| 参数  | 描述|
| ------------- | ------------- |
| arguments[0] | 可选。向数组合并的第一个数组。  |
| arguments[1] | 可选。向数组合并的第二个数组。 |
| arguments[n] | 可选。可添加若干个数组  | 

###### javascript 代码示例示例：
```javascript
	var arr1 = ["a", "b", "c"];
	var arr2 = [1, 2, 3];
	var arr3 = arr1.concat(arr2);
	console.log(arr3) //["a", "b", "c", 1, 2, 3]
	var arr4 = arr2.concat(arr3);
	console.log(arr4) //[1, 2, 3, "a", "b", "c", 1, 2, 3]
``` 

#### indexOf
返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1。
```javascript
	Array.indexOf(searchElement,fromIndex)
``` 
##### <span name="table"/>
| 参数  | 描述|
| ------------- | ------------- |
| arguments[0] | 必需。位于数组中的元素。  |
| arguments[1] | 可选。默认值: 0 (即在整个数组中查找指定元素) |

###### javascript 代码示例示例：
```javascript
	var arr = ['a', 'b', 'c', 'b'];
	var index1 = arr.indexOf('a');
	console.log(index1); // 0
	var index2 = arr.indexOf('b',1);
	console.log(index2); // 1
	var index3 = arr.indexOf('b',2);
	console.log(index3); // 3
	var index4 = arr.indexOf('d');
	console.log(index4); // -1
``` 

#### join
将所有的数组元素连接成一个字符串。
```javascript
	Array.join(string)
``` 
##### <span name="table"/>
| 参数  | 描述|
| ------------- | ------------- |
| arguments[0] | 可选。于指定连接每个数组元素的分隔符。 |

###### javascript 代码示例：
```javascript
	var arr = ['a', 'b', 'c', 'b'];
	var str1 = arr.join();
	console.log(str1)  // 'a,b,c,b'
	var str2 = arr.join('');
	console.log(str2)  // 'abcb'
	var str3 = arr.join(' + ');
	console.log(str3)  // 'a + b + c + b'
```

#### lastIndexOf
返回在数组中搜索到的与给定参数相等的元素的最后（最大）索引。
```javascript
	Array.lastIndexOf(searchElement,fromIndex)
``` 
##### <span name="table"/>
| 参数  | 描述|
| ------------- | ------------- |
| arguments[0] | 必需。位于数组中的元素。  |
| arguments[1] | 可选。默认值: arr.length - 1] (从此位置开始逆向查找) |

###### javascript 代码示例示例：
```javascript
	var arr = ['a', 'b', 'c', 'b'];
	var index1 = arr.lastIndexOf('a');
	console.log(index1); // 0
	var index2 = arr.lastIndexOf('b',1);
	console.log(index2); // 1
	var index3 = arr.lastIndexOf('b',3);
	console.log(index3); // 3
	var index4 = arr.lastIndexOf('d');
	console.log(index4); // -1
``` 
#### slice
返回数组中的一段。
```javascript
	Array.slice(begin,end)
``` 
##### <span name="table"/>
| 参数  | 描述|
| ------------- | ------------- |
| arguments[0] | 可选。从该索引处开始提取原数组中的元素（如果省略 arguments[0]从0开始，如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取）  |
| arguments[1] | 可选。在该索引处结束提取原数组元素（从0开始，slice会提取原数组中索引不包含到arguments[1]） |

###### javascript 代码示例示例：
```javascript
	var arr = ['a', 'b', 'c', 'b'];
	var arr1 = arr.slice();
	console.log(arr1); // ["a", "b", "c", "b"]
	var arr2 = arr.slice(-2);
	console.log(arr2); // ["c", "b"]
	var arr3 = arr.slice(2,3);
	console.log(arr3); // ["c"]
	var arr4 = arr.slice(-3,-1);
	console.log(arr4); // ["b", "c"]
``` 
#### toString
返回代表该数组及其元素的字符,重写Object.toString 过程.
```javascript
	Array.toString()
``` 
###### javascript 代码示例：
```javascript
	var arr = ['a', 'b', 'c', 'b'];
	var str1 = arr.toString();
	console.log(str1)  // 'a,b,c,b'
```
#### valueOf
返回 Array 对象的原始值。
```javascript
	Array.valueOf()
``` 
###### javascript 代码示例：
```javascript
	var arr = ['a', 'b', 'c', 'b'];
	var str1 = arr.valueOf();
	console.log(str1)  // ["a", "b", "c", "b"]
```
