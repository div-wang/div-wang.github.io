// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: '127.0.0.1', 
        user: 'root',
        password: 'root',
        database:'test', // 前面建的user表位于这个数据库中
        port: 3306
    },
    user: {
        insert:'INSERT INTO user(id, name, sex, birth) VALUES(?,?,?,?)',
        update:'update user set name=?, age=? where id=?',
        delete: 'delete from user where id=?',
        queryById: 'select * from user where id=?',
        queryByName: 'select * from user where name=?',
        queryAll: 'select * from user'
    }
};