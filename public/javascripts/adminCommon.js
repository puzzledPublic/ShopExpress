let activeNavUrl = location.href.substring(location.href.lastIndexOf('/'));
$('div.w3-col  a[href=".'+activeNavUrl+'"]').parent().addClass('w3-white');