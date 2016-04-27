
# 搜索引擎命令

>记录一些高级实用的搜索技巧。

### 双引号""

把搜索词放在双引号中，代表完全匹配搜索，也就是说搜索结果返回的页面包含双引号中出现的所有的词，连顺序也必须完全匹配。baidu和Google 都支持这个指令。  
例如搜索： `“淘宝设计”`
![实例](/static/img/search-command/001.png)

### 减号-

减号代表搜索不包含减号后面的词的页面。使用这个指令时减号前面必须是空格，减号后面没有空格，紧跟着需要排除的词。Google和baidu都支持这个指令。
例如：`淘宝 -设计`
![实例](/static/img/search-command/006.png)
返回的则是包含“淘宝”这个词，却不包含“设计”这个词的结果

### 星号*

星号`*`是常用的通配符，也可以用在搜索中。百度不支持*号搜索指令。
比如在Google 中搜索：`搜索*擎`
![实例](/static/img/search-command/005.png)
其中的*号代表任何文字。返回的结果就不仅包含“搜索引擎”，还包含了“搜索收擎”，“搜索巨擎”等内容。

### inurl

inurl: 指令用于搜索查询词出现在url 中的页面。baidu和Google 都支持inurl 指令。inurl 指令支持中文和英文。
比如搜索：`inurl:淘宝设计`
![实例](/static/img/search-command/002.png)

### filetype

用于搜索特定文件格式。Google和baidu都支持filetype 指令。
比如搜索`filetype:pdf 设计`
![实例](/static/img/search-command/003.png)
返回的就是包含设计这个关键词的所有pdf文件。

### site

`site:`是SEO 最熟悉的高级搜索指令，用来搜索某个域名下的所有文件。

#### 搜各种软件：
`关键词 site:pan.baidu.com`
![实例](/static/img/search-command/004-3.png)

#### 搜一些常用问题：
`关键词 site:zhihu.com`
![实例](/static/img/search-command/004-1.png)

#### 搜一些八卦新闻：
`关键词 site:tieba.baidu.com`
![实例](/static/img/search-command/004-2.png)