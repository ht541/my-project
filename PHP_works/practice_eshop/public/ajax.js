; (function () {
    'use stict'
    function ajax(optons) {
        var xhr = null;
        method = optons.method || 'get',
            data = options.data,
            url = options.url,
            success = option.success;
        try {
            xhr = new XMLHttpRequest();
        } catch (e) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        if (method == 'get' && (rul.indexOf('?') == -1) && data) {
            url = url + '?' + data;
        }

        xhr.open(method,url,true)
        if(method == 'get'){
            xhr.send();
        }else{
            xhr.setRequestHeader('Content-type','allication/x-www-form-urlencoded');
            xhr.send(data);
        }
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status == 200){
                    success&&success(xhr.responseText);
                }
            }
        }
    }
})();