function memberJoinAction() {
    if (validator.isLength($('#username').val(), {
            min: 4
        }) == false || validator.isAlphanumeric($('#username').val()) == false) {
        alert('ID 입력을 확인해주세요.\n(4글자 이상, 영문자, 숫자)');
        return false;
    }

    if ($('#password').val() == '' || validator.isLength($('#password').val(), {
            min: 6
        }) == false) {
        alert('비밀번호 입력을 확인해주세요.\n(6글자 이상)');
        return false;
    }

    if ($('#password').val() !== $('#passwordcheck').val()) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }

    if (validator.isLength($('#name').val(), {
            min: 2
        }) == false || validator.isInt($('#name').val()) == true) {
        alert('이름의 입력을 확인해주세요.');
        return false;
    }

    if ($('#zipcode').val() == '' || $('#detailsaddr').val() == '') {
        alert('주소 입력을 확인해주세요.');
        return false;
    }

    let telRegExp = /^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/;
    if ($('#tel').val() != '') {
        if (!telRegExp.test($('#tel').val())) {
            alert('전화번호 입력을 확인해주세요.');
            return false;
        }
    }

    if ($('#hp').val() == '' || telRegExp.test($('#hp').val()) == false) {
        alert('휴대폰번호 입력을 확인해주세요.');
        return false;
    }

    if ($('#email').val() != '') {
        if (validator.isEmail($('#email').val()) == false) {
            alert('이메일 입력을 확인해주세요.');
            return false;
        }
    }

    if ($('#termofusebox').is(':checked') == false) {
        alert('이용약관에 동의해 주십시오.');
        return false;
    }

    if ($('#privatepolicybox').is(':checked') == false) {
        alert('개인정보수집 및 이용에 동의해 주십시오.');
        return false;
    }

    $('#registerform').submit();

}

function memberLoginAction(){

    if (validator.isLength($('#username').val(), {
            min: 4
        }) == false || validator.isAlphanumeric($('#username').val()) == false) {
        alert('ID 입력을 확인해주세요.\n(4글자 이상, 영문자, 숫자)');
        return false;
    }

    if ($('#password').val() == '' || validator.isLength($('#password').val(), {
            min: 6
        }) == false) {
        alert('비밀번호 입력을 확인해주세요.\n(6글자 이상)');
        return false;
    }

    $('#loginform').submit();
}

function memberUpdateAction(){

    if ($('#password').val() == '' || validator.isLength($('#password').val(), {
            min: 6
        }) == false) {
        alert('비밀번호 입력을 확인해주세요.\n(6글자 이상)');
        return false;
    }

    if ($('#password').val() !== $('#passwordcheck').val()) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }

    if ($('#zipcode').val() == '' || $('#detailsaddr').val() == '') {
        alert('주소입력을 확인해주세요.');
        return false;
    }

    let telRegExp = /^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/;
    if ($('#tel').val() != '') {
        if (!telRegExp.test($('#tel').val())) {
            alert('전화번호 입력을 확인해주세요.');
            return false;
        }
    }

    if ($('#hp').val() == '' || telRegExp.test($('#hp').val()) == false) {
        alert('휴대폰번호 입력을 확인해주세요.');
        return false;
    }

    if ($('#email').val() != '') {
        if (validator.isEmail($('#email').val()) == false) {
            alert('이메일 입력을 확인해주세요.');
            return false;
        }
    }

    let formdata = $('#updateform').serialize();
    $.ajax({
        url:'/users/account',
        data: formdata,
        type: 'PUT',
        success: function(data){
            if(data.result == 0){
                alert('수정 오류');
            }else{
                alert('수정 완료');
            }
        }
    });

}

function memberDeleteAction(){
    if ($('#password').val() == '' || validator.isLength($('#password').val(), {
            min: 6
        }) == false) {
        alert('비밀번호 입력을 확인해주세요.\n(6글자 이상)');
        return false;
    }
    let formdata = $('#deleteform').serialize();
    $.ajax({
        url:'/users/leave',
        data: formdata,
        type: 'DELETE',
        success: function(data){
            if(data.result){
                alert(data.message);
                location.href = '/users/logout';
            }else{
                alert(data.message);
            }
        }
    });
}

//공통 사이드 바
// Accordion 
function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}



// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}