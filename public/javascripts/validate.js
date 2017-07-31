function memberJoinAction(){
        if(validator.isLength($('#username').val(),{min:4}) == false || validator.isAlphanumeric($('#username').val()) == false){
            alert('ID 입력이 잘못됐습니다.\n(4글자 이상, 영문자, 숫자)');
            return false;
        }
        
        if($('#password').val() == '' || validator.isLength($('#password').val(),{min:6}) == false){
            alert('비밀번호 입력이 잘못됐습니다.\n(6글자 이상)');
            return false;
        }

        if($('#password').val() !== $('#passwordcheck').val()){
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }

        if(validator.isLength($('#name').val(), {min:2}) == false || validator.isInt($('#name').val()) == true){
            alert('이름의 입력이 잘못됐습니다.');
            return false;
        }
        
        if($('#zipcode').val() == '' || $('#detailsaddr').val() == ''){
            alert('주소입력이 잘못됐습니다.');
            return false;
        } 

        let telRegExp = /^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/;
        if($('#tel').val() != ''){
            if(!telRegExp.test($('#tel').val())){
                alert('전화번호 입력이 잘못됐습니다.');
                return false;
            }
        }

        if($('#hp').val() == '' || telRegExp.test($('#hp').val()) == false){
            alert('휴대폰번호 입력이 잘못됐습니다.');
            return false;
        }

        if($('#email').val() != ''){
            if(validator.isEmail($('#email').val()) == false){
                alert('이메일 입력이 잘못됐습니다.');
                return false;
            }
        }

        if($('#termofusebox').is(':checked') == false){
          alert('이용약관에 동의해 주십시오.');
          return false;
        }

        if($('#privatepolicybox').is(':checked') == false){
          alert('개인정보수집 및 이용에 동의해 주십시오.');
          return false;
        }

        $('#registerform').submit();

}