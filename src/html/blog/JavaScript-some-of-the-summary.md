# 关于JavaScript的一些总结
> 众所周知，JavaScript是动态的面向对象的编程语言，能够实现以下效果：
>> 1. 丰富Web 网页功能
>> 2. 丰富Web界面
>> 3. 实现本地或远程存储。
>> 4. 实现分布式网络应用的前端组件，并在后台进行数据存储管理。
>> 5. 使用JavaScript可以实现完整的分布式Web 应用。

### JavaScript 中的数据类型
JavaScript 提供三种元数据类型:`string`, `number`, `Boolean`,
可使用`typeof(type)` 测试变量type 的类型

提供五种基本的引用类型：`Object`, `Array`, `Function`, `Date` 及`RegExp`。
数组，函数，日期和正则表达式是特殊类型，但是严格来讲，日期和正则表达式是元数据类型，可封装在其他对象中。

JS 中变量类型，数组元素类型，函数参数以及返回值的类型不需要声明类型，类型之间的转换是自动执行的。

变量值可以是:  

+ 数值：如字符串，数字或布尔值。
+ 对象引用： 可引用典型对象，也可以是数据，函数，日期或正则表达式。
+ 特殊数据值，Null,是典型的用于初始化对象的默认值。
+ 特殊数据undefined，常用于已被定义，但未赋值的变量。

`string` 是一系列的Unicode字符串，String 如“hello world”,’A3FO’或空字符串“”，字符串连接可通过+操作符来执行，也可以使用=号来验证两个字符串是否相等；

`number` 表示64位的浮点数，在JS中没有明显的区分整形和浮点数，如果一个表达式的值不等于某个数字，那么它的值可设为NaN,表示非数字，可联合isNaN使用。

如下表是详细的类型测试和转换



### 变量作用域范围
目前，JavaScript，ES5提供两种作用域类型：全局变量及函数作用域，没有块作用域。块作用域的范围不太明确，所以应当避免块作用域的使用。如下代码，尽管是开发人员常用的Pattern,却是一个陷阱。
```js
function foo() {
  for (var i=0; i < 10; i++) {
    ...  // do something with i
  }
```
所有的变量声明最好是在函数的开始位置。在JS，ES6版本中支持块作用域，采用关键字let 定义变量。

严格模式（Strict Mode）
从ES5开始， 严格模式用于检测运行时的错误，在严格模式下，所有的变量必须声明，如果给未声明的变量赋值会抛出异常。
在JavaScript 文件或`<Script>`元素内，通过输入以下代码切换到严格模式：`use strict;`
建议采用严格模式，除非项目依赖的库不兼容严格模式。

### 多种对象
JS中对象不需要实例化，也可以有自己的方法，不仅有property，也包含method。除此之外还包含key-value；因此他们总共有三种扩展。

JS对象是由一系列的key-value组成的。而key可以是属性名称，函数名称，映射名称。

对象可通过一种特定的方式创建，使用JS 对象声明语法（JSON），而不需要实例化一个类。
代码如下：
```js
var Object = { lastName:"hello", firstName:"word" };
```
Object 属性可以使用两种方法来访问：

+ 使用”.”(与C++ 和Java的类似)：`Object.key = val`
+ 使用map：`Object[key] = val`

JS 对象能够用于各种途径，以下是3⃣️种常见情况：
1. Property集合；
2. map 如Hash map，数组，hash表；
3. 对象不需要实例化类，它可能包含property和function:
```js
var person1 = { 
  lastName: "hello", 
  firstName: "word",
  getFullName: function () {
    return this.firstName +" "+ this.lastName; 
  }
};
```
### Array List
JS array 即逻辑数据结构，通过数组下标访问。如数组初始化：
```js
var arr = [1,2,3];
```
JS数组可动态增长，因此数组索引有可能比实际元素个数多，如下：
```js
arr[4] = 7;
```
数组循环：
```js
for (i=0; i < arr.length; i++) { ...}
```
数组是特殊的对象类型，因此有很多情况下，需要判断变量是否为数组类型，使用IsArray方法：
```js
Array.isArray(arr)
```
添加新元素到数组：
```js
arr.push(newArray);
```
删除：
```js
arr.splice(i, 1);
```
查找：
```js
if (arr.indexOf(v) > -1)  ...
```
循环：
```js
var i=0;
for (i=0; i < arr.length; i++) {
  console.log(arr);
}
```
如果数组较小，可使用foreach 循环：
a.forEach( function (elem) {
  console.log( elem);
}) 

JS 也提供克隆数组的函数：
```js
var clone = arr.slice(0); 
```
### Maps
map 提供key 到值得映射。JS map 是一串字符集，可包含空格：
```js
var map = { 
    "apple": "red", 
    "orgin": "yellow" 
}
```
增加：
```js
map["banana"] = "yellow";
```
删除：
```js
map["banana"] = "";
```
查找：
```js
if ("yellow" in map)  ...
```
循环：
```js
for (var i in map) {
  console.log( map[i]);
}
```
如果map 较小可使用foreach 语句：
```js
Object.forEach(function (key) {
  console.log(Object[key]);
}) 
```
复制map
```js
var clone = JSON.parse(JSON.stringify(map))
```

record，map，entity 在实际应用中没有明显的区分，只是概念上的区分。对JS 引擎而言，都是对象。但是从概念上是有区分的。

### 函数

函数定义：
```js
var myFunction = function functionName () {...}
```
`functionName`是可选的，如果省略函数名称，则称该函数为匿名函数。通常，函数是通过变量来调用的，如上面的代码，则表示
`myFunction` 会调用`myFunction()`函数，而不是使用`functionName()`调用。
匿名函数表达式在其他编程语言中称为lambda 表达式。如下代码是匿名函数。可以与预定义的sort函数对比：
```js
var list = [[1,2],[1,3],[1,1],[2,1]]; 
list.sort( function (x,y) { 
  return ((x[0] === y[0]) ? x[1]-y[1] : x[0]-y[0]);
});
```
函数声明：
```js
function functionName () {...}
```
与代码
```js
var functionName = function functionName () {...}
```
等价；
声明了函数functionName ，并使用functionName 变量来引用函数。
JS 提供函数内联，closure机制允许JS 函数调用函数之外的使用变量。函数可以创建closure 来存储当前的环境。如下，不需要通过参数将外部变量的结果传给内部函数，它本身就是可用的。
```js
var sum = function (numbers) {
  var result = 0;
  numbers.forEach( function (n) {
      result += n;
  });
  return result;
};
console.log( sum([1,2,3,4]));
```
当执行一个方法时，可以使用内置arguments 对象访问函数内的参数，arguments 对象与数组使用方法类似，有长度属性，也有索引，并且可以使用For语句来循环迭代。但是由于它并不是Array 实例，因此JS arrary的部分方法无法应用如foreach。
arguments 对象的元素个数与函数参数个数相同，也可以定义方法的时候不指定参数个数，在调用时，可为函数赋多个参数，如：
```js
var sum = function () {
  var result = 0, i=0;
  for (i=0; i < arguments.length; i++) {
    result = result + arguments;
  }
  return result;
};
console.log( sum(0,1,1,2,3,5,8));  // 20
```
方法是在构造函数的原型上定义的，可以通过对象创建的构造器调用，如`Array.prototype.forEach`；Array表示构造器，调用类的实例作为上下文对象参考的，如下： 在foreach中numbers表示上下文对象：
```js
var numbers = [1,2,3];  // create an instance of Array
numbers.forEach( function (n) {
  console.log( n);
});
```
无论原型方法是否被上下文对象调用，但是只要是参数为对象，可以使用JS函数的Call 方法来辅助调用对象。如下，我们可以使用foreach 循环方法：
```js
var sum = function () {
  var result = 0;
  Array.prototype.forEach.call( arguments, function (n) {
    result = result + n;
  });
  return result;
};
```
`Function.prototype.call`方法和`Function.prototype.apply`都是为了改变某个函数运行时的 context 即上下文而存在的。

#### 定义和使用类
类是面向对象中的基本概念，对象的实例化称为类。JS中定义类需要满足以下五个需求：
+ 指定类的名称，实例级别的属性和方法，类级别的属性和方法。
+ 是可预测的实力，能够用于验证是否是某一对象的实例。
+ 实例级别的属性用于检测对象的直接类型。
+ 属性继承
+ 方法继承。
除此之外还支持对哦集成和多分类。
JS中对类没有统一的定义规范，可以使用不同代码模式来定义类，并应用于多种不同的框架。JS中最常用的定义类的方法如下：
+  构造函数规范，可通过prototype chain实现方法继承，并支持创建新的类实例。
+  factory 对象，用于预定义Object.create 方法来创建新实例。该方法中基于构造函数的继承机制可以被其他机制代替。
创建App都需要使用类，因此经常需要定义类之间的关系，所以必须保证，使用相同类


#### Constructor-based classes只有ES6引入了定义基于构造器的类。新语法支持定义一些简单的类继承，具体步骤如下：

##### 定义一个基类Person 具有两个属性，`first Name` 和`Last Name`，实例层的方法`toString`和静态方法`checkLastName`；
```js
class Person {
  constructor( first, last) {
    this.firstName = first;
    this.lastName = last;
  }
  toString() {
    return this.firstName + " " +
        this.lastName;
  }
  static checkLastName( ln) {
    if (typeof(ln)!=="string" || 
        ln.trim()==="") {
      console.log("Error: " +
          "invalid last name!");
    }
  }
}
```
##### 定义一个带有其他属性和方法的子类，也有可能重写父类的相关方法：
```js
class Student extends Person {  constructor( first, last, studNo) {
    super.constructor( first, last);
    this.studNo = studNo; 
  }
  // method overrides superclass method
  toString() {
    return super.toString() + "(" +
        this.studNo +")";
  }
}
```
#### ES5中，可以定义继承基于构造器类的子类。如下：
##### 首先定义构造函数，能够隐式的定义类的属性并赋值；
```js
function Person( first, last) {
  this.firstName = first; 
  this.lastName = last; 
}
```
注意，上述代码中的this 指的是新生成的对象，当构造函数被调用时，该对象就已经生成了。
##### 定义实例层的方法：
```js
Person.prototype.toString = function () {
  return this.firstName + " " + this.lastName;
}
```
##### 定义静态方法：
```js
Person.checkLastName = function (ln) {
  if (typeof(ln)!=="string" || ln.trim()==="") {
    console.log("Error: invalid last name!");
  }
}
```

##### 定义子类：
```js
function Student( first, last, studNo) {
  // invoke superclass constructor
  Person.call( this, first, last);
  // define and assign additional properties
  this.studNo = studNo;  
}
```
通过调用超类的构造函数Person.call( this, ...)，来创建新对象。其中This指的是Student，Property Slots 在超类的构造函数中已经创建（(firstName 和lastName） 以及其他子类相关的属性。在这种情况下可使用Property Inheritance 机制保证所有的属性已经被定义且被创建。

##### 通过构造函数的prototype 属性安装method inheritance 。如下，分配了一个新对象创建子类型构造函数的Prototype 属性，并做出适当的调整：
// Student inherits from 
PersonStudent.prototype = Object.create(Person.prototype);
// adjust the subtype's constructor 
propertyStudent.prototype.constructor = Student;
##### 重新定义子类方法重写超类方法：
```js
// Student inherits from Person
Student.prototype = Object.create( 
    Person.prototype);
// adjust the subtype's constructor property
Student.prototype.constructor = Student;
```
##### 基于构造器类的实例化是通过应用new 操作符来创建的，并提供合适的构造参数：
```js
Student.prototype.toString = function () {
  return Person.prototype.toString.call( this) +
      "(" + this.studNo + ")";
};
```
方法toString 通过pers1. 来调用：
```js
alert("The full name of the person are: " +      pers1.toString());
```
在JS中，prototype 是具有method slots 的对象，可以通过JS方法或属性槽继承的。

#### 基于Factory 的类
在该方法中定义了JS 对象Person，含有特殊的Create 方法来调用预定义的Object.Create方法，创建Person类型的对象；
```js
var Person = {
  name: "Person",
  properties: {
    firstName: {range:"NonEmptyString", label:"First name", 
        writable: true, enumerable: true},
    lastName: {range:"NonEmptyString", label:"Last name", 
        writable: true, enumerable: true}
  },
  methods: {
    getFullName: function () {
      return this.firstName +" "+ this.lastName; 
    }
  },
  create: function (slots) {
    // create object
    var obj = Object.create( this.methods, this.properties);
    // add special property for *direct type* of object
    Object.defineProperty( obj, "type", 
        {value: this, writable: false, enumerable: true});
    // initialize object
    Object.keys( slots).forEach( function (prop) {
      if (prop in this.properties) obj[prop] = slots[prop];
    })
    return obj;
  }
};
```
注意JS对象Person实际表示的是factory-based 类。factory-based类的实例化是通过调用它自己的Create方法实现的：
```js
var pers1 = Person.create( {firstName:"Tom", lastName:"Smith"});
```
getFullName 方法是通过pers1. 调用的，如下：
```js
alert("The full name of the person are: " + pers1.getFullName());
```
每个属性的声明都是使用Object.Create 声明的，其中包含三个参数及值，'descriptors'writable: true and enumerable: true。