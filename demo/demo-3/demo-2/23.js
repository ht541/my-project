var fade = function(node){
    var lever =1;
    var step = function(){
        var hex = lever.toString(16);
        node.style.backgroundColor = '#fff'+hex+hex;
        if(lever<15){
            lever++;
            setTimeout(step,100);
        }
    };
    setTimeout(step,100);
};
fade(document.body);