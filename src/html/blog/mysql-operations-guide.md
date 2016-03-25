# mysql常用操作指南

>集合一些常用的mysql操作，覆盖增删改查。

## 数据库&表

##### 查看数据库
`create database;`

##### 创建数据库
`create database test;`

##### 选择数据库 
`use test;`

##### 查看当前数据库所有表
`show tables;`

##### 创建数据表
`create table person(id int, name varchar(20), sex char(1), birth date);`

##### 获取数据表结构
`desc person;`

##### 查询表中的数据
`select * from person;`

##### 插入数据 
`insert into person(id,name,sex,birth) values(1,'test','1','1990-01-08');`

##### 更新表中的数据 
`update person set name='test1', sex=1, birth=1990-01-01 where id=1;`

##### 删除表中的数据 
`delete from person where id=1;`

##### 删除表中的全部数据 
`delete from person; `

##### 重命名表
`alter table person rename person_test;`

##### 删除表
`drop table person_test;`

##### 删除数据库 
`drop database test;`

## 主键

##### 新增主键
`alter table person_test add primary key(id); `

##### 删除主键
`alter table person_test drop primary key; `

## 字段

##### 新增字段
`alter table person add(address varchar(50));` 

##### 修改字段名
`alter table person CHANGE address newAddress varchar(50);`

##### 修改字段类型
`alter table person modify newAddress varchar(50);`

##### 更新字段内容
`update person set name='test1' where id=1;`

##### 删除字段
`alter table person drop column id;`

##### 新增id为自增主键
`alter table card add id int auto_increment primary key;`

##### 修改id为自增主键
`alter table card modify id int auto_increment primary key;`

##### 自增id从1开始
TRUNCATE TABLE card 