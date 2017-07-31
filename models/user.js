var mysql = require('../configs/mysql');
var crypto = require('crypto');
var hash = crypto.createHash('sha256');
var validator = require('validator');

class User{

    constructor(name, id){
        this.name = name;
        this.id = id;
        this.password ='';
        this.zipcode = '';
        this.addr = '';
        this.detailsaddr = '';
        this.tel = '';
        this.hp = '';
        this.email = '';
    }

    setPasswordToHash(originPassword){
        hash.update(originPassword);
        this.password = hash.digest('hex');
    }
    comparePassword(newPassword){
        hash.update(newPassword);
        if(this.password === hash.digest('hex')){
            return true;
        }
        return false;
    }

    static createValidate(user){
        if(validator.isLength(user.getName(),{min:4}) == false || validator.isAlphanumeric(user.getName()) == false){
            return false;
        }
    }

    static create(user, callback){
        let query = 'INSERT INTO member_table (mb_id, mb_name, mb_password) VALUES(?, ?, ?)';
        let queryParams = [user.getId(), user.getName(), user.getPassword()];
        mysql.query(query, queryParams ,function(err, results){
            if(err){
                console.log(err);
                return;
            }
            callback(results.affectedRows);
        });
    }
    static delete(user, callback){

    }
    static findOne(userId, callback){
        let query = 'SELECT * FROM member_table where mb_id = ?';
        let queryParams = [userId];
        mysql.query(query, queryParams, function(err, results){
            let user;
            if(results[0]){
                user = new User();
                user.setId(results[0]['mb_id']);
                user.setName(results[0]['mb_name']);
                user.setPassword(results[0]['mb_password']);
            }
            callback(err, user);
        });
    }

    getName(){
        return this.name;
    }
    setName(name){
        this.name = name;
    }
    getId(){
        return this.id;
    }
    setId(id){
        this.id = id;
    }
    getPassword(){
        return this.password;
    }
    setPassword(password){
        this.password = password;
    }
    getZipcode(){
        return this.zipcode;
    }
    getZipcode(zipcode){
        this.zipcode = zipcode;
    }
    getAddr(){
        return this.addr;
    }
    setAddr(addr){
        this.addr = addr;
    }
    getDetailsAddr(){
        return this.detailsaddr;
    }
    setDetailsAddr(detailsaddr){
        this.detailsaddr = detailsaddr;
    }
    getTel(){
        return this.tel;
    }
    setTel(tel){
        this.tel = tel;
    }
    getHp(){
        return this.hp;
    }
    setHp(hp){
        this.hp = hp;
    }
    getEmail(){
        return this.email;
    }
    setEmail(email){
        this.email = email;
    }
}
module.exports = User;