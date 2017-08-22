
let Level = (function(){
    let levels = ['일반','프라임','플래티넘','탈퇴','관리자'];
    return {
        'getToString': function(index){
            if(index > -1 && index < levels.length){
                return levels[index];
            }
            return levels[0];
        },
        'getToInt': function(str){
            return levels.indexOf(str);
        }
    }
})();
module.exports = Level;