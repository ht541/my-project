function createXML(options){
   options = options || {};
   options.type = (options.type || 'GET').toUpperCase();
   ontions.data = options.data || 'json';
   params = formParasm(options.data);
   if(window.XMLHttpRequest){
       var xml = new XMLHttpRequest();
   }else{
       xml = new ActiveXObject('Microsoft.XMLHTTP');
   }
   xml.onreadystatechange=function(){
       if(xml.readyState=4){
           var status = xml.status;
           if(status>=200 && status<300){
              options.success && options.success(xml.responseText,xml.responseXML);
           }else{
               options.fail&&options.fail(status);
           }
       }
   }
   if(options.type=='GET'){
       xml.open('GET',options.url+''+params,true);
       xml.send(null);
   }else if(options=='POST'){
       xml.open('POST',options.url,true);
       xml.setRequestHeader('Content-type','application/x-www-from-urlencoded');
       xml.send(params);
   }
}

function fromParams(data){
    var arr=[];
    for(var name in data){
        arr.push(encodeURIComponent(name)+'='+encodeURIComponent(data[name]));
    }
    arr.push('v='+Math.random().replace('.',''));
    return arr.join('&');
}