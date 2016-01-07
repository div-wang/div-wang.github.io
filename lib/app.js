var express = require('express');
var mysql = require('mysql');
var path = require('path');
var fs = require('fs');
var db = require('./db.js');
var app = express();

// 使用连接池，提升性能
var pool  = mysql.createPool(db.mysql);

var getData = function (op){

    // 设置根目录
    op.root = path.normalize(__dirname+'/..')+op.root;

    // 设置静态访问根目录
    app.use(express.static(op.root));

    //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        res.header("Access-Control-Allow-Methods","POST,GET");
        res.header("Content-Type", "application/json;charset=utf-8");
        var data = getOutput(op, req, res);
        res.end(data);
    });

    // 监听端口
    app.listen(op.port);
    console.log('listen to 127.0.0.1:'+op.port); 
}

// 处理ajax请求
var getOutput = function (op, req, res){

    var data = '',
        path = req.path.replace(/(^\/*)/g, ''),
        param = req.query||req.body;

    if(path === 'ceshi'){
        if(param.user === 'div' && param.password === '123654'){
            data = 'success'
        }else{
            param.id = mysqlTest.queryAll(true,db)
                mysqlTest.add(param,db)
            
        }
    }
    return data;
}

var mysqlTest = {
    add: function(param){
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.user.insert, [param.id, param.name, param.sex, param.bridth], function(err, rows) {
                if (err) throw err;
                if(rows) {
                    rows = {
                        code: 2000,
                        msg:'增加成功'
                    };    
                }
                data = rows
                // 释放连接 
                connection.release();
            });    
        });
    },
    del: function(id){
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.user.delete, [id], function(err, rows) {
                if (err) throw err;
                if(rows) {
                    rows = {
                        code: 2000,
                        msg:'删除成功'
                    };    
                }
                data = rows
                // 释放连接 
                connection.release();
            });
        });
    },
    queryAll: function(id,db){
        var res = null; 
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.user.queryAll,function(err, rows){
                if (err) throw err;
                // console.log(rows);
                res = rows;                
            })
        });
        return id ? res.length : res
    }
}

module.exports = getData;
