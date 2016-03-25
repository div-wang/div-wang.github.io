# 将网页变灰的CSS代码

今天无意之中看到了阿烈叔的[css filter](https://www.baidufe.com/item/4eb2e626e62749df88e2.html)文章。

>IE中可以直接使用CSS Filter实现，但非IE浏览器，却没有直接的提供类似方法。
>好在CSS3出现了，可以通过filter:graysacle实现，但是目前仅支持chrome（18 dev+），
>其他浏览器好像暂时没有支持的打算！
>不过没关系，在中国，目前IE（6/7/8/9）+ Chrome（18 dev+）基本能覆盖了绝大部分浏览器（包括360、Maxthon、Sougou等）。
>`-webkit-filter`，严格意义上将，这个都不是CSS3的一部分，充其量算得上chrome浏览器的私有css，

试了下，感觉效果碉堡了！

** 代码: **  
```css
html {
    filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    -webkit-filter:grayscale(1.0);
}
```
** effect可取下列值：**  

+ `grayscale`           灰度，值为数值，x∈[0,1]  
+ `sepia`                  褐色，值为数值，x∈[0,1]  
+ `saturate`             饱和度，值为数值，默认是1，可以是小于1的小数，也可以大于1,x∈[0,+∞)  
+ `hue-rotate`         色相旋转，值为角度，x∈[0,360]，单位deg  
+ `invert`                  反色，值为数值，x∈[0,1]  
+ `opacity`               透明度，值为数值，x∈[0,1]  
+ `brightness`          亮度，值为数值，默认是1，可以小于1(变暗)，可以大于1(变亮)；  
+ `contrast`              对比度，值为数字，默认是1，可以大于1，也可以小于1；  
+ `blur`                     模糊，值为length，表示模糊半径，比如filter:blur(2px)  
+ `drop-shadow`     阴影，值为shadow()，写法类似css3 box-shadow，比如filter:drop-shadow(0,0,10px,black)  