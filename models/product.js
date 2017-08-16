var mysql = require('../configs/mysql');

class Product{

    constructor(id){
        this.id = id;               //상품 코드
        this.categoryId = '';       //기본 분류
        this.categoryId2 = '';      //2차 분류
        this.name = '';             //이름
        this.maker = '';            //제조사
        this.origin = '';           //원산지
        this.brand = '';            //브랜드
        this.model = '';            //모델
        this.type = 0;              //상품 유형
        this.customerPrice = 0;     //시중 가격
        this.price = 0;             //판매 가격
        this.soldout = 0;           //품절 여부
        this.mainImage = '';        //메인 이미지
        
    }

    static findAll(categoryId, callback){

        let query = 'SELECT * FROM shop_item_table WHERE it_id = ?';
        let queryParams = [categoryId];

        mysql.query(query, queryParams, function(err, results){
            if(err){
                console.log(err);
                callback();
                return;
            }
            else if(results[0]){
                let products = [];
                for(let index in results){
                    products[index] = new Product();
                    products[index].id = results[index].it_id;
                    products[index].categoryId = results[index].ca_id;
                    products[index].name = results[index].it_name;
                    products[index].maker = results[index].it_maker;
                    products[index].origin = results[index].it_origin;
                    products[index].brand = results[index].it_brand;
                    products[index].model = results[index].it_model;
                    products[index].type = results[index].it_type;
                    products[index].customerPrice = results[index].it_cust_price;
                    products[index].price = results[index].it_price;
                    products[index].soldout = results[index].it_soldout;
                    products[index].mainImage = results[index].it_img;
                }

                callback(products);
            }
        });
    }
    
}

module.exports = Product;