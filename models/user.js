var mysql = require('../configs/mysql');
var crypto = require('crypto');
var hash;// = crypto.createHash('sha256'); 
//hash 오브젝트가 digest Method를 한번 호출하면 다음 부터 사용 불가.
//다시 createHash Method를 사용하여 hash 오브젝트 생성해서 사용.
var validator = require('validator');
var Level = require('./level');

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
        this.level = 0;
        this.point = 0;

    }

    setPasswordToHash(originPassword){
        hash = crypto.createHash('sha256');
        hash.update(originPassword);
        this.password = hash.digest('hex');
    }
    comparePassword(newPassword){
        hash = crypto.createHash('sha256');
        hash.update(newPassword);
        if(this.password === hash.digest('hex')){
            return true;
        }
        return false;
    }

    static validateUser(user, passwordCheck){
        if(validator.isLength(user.getId(),{min:4}) == false || validator.isAlphanumeric(user.getId()) == false){
            console.log('validate error id');
            return false;
        }
        if(validator.isLength(user.getPassword(),{min: 6}) == false){
             console.log('validate error password');
            return false;
        }
        if(user.comparePassword(passwordCheck) == false){
             console.log('validate error password compare');
            return false;
        }
        if(validator.isLength(user.getName(),{min: 2}) == false || validator.isInt(user.getName()) == true){
             console.log('validate error name');
            return false;
        }
        if(validator.isLength(user.getZipcode(),{min: 5}) == false || validator.isLength(user.getDetailsAddr(),{min:3}) == false){
             console.log('validate error addr');
            return false;
        }
        let telRegExp = /^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/;
        if(telRegExp.test(user.getHp()) == false){
             console.log('validate error tel');
            return false;
        }

        return true;
    }

    static create(user, callback){
        let query = 'INSERT INTO member_table (mb_id, mb_name, mb_password, mb_email, mb_tel, mb_hp, mb_zip3, mb_addr1, mb_addr2, mb_createtime)'
                     + ' VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, now())';
        let queryParams = [user.getId(), user.getName(), user.getPassword(), user.getEmail(), user.getTel(), user.getHp(), user.getZipcode(), user.getAddr(), user.getDetailsAddr()];
        mysql.query(query, queryParams ,function(err, results){
            if(err){
                console.log(err);
                callback(err.message);
                return;
            }
            callback(results.affectedRows);
        });
    }

    static update(user, callback){
        let query = 'UPDATE member_table SET mb_password = ?, mb_email = ?, mb_tel = ?, mb_hp = ?, mb_zip3 = ?, mb_addr1 = ?, mb_addr2 = ?'
                     + ' WHERE mb_id = ?';
        let queryParams = [user.getPassword(), user.getEmail(), user.getTel(), user.getHp(), user.getZipcode(), user.getAddr(), user.getDetailsAddr(), user.getId()];

        mysql.query(query, queryParams, function(err, results){
            if(err){
                console.log(err);
                callback({'result': 0});
                return;
            }
            callback({'result': results.affectedRows});
        })
    }

    static destroy(userId, callback){
        let query = ['SELECT mb_password FROM member_table where mb_id = ?', 
                     'UPDATE member_table SET mb_level = ? WHERE mb_id = ?'];
        let queryParams = [userId, [Level.getToInt('탈퇴'), userId]];

    }

    static findOne(userId, callback){
        let query = 'SELECT * FROM member_table where mb_id = ?';
        let queryParams = [userId];
        mysql.query(query, queryParams, function(err, results){
            let user;
            if(results[0] && results[0].level != Level.getToInt('탈퇴')){
                user = new User();
                user.setId(results[0]['mb_id']);
                user.setName(results[0]['mb_name']);
                user.setPassword(results[0]['mb_password']);
                user.setLevel(results[0]['mb_level']);
                
                user.setEmail(results[0]['mb_email']);
                user.setTel(results[0]['mb_tel']);
                user.setHp(results[0]['mb_hp']);
                user.setZipcode(results[0]['mb_zip3']);
                user.setAddr(results[0]['mb_addr1']);
                user.setDetailsAddr(results[0]['mb_addr2']);
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
    setZipcode(zipcode){
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
    getLevel(){
        return this.level;
    }
    setLevel(level){
        this.level = level;
    }
    getPoint(){
        return this.point;
    }
    setPoint(point){
        this.point = point;
    }
}
module.exports = User;