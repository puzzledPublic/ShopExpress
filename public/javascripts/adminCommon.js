

let SALES = {
    calcPrice : function(){
        let marginRate = $('#margin_rate').val();

        if(SALES.isDecimal2(marginRate) === false){
            alert('마진율을 숫자로 넣어주세요.');
            $('#margin_rate').focus();
            return;
        }
        if(SALES.isNumber($('#add_price').val()) === false){
            $('#add_price').val(0);
        }

        let iCalcPrice = SALES.calcPrdBuyPriceDisplay(marginRate, $('#add_price').val());
    },

    calcPrdBuyPriceDisplay : function(marginRate, addPrice){
        let calcPrice = SALES.calculatePrice(marginRate, addPrice);
        if(calcPrice > 0){
            $('#product_sale_price').val(calcPrice);
            calcData = SALES.calcMarginPrice(calcPrice);
            $('#product_price').html(calcData[1]);
            $('#product_taxPrice').html(calcData[0]);
        }
    },
    
    calcMarginPrice : function(calcPrice, option){
        let param = {'bIsRound': true};
        let taxType = 'A';
        let taxPer = 0;
        //param = $.extend(param, option);

        taxType = $('[name = "product_tax_type"]:checked').val();
        taxPer = parseInt($('[name = "tax_rate"]').val(), 10);

        let prdMarginPrice;
        let marginPrice;
        if(taxType === 'A' && taxPer !== ''){
            prdMarginPrice = (calcPrice * 100) / (taxPer + 100);
            
            prdMarginPrice = Math.round(prdMarginPrice);

            marginPrice = calcPrice - prdMarginPrice;
        }else{
            prdMarginPrice = calcPrice;
            marginPrice = 0;
        }
        return [marginPrice, prdMarginPrice];
    },

    calculatePrice : function(marginRate, addPrice){
        let calcBasic = $('#product_buy').val();
        if(!calcBasic || !SALES.isNumber(calcBasic)){
            alert('공급가를 숫자로 넣어주세요.');
            $('#product_buy').focus();
            return 0;
        }

        let resultPrice = parseInt(calcBasic) + parseInt(calcBasic * (marginRate / 100)) + parseInt(addPrice);

        return resultPrice;
    }


    ,
    /**
     * 소숫점 둘째자리 체크
     */
    isDecimal2: function (value) {
        if (value == '') return false;
        return (/^[0-9]+(\.[0-9]{1,2})?$/).test(value);
    },
    /*
     * 숫자  체크
     */
    isNumber: function (value) {
        if (value == '') return false;
        return (/^[0-9]+$/).test(value);
    }
}

$('#apply_price').click(function(){
    SALES.calcPrice();
});

$('#product_sale_price').change(function(){
    let inputPrice = $('#product_sale_price').val()
    let taxPer = $('#margin_rate').val();
    $('#product_price').html(parseInt(inputPrice) - parseInt(inputPrice) * parseInt(taxPer) / 100);
    $('#product_taxPrice').html(parseInt(inputPrice) * parseInt(taxPer) / 100);
});

$('[name="product_tax_type"]').click(function(event){
    if(event.target.value === 'A'){
        $('#productPriceSaleTaxBox').show();
    }else{
        $('#productPriceSaleTaxBox').hide();
    }
});

$('[name="product_max_type"]').click(function(event){
   if(event.target.value === 'T'){
        $('#product_max_qty').prop('disabled', false);
   }
   else{
        $('#product_max_qty').prop('disabled', true).val('');
   }
});

$('[name="has_option"]').click(function(event){
    if(event.target.value === 'T'){
        $('[name="input-option"]').show();
        $('#manage-stock').hide();
    }else{
        $('[name="input-option"]').hide();
        $('#manage-stock').show();
    }
});