# ubuntu下apt-get安装nodejs

> 最近在阿里云服务器上安装`nodejs`，自己编译挺麻烦的，决定用`apt-get`

#### 直接执行`apt-get install nodejs`遇到了问题，具体看下面命令：

```bash
apt-get install nodejs && node -v
	Reading package lists... Done
	Building dependency tree       
	Reading state information... Done
	The following extra packages will be installed:
	  libc-ares2 libv8-3.14.5
	The following NEW packages will be installed:
	  libc-ares2 libv8-3.14.5 nodejs
	0 upgraded, 3 newly installed, 0 to remove and 186 not upgraded.
	Need to get 1,912 kB of archives.
	After this operation, 7,538 kB of additional disk space will be used.
	Do you want to continue? [Y/n] y
	Get:1 http://mirrors.aliyun.com/ubuntu/ trusty/main libc-ares2 amd64 1.10.0-2 [38.5 kB]
	Get:2 http://mirrors.aliyun.com/ubuntu/ trusty/universe libv8-3.14.5 amd64 3.14.5.8-5ubuntu2 [1,189 kB]
	Get:3 http://mirrors.aliyun.com/ubuntu/ trusty/universe nodejs amd64 0.10.25~dfsg2-2ubuntu1 [684 kB]
	Fetched 1,912 kB in 1s (1,269 kB/s)
	Selecting previously unselected package libc-ares2:amd64.
	(Reading database ... 75222 files and directories currently installed.)
	Preparing to unpack .../libc-ares2_1.10.0-2_amd64.deb ...
	Unpacking libc-ares2:amd64 (1.10.0-2) ...
	Selecting previously unselected package libv8-3.14.5.
	Preparing to unpack .../libv8-3.14.5_3.14.5.8-5ubuntu2_amd64.deb ...
	Unpacking libv8-3.14.5 (3.14.5.8-5ubuntu2) ...
	Selecting previously unselected package nodejs.
	Preparing to unpack .../nodejs_0.10.25~dfsg2-2ubuntu1_amd64.deb ...
	Unpacking nodejs (0.10.25~dfsg2-2ubuntu1) ...
	Processing triggers for man-db (2.6.7.1-1ubuntu1) ...
	Setting up libc-ares2:amd64 (1.10.0-2) ...
	Setting up libv8-3.14.5 (3.14.5.8-5ubuntu2) ...
	Setting up nodejs (0.10.25~dfsg2-2ubuntu1) ...
	update-alternatives: using /usr/bin/nodejs to provide /usr/bin/js (js) in auto mode
	Processing triggers for libc-bin (2.19-0ubuntu6.6) ...
	The program 'node' can be found in the following packages:
	 * node
	 * nodejs-legacy
	Try: apt-get install <selected package>
```

Google了一下是因为`ubuntu`默认的`apt-get`源`nodejs`版本是`0.10.25`。  

#### 查看`apt-get`源方法是：
```bash
apt-cache show nodejs
	Package: nodejs
	Priority: extra
	Section: universe/web
	Installed-Size: 3043
	Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
	Original-Maintainer: Debian Javascript Maintainers <pkg-javascript-devel@lists.alioth.debian.org>
	Architecture: amd64
	Version: 0.10.25~dfsg2-2ubuntu1
	Depends: libc-ares2 (>= 1.8.0), libc6 (>= 2.14), libssl1.0.0 (>= 1.0.1), libstdc++6 (>= 4.1.1), libv8-3.14.5, zlib1g (>= 1:1.1.4)
	Filename: pool/universe/n/nodejs/nodejs_0.10.25~dfsg2-2ubuntu1_amd64.deb
	Size: 683742
	MD5sum: 8d3cdf0c2277eb19f8a8666a54eeeed8
	SHA1: b3c1f91229f2689141cc6d1a9a30dd355a444310
	SHA256: f2a3aa1f11fcc5e37d50d9ec0e1eb7e255105b79dcb268a9fd8624f5ddead15a
	Description-en: evented I/O for V8 javascript
	 Node.js is a platform built on Chrome's JavaScript runtime for easily
	 building fast, scalable network applications. Node.js uses an
	 event-driven, non-blocking I/O model that makes it lightweight and
	 efficient, perfect for data-intensive real-time applications that run
	 across distributed devices.
	 .
	 Node.js is bundled with several useful libraries to handle server
	 tasks:
	 .
	 System, Events, Standard I/O, Modules, Timers, Child Processes, POSIX,
	 HTTP, Multipart Parsing, TCP, DNS, Assert, Path, URL, Query Strings.
	Description-md5: e507fb472d7cdaceffc5b285a62d5c1b
	Homepage: http://nodejs.org/
	Bugs: https://bugs.launchpad.net/ubuntu/+filebug
	Origin: Ubuntu

```

#### 更新`apt-get`源的方法有好多，这里推荐`nodejs`官方的源：[nodesource/distributions](https://github.com/nodesource/distributions)

#### 介绍一下用法：

1、添加一个NodeSource签名密钥

```bash
curl --silent https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
```

2、在apt下增加一个`nodesource.list`文件

```bash
	cd /etc/apt/sources.list.d/ && vim nodesource.list
```

3、编辑`nodesource.list`文件

加入以下两行代码：
```bash
	deb https://deb.nodesource.com/node_4.x trusty main
	deb-src https://deb.nodesource.com/node_4.x trusty main
```
`node_4.x`是版本号，可以指定安装版本。

4、更新`apt-get`源&&安装`nodejs`

```bash
	sudo apt-get update
	sudo apt-get install nodejs
```







