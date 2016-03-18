# CSS 选择器性能求解

>关于css性能的详细探究。

上周去360面试，有这么一个面试题：

	写出下列最后输出文字的颜色的值? 
	<style>  
	a{color:#000}  
	#header a{color:pink}  
	.logo a{color:pink}  
	h1 a{color:pink}  
	</style>
	<h1 clss="#header">  
		<div class="logo"><a>360</a></div>  
	</h1>

这么简单的题，我顺手就回答出来了～～科科

### 优先级顺序  

选择器列表优先级逐级增加：  

+ 通用选择器（*）
+ 元素(类型)选择器
+ 类选择器
+ 属性选择器
+ 伪类
+ ID 选择器
+ 内联样式

但是，接下来面试官提问又来了：优先级你知道，那他们的性能谁的最高你知道吗？  
这下我就哔了个🐶了，css选择器也有性能一说，真实开眼界了！  
回来马上开始查文档，看文章！

### CSS 选择器性能损耗来自哪里？
我们中的大多数人都是从左到右的阅读习惯，会习惯性的设定浏览器也是从左到右的方式进行匹配规则，推测这条规则的开销并不高。事实上，却恰恰相反，CSS选择器是从右到左进行规则匹配。  
可怜我以前一直的写法都是左到右多级寻找:
```css
	#header .shouc a {...}
	#header .shouc a i {...}
```

### 如何减少 CSS 选择器性能损耗？
Google 资深web开发工程师 [Steve Souders](http://stevesouders.com/) 对 CSS 选择器的执行效率从高到低做了一个排序：

+ id选择器（#myid）
+ 类选择器（.myclassname）
+ 标签选择器（div,h1,p）
+ 相邻选择器（h1+p）
+ 子选择器（ul < li）
+ 后代选择器（li a）
+ 通配符选择器（*）
+ 属性选择器（a[rel="external"]）
+ 伪类选择器（a:hover, li:nth-child）

#### [阿树](http://www.jianshu.com/users/vCyqyQ/latest_articles)的一篇文章－[如何提升 CSS 选择器性能](http://www.jianshu.com/p/268c7f3dd7a6)详细介绍了关于css性能的优化

##### 1、避免使用通用选择器
```css
	.content * {color: red;}
```	
浏览器匹配文档中所有的元素后分别向上逐级匹配 class 为 content 的元素，直到文档的根节点。因此其匹配开销是非常大的，所以应避免使用关键选择器是通配选择器的情况。

##### 2、避免使用标签或 class 选择器限制 id 选择器
```css
	不好的例子：
	button#backButton {…}
	不好的例子：
	.menu-left#newMenuIcon {…}
	好的例子：
	#backButton {…}
	好的例子：
	#newMenuIcon {…}
```
##### 3、避免使用标签限制 class 选择器
```css
	不好的例子：
	treecell.indented {…}
	好的例子：
	.treecell-indented {…}
	最好的例子：
	.hierarchy-deep {…}
```
##### 4、避免使用多层标签选择器。使用 class 选择器替换，减少css查找
```css
	不好的例子：
	treeitem[mailfolder="true"] > treerow > treecell {…}
	好的例子：
	.treecell-mailfolder {…}
```
##### 5、避免使用子选择器
```css
	不好的例子：
	treehead treerow treecell {…}
	BETTER, BUT STILL 不好的例子： 
	treehead > treerow > treecell {…}
	好的例子：
	.treecell-header {…}
```
##### 6、使用继承
```css
	不好的例子： 
	#bookmarkMenuItem > .menu-left { list-style-image: url(blah) }
	好的例子：
	#bookmarkMenuItem { list-style-image: url(blah) }
```
#### [高性能CSS](http://www.alloyteam.com/2012/10/high-performance-css/)一文中还指出：

##### 避免AlphaImageLoader滤镜
IE独有属性AlphaImageLoader用于修正7.0以下版本中显示PNG图片的半透明效果。这个滤镜的问题在于浏览器加载图片时它会终止内容的呈现并且冻结浏览器。在每一个元素（不仅仅是图片）它都会运算一次，增加了内存开支，因此它的问题是多方面的。完全避免使用AlphaImageLoader的最好方法就是使用PNG8格式来代替，这种格式能在IE中很好地工作。如果你确实需要使用AlphaImageLoader，请使用下划线_filter又使之对IE7以上版本的用户无效。

##### 避免CSS表达式
CSS表达式是动态设置CSS属性的强大（但危险）方法。Internet Explorer从第5个版本开始支持CSS表达式。下面的例子中，使用CSS表达式可以实现隔一个小时切换一次背景颜色：
```css
	background-color: expression((new Date()).getHours()%2?"#FFFFFF": "#000000" );
```
如上所示，expression中使用了JavaScript表达式。CSS属性根据JavaScript表达式的计算结果来设置。expression方法在其它浏览器中不起作用，因此在跨浏览器的设计中单独针对Internet Explorer设置时会比较有用。
表达式的问题就在于它的计算频率要比我们想象的多。不仅仅是在页面显示和缩放时，就是在页面滚动、乃至移动鼠标时都会要重新计算一次。给CSS表达式增加一个计数器可以跟踪表达式的计算频率。在页面中随便移动鼠标都可以轻松达到10000次以上的计算量。一个减少CSS表达式计算次数的方法就是使用一次性的表达式，它在第一次运行时将结果赋给指定的样式属性，并用这个属性来代替CSS表达式。如果样式属性必须在页面周期内动态地改变，使用事件句柄来代替CSS表达式是一个可行办法。如果必须使用CSS表达式，一定要记住它们要计算成千上万次并且可能会对你页面的性能产生影响。

##### 避免类正则的属性选择器
CSS3添加了复杂的属性选择器，可以通过类正则表达式的方式对元素的属性值进行匹配。当然这些类型的选择器定是会影响性能的，正则表达式匹配会比基于类别的匹配会慢很多。大部分情况下我们应尽量避免使用 *=， |=， ^=， $=， 和 ~=语法的属性选择器。

##### 避免使用@import
有两种方式加载样式文件，一种是link元素，另一种是CSS 2.1加入@import。而在外部的CSS文件中使用@import会使得页面在加载时增加额外的延迟。虽然规则允许在样式中调用@import来导入其它的CSS，但浏览器不能并行下载样式，就会导致页面增添了额外的往返耗时。比如，第一个CSS文件first.css包含了以下内容：@import url(“second.css”)。那么浏览器就必须先把first.css下载、解析和执行后，才发现及处理第二个文件second.css。简单的解决方法是使用<link>标记来替代@import;

##### 移除无匹配的样式
移除无匹配的样式，有两个好处：
第一，删除无用的样式后可以缩减样式文件的体积，加快资源下载速度；
第二，对于浏览器而言，所有的样式规则的都会被解析后索引起来，即使是当前页面无匹配的规则。移除无匹配的规则，减少索引项，加快浏览器查找速度；

### 总结:
作为一名前端工程师，应该具有「提升 CSS 选择器性能」的意识，但实际应用中，是否需要完全贯彻这些原则呢？我认为在「可维护性」前提下，提升 CSS 选择器性能是有必要的，但绝不追求「高性能」而牺牲「可维护性」。



