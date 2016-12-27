# 关于Git远程分支和本地分支统一的问题

> 公司项目使用gitlab搭建，每次新功能开发总会新建分支，开发完成合并到master上之后，远程分支会删掉，但是本地缓存总是清不掉。google一下操作步骤，发篇文章记录一下。

### 解决办法：

fetch之后删除掉没有与远程分支对应的本地分支：

```bash 
git fetch -p
```

### 查看本地缓存的远程分支：
```bash 
git branch -a 
```
### 查看本地缓存的远程分支删除不是否已经删除：
```bash 
git remote show origin
```

### 本地删除远程分支的方法

##### 推送一个空分支到远程分支，其实就相当于删除远程分支：
```bash 
git push origin :<branchName>
```

##### 可以使用`--delete`语法删除远程分支：
```bash 
git push origin --delete <branchName>
```

### 重命名远程分支：

其实就是先删除远程分支，然后重命名本地分支，再重新提交一个远程分支。

1、删除远程分支：

```bash 
git push origin --delete <branchName>
```
2、重命名本地分支
```bash 
git branch -m <branchName> <branchName2>
```
3、提交到远程分支
```bash 
git push origin <branchName2>
```
