var product = require('./product');
class ProductDetail extends product{
    constructor(){
        this.bagic = '';            //기본 설명
        this.explain = '';          //상세 설명
        this.point = 0;             //포인트
        this.stockQuantity = 0;     //재고 수량
        this.deliveryType = 0;      //배송 유형
        this.deliveryMetohd = 0;    //배송 방법
        this.deliveryPrice = 0;     //배송비
        this.deliveryMinimumPrice = 0; //배송비 무료 최소 수량
        this.deliveryQuantity = 0;  //배송비 부과 수량
        this.minimumBuyQuantity = 0;//최소 구매 수량
        this.maximumBuyQuantity = 0;//최대 구매 수량
        this.hit = 0;               //조회 수
        this.registerdTime = '';    //등록일
        this.updatedTime = '';      //수정일
        this.optionSubject = '';    //선택 옵션 항목
        this.supplySubject = '';    //추가 옵션 항목
        this.image = [];            //이미지 URL
    }
    //TODO:: 옵션 추가 필요
    static findOne(itemId, callback){
        let query = 'SELECT * FROM shop_item_table WHERE it_id = ?';
        let queryParams = [itemId];
        mysql.query(query, queryParams, function(err, results){
            if(err){
                console.log(err);
                callback();
                return;
            }
            else if(results[0]){
                let product = new ProductDetail();
                product.id =         results[0].it_id;
                product.categoryId = results[0].ca_id;
                product.name =       results[0].it_name;
                product.maker =      results[0].it_maker;
                product.origin =     results[0].it_origin;
                product.brand =      results[0].it_brand;
                product.model =      results[0].it_model;
                product.type =       results[0].it_type;
                product.bagic =      results[0].it_basic;
                product.explain =    results[0].it_explain;
                product.customerPrice = results[0].it_cust_price;
                product.price =         results[0].it_price;
                product.point =         results[0].it_point;
                product.soldout =       results[0].it_soldout;
                product.stockQuantity = results[0].it_stock_qty;
                product.deliveryType =  results[0].it_sc_type;
                product.deliveryMetohd = results[0].it_sc_method;
                product.deliveryPrice =  results[0].it_sc_price;
                product.deliveryMinimumPrice = results[0].it_sc_minimum;
                product.minimumBuyQuantity =   results[0].it_buy_min_qty;
                product.maximumBuyQuantity =   results[0].it_buy_max_qty;
                product.hit =                  results[0].it_hit;
                product.optionSubject =        results[0].it_option_subject;
                product.supplySubject =        results[0].it_supply_subject;
                product.image.push(results[0].it_img1);
                product.image.push(results[0].it_img2);
                
                callback(product);
            }
        });
    }
}