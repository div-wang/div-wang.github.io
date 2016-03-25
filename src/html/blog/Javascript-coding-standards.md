# Javascript编码规范  

** 1、变量、方法命名必须匹配正则：/^[$_a-zA-Z]\w*$/ **

```javascript
/**
 * 虽然Javascript引擎支持多种格式命名的变量，
 * 比如下面这样的变量，Javascript引擎依然能正常解析
 * 但是，禁止这样定义！
 */
var \u0041 = "A";    //最终会被解析为：var A = "A";
var 中国 = "中国";  //以中文命名的变量
```
** 2、变量命名不能用关键字、保留字 ** 

```javascript
/**
 * Javascript关键字列表
 */
[
    "break",    "case",         "catch",    "const",    "continue",
    "default",  "delete",       "do",       "else",     "finally",
    "for",      "function",     "if",       "in",       "instanceof",
    "new",      "return",       "switch",   "throw",    "try",
    "typeof",   "var",          "void",     "while",    "with",
    "false",    "true",         "null",     "undefined"
]
 
/**
 * Javascript保留字列表
 */
[
    "abstract",     "boolean",      "byte",     "char",         "class",
        "debugger",     "double",       "enum",     "export",       "extends",
        "final",        "float",        "goto",     "implements",   "import",
        "int",          "interface",    "long",     "native",       "package",
        "private",      "protected",    "public",   "short",        "static",
        "super",        "synchronized", "throws",   "transient",    "volatile"
]
```
** 3、正则的修饰符只能是[i、g、m]组合 ** 

```javascript
/**
 * 下面的这个正则表达式修饰符不合法，只能有igm组成，或者无
 */
var reg = /\d/abcdigm;  //修饰符“abcdigm”不合法
 
//应该改为：
var reg = /\d/igm;
```
** 4、数组字面量和json（object字面量）的最后一个item后，不能有多余的逗号“,” ** 

```javascript
/**
 * 下面这个数组定义是不合法的，
 * 数组最后一项“3”后多了一个逗号“,”
 * 在IE下会报错
 */
var arr = [1,2,3,];     //数组最后一项“3”后多了一个逗号“,”
 
//应该改为：
var arr = [1,2,3];
 
/**
 * 下面这个json定义是不合法的，
 * json字面量的最后一个key，不能有多余的逗号“,”
 * 在IE下会报错
 */
var obj = {
    a : "a",
    b : "b",    //这是json字面量的最后一个key，不能有多余的逗号“,”
};
 
//应该改为：
var obj = {
    a : "a",
    b : "b"
};
```
** 5、json字面量的key不能是javascript关键字或保留字 ** 

```javascript
/**
 * 下面的json定义是不合法的，因为采用了javascript关键字作为key
 * 这在IE下会报错，YUI压缩时也会报错
 */
var obj = {
    var : 1     //这在IE下会报错
};
 
//改成如下格式可以被正确解析，但依然不推荐这样做
var obj = {
    "var" : 1
};
//因为在IE下，如果通过如下方式获取该值，依然会报错
var value = obj.var;    //error!
//改为下面形式可以正确解析
var value = obj["var"];
```
** 6、从json（object字面量）中获取value时，如果key为关键字或保留字，禁止用“obj.key”的方式 ** 

```javascript
/**
 * 如果有json对象为：obj = {float:1}，
 * 在代码中要获取obj对象的float字段内容，不能通过obj.float的方式获取，
 * 这在YUI压缩的时候会报错
 */
var obj = {
    float : 1
};
var value = obj.float;  //这在YUI压缩时直接报错
 
//如果真有这样的case，应该改成这样：
var obj = {
    "float" : 1
};
var value = obj["float"];
 
//PS:虽然上面的方式可以正确的通过编译，在各种浏览器中叶能正确的解析，但是依然不推荐使用！
//json参考文档：http://www.json.org/
```
** 7、禁止在代码中出现仅IE支持的注释 ** 

```javascript
/**
 * 仅IE支持的javascript条件注释，是以"/ * @"开始，以"@ * /"结束的，
 * 比如下面的注释，在代码中严格禁止
 */
 
/*@cc_on alert(4 - @*/ 3 /*@)@*/
//上面的这段注释，在IE浏览器中，将会被解释为：alert(4 - 3)，最终alert(1)
//而在其他浏览器中，会得到：3
```
** 8、function的定义方式 ** 

```javascript
/**
 * 只允许出现如下三种形式的function的定义
 */
//方式一：
function funcName(){
    //TODO
}
 
//方法二：
var funcName = function(){
    //TODO
};                          //注意，这里必须加分号“;”具体原因请看第13条关于分号“;”的解释
 
//方式三：（同二）
ClassA.xxx = function(){
    //TODO
};
 
/**
 * 下面这样的定义方式是禁止的
 */
var funcName = function funcName2(){
    //TODO
};
//上面这样的定义，仅IE中会认为funcName和funcName2都存在，
//FireFox、Chrome中仅你能解释funcName，而funcName2不存在
 
/**
 *  在IE里，var foo = function foo2(){}
 *  foo2能被外部访问是IE的bug，且foo !== foo2，在IE6/7/8/9中的确不建议这么使用它。
 *  但是ES5中取消了arguments.callee，当使用use strict模式，这就意味着任何需要使用递归的地方都需要这么定义才能保证函数的安全性
 */
```
** 9、禁止在行尾用“\”来拼接字符串 ** 

```javascript
/**
 * 在行尾通过“\”的方式拼接字符串，在YUI压缩的时候，
 * 下一行开头的一片空白会被解析为正常的字符，而造成无法被压缩的现象！
 * 另外，下一行的空白字符在非IE浏览器中，会被当成TextNode而占位解析！
 * 影响页面布局
 */
var str = '<div>\
            <div class="header"></div>\
            <div class="body"></div>\
            <div class="footer"></div>\
          </div>';
 
//一种比上面稍微好点儿的办法，是多个字符串“+”连接
//但是这种方法会创建多个字符串常量，每次执行“+”操作都会创建新的常量
//从而影响性能
//uglifyjs会将多个字符串常量的加法优化成一个字符串常量
var str = '<div>' +
    '<div class="header"></div>' +
    '<div class="body"></div>' +
    '<div class="footer"></div>' +
    '</div>';
 
//最好的大字符串拼接方法，是通过数组join方式
var str = [
    '<div>' ,
    '<div class="header"></div>' ,
    '<div class="body"></div>' ,
    '<div class="footer"></div>' ,
    '</div>'
].join("");
 
/*
 * 关于字符串拼接，High performance Javascript 第五章已经对join和+情况作了对比说明。
 * join只在ie7或以下会更快，所以这个优化也许应该根据浏览器使用统计来定吧
 * 另可参见http://jsperf.com/string-concatenation-plus-vs-join
 */
```
** 10、禁止在代码中使用标签（label） ** 

```javascript
/**
 * 标签一般配合goto，break，continue进行使用！
 * 但是使用标签，会让程序的逻辑变得混乱，所以程序中极端不推荐！
 * 比如下面的这段代码：
 */
label_1 : for(var i = 0;i < 3;i++){         //这里声明了label_1标签
    //TODO...
    label_2 : for(var j = 0;j < 3;j++){     //这里声明了lable_2标签
        if(i * j > 6) {
            break label_2;
        }else if(i * j > 4){
            continue label_1;
        }else{
            alert(i * j);
        }
    }
}
```
** 11、代码中避免使用void、eval、with ** 

```javascript
/**
 * void表示某个方法或表达式无返回值！
 * 虽然javascript引擎能正常解析，但是完全不推荐这样使用！
 * 比如下面的这几个例子：
 */
//这里表示方法无返回值
var funcName = void function(){
    //TODO...
};
 
//这里表示表达式无返回值
var returnValue = void ( 2 > 1);
var array = void [1,2,3];
 
//还有别的使用场景，不再穷举！不推荐使用！
 
/**
 * eval方法，是把一个字符串当作一个js表达式一样去执行它。
 * 在IE中，可以通过下面的方式获取一个DOM节点。
 * 但程序中不推荐使用eval
 */
var dom = eval("DomId");
 
/**
 * with语句:为一个或一组语句指定默认对象，通常用来缩短特定情形下必须写的代码量。
 * 程序中不推荐使用with块
 */
```
** 12、禁止在return、continue、break、throw语句后写无法被执行到的代码 ** 

```javascript
/**
 * return、continue、break、throw这些语句都会作为一个程序块的最后一句代码来执行。
 * 比如，下面这样的代码都是禁止出现的！
 */
for(var i = 0;i < 10;i++){
    if(i % 2 === 0){
        continue;
        alert(i);           //这句代码永远都不可能被执行到！
    }else if(i % 3 === 0){
        break;
        alert(i);           //这句代码永远都不可能被执行到！
    }else if(i % 5 === 0){
        throw new Error("error!");
        alert(i);           //这句代码永远都不可能被执行到！
    }
    alert(i * 2);
}
```
** 13、正确断句，正确使用分号 ** 

```javascript
/**
 * javascript引擎会自动的在语句结束的地方插入分号，然而，ECMAScript中也明确的解释到：
 * 空语句，变量语句，表达式语句，do-while 语句，continue 语句，
 * break 语句，return 语句，以及 throw 语句，这些确定的ECMAScript语句必须以分号结束。
 *
 * 看下面的例子，return后自动被插入分号造成的问题：
 */
function funcName(){
    var i = 1,j = 2;
    return              //这个地方会被自动插入分号
    (
        i + j
        );
}
alert(funcName());      //结果为“undefined”
 
//修改的办法可以是这样：
function funcName(){
    var i = 1,j = 2;
    return (
        i + j
        );
}
 
/**
 * 通过var定义function，function必须以“};”结束，否则，如果在function的定义之后紧跟着一个闭包，
 * 就会出现很严重的后果。
 * 比如下面的例子：
 */
var funcName = function(){
    //TODO
}                           //这里是不可能被自动插入分号的
    (function(){                //当上面的function结束标准"}"遇到了这里的"("，就会视为要执行这个function
        //TODO 1
    })()
//上面的例子最终会被等价的解释为：
var funcName = (function(){
    //TODO 1
})(function(){
    //TODO 2
})()
//这样，程序加载就会出现异常情况！！！
```
** 14、关于闭包 ** 

```javascript
/**
 * 使用闭包时：
 * 1、要注意局部变量的释放，避免循环引用造成内存泄露！
 * 2、闭包后，注意分号的使用！
 */
//下面的这段闭包的代码，就是由于没有添加适当的分号，而造成严重后果！
(function (){
    var a;
})()                    //同第13条，这里也不会自动插入分号
    (function (){
        var b;
    })()
 
//应该改成这样：
    (function (){
        var a;
    })();                   //增加分号
(function (){
    var b;
})()
```
** 15、绕开浏览器差异，正确使用多行注释 ** 

```javascript
/**
 * 下面是一段非常正常的代码，在所有的浏览器中，result的结果均为：1
 */
var result = (function(x){
    return (x > 1) ?
        1 : 0;
})(2);
 
/**
 * 但是项目维护的过程中，不能像下面这样做，
 * 否则各个浏览器处理兼容性不一致，会得到不一样的值
 */
var result = (function(x){
    return /*(x > 1) ? 
     1 : 0*/ x;
})(2);
/**
 * WEB标准规定，对于多行注释中存在行终结符的情况，都是一致的，
 * 要求这个多行注释不是简单的被忽略，而是要被替换为一个行终结符插入到流中。
 * 所以上面的代码在遵守规范的浏览器中，最终将被解释为：
 */
var result = (function(x){
    return ; x;
})(2);
```
** 16、this指针的使用 ** 

```javascript
/**
 * 如果存在标签：<input type="button" value="Hello zxlie!" id="MyButton" >
 * 试图通过下面的方式，给MyButton添加click事件，是不正确的！
 */
var EventHandler = (function () {
    this.info = "This is from event handler!";
    this.clickHandler = function() {
        alert(this.info );
    };
    return {
        clickHandler : clickHandler
    };
})();
document.getElementById("MyButton").onclick =  EventHandler.clickHandler;
/**
 * 会发现，每次点击这个按钮，得到的都是：undefined
 * 问题的根源，就是错误的使用了this指针，this指针具体指到什么对象，取决于调用者：caller
 * 应该像下面这样修改：
 */
var EventHandler = (function () {
    var self = this;
    self.info = "This is from event handler!";
    self.clickHandler = function() {
        alert(self.info );    //主要是这里的self，不能用this
    };
    return {
        clickHandler : clickHandler
    };
})();
document.getElementById("MyButton").onclick =  EventHandler.clickHandler;
```
** 17、switch块中只可以包含多个case分支，但是最后只能有一个default分支 ** 

```javascript
/**
 * 在switch块中可以不定义default分支。
 * 但如果定义了多个default分支，YUI压缩的过程中，就会报错！
 */
switch(value) {
    case 1 :
        //TODO
        break;
    default :
        //TODO
    default : 
        // TODO
}
```
** 18、提测以及上线之前去掉代码中的console、debugger等调试语句 **

```javascript
/**
 * console对象主要用来在开发过程中进行程序调试，
 * 该语句在IE7及其以下版本无法被识别。
 * 所以提测和上线之前务必去掉这样的语句
 */
```