# 使用AWS搭建自己的VPN

>免费拥有自己的海外VPN服务器。

### 部署自己的AWS服务器
网上有很多教程：  
[新Amazon EC2免费VPS主机申请和使用方法:Linux和Windows](http://www.freehao123.com/amazon-ec2-vps/)  
[申请亚马逊服务器 - google 搜索](https://www.google.com.hk/search?q=%E7%94%B3%E8%AF%B7%E4%BA%9A%E9%A9%AC%E9%80%8A%E6%9C%8D%E5%8A%A1%E5%99%A8&rlz=1C1CHWL_zh-CN__669__670&oq=%E7%94%B3%E8%AF%B7%E4%BA%9A%E9%A9%AC%E9%80%8A%E6%9C%8D%E5%8A%A1%E5%99%A8&aqs=chrome..69i57j0l5.9665j0j7&sourceid=chrome&es_sm=122&ie=UTF-8)  
[申请亚马逊服务器_百度搜索](https://www.baidu.com/s?wd=%E7%94%B3%E8%AF%B7%E4%BA%9A%E9%A9%AC%E9%80%8A%E6%9C%8D%E5%8A%A1%E5%99%A8&rsv_spt=1&rsv_iqid=0xdfe5dd75000b3330&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&inputT=894)  

### 使用putty软件，登录你的服务
+ 首先准备好刚才下载的软件putty和puttygen，和key文件(就是那个后缀pem的文件)
+ 使用puttygen把pem转换成ppk
+ 使用ip登陆
不会的参考：[putty登陆ec2_百度搜索](https://www.baidu.com/s?wd=putty%E7%99%BB%E9%99%86ec2&rsv_spt=1&rsv_iqid=0xdfe5dd75000b3330&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&inputT=12246)

### 使用root账户，直接输入
EC2 ubuntu系统默认用户是`ubuntu`  
首先是启用root  
```bash
sudo passwd
#会让你输入2次密码
```
然后使用Root账户登录  
```bash
su root
#输入你刚才设置的密码会变成下面这样
root@ip-172-31-20-144:/home/ubuntu#
```

### 安装pptpd
```bash
apt-get install pptpd
```
不获取root账户也可以
```bash
sudo apt-get install pptpd
```

### 修改/etc/pptpd.conf文件，设置vpn代理地址
```bash
vi /etc/pptpd.conf
```
移动到文件末尾，按i进入编辑模式
输入
```bash
localip 192.168.0.1
remoteip 192.168.0.234-238,192.168.0.245
```
按Esc键，输入`:wq` 退出
(这里如果不小心删错了或者编辑错了，输入`:q!`退出就可以)

### 修改/etc/ppp/pptpd-options文件, 加上谷歌的dns
```bash
vi /etc/ppp/pptpd-options
```
还是和刚才一样，到文件末尾添加
```bash
ms-dns    8.8.8.8 
ms-dns    8.8.4.4
```
退出保存

### 修改/etc/ppp/chap-secrets文件，设置用户名
```bash
vi /etc/ppp/chap-secrets
```
配置你自己VPN的用户名/密码直接按i输入就行，格式见下方
```bash
<username> pptpd <passwd> *
```
举个例子
```bash
user pptpd 123456 *
```

### 修改/etc/sysctl.conf，打开ip转发
修改/etc/sysctl.conf文件
```bash
vi /etc/sysctl.conf
```
最后添加以下内容
```bash
net.ipv4.ip_forward=1
```
退出保存
执行重新加载配置
```bash
sudo /sbin/sysctl -p
```

### 启用iptables的NAT configuration
```bash
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

### 为了保证每次EC2实例重启后NAT configuration能启动
修改/etc/rc.local文件
```bash
vi /etc/rc.local
```
在exit 0这行上面加上
```bash
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

### vpn如何连接

[怎么设置vpn连接_百度经验](http://jingyan.baidu.com/article/a3f121e4f9903cfc9052bb0b.html)  
[安卓手机怎么设置VPN，安卓手机VPN怎么用_百度经验](http://jingyan.baidu.com/article/d71306350b042713fdf4759e.html)  
[vpn在iphone上怎么用_百度经验](http://jingyan.baidu.com/article/86fae3469769403c48121a71.html)  
[iOS：设置 VPN - Apple 支持](https://support.apple.com/zh-cn/HT201550)  


