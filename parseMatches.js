function getData() {
    if (document.querySelector('.loading')) {
        document.querySelector('.loading').innerHTML = "<img src='https://m.popkey.co/dc6bd3/Llgbv.gif'/>";
    }
    else{
         document.querySelector('.info').innerHTML = "<div class='text-center'><img style='margin:0 auto' src='https://m.popkey.co/dc6bd3/Llgbv.gif'/></div>";
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xhttpPost = new XMLHttpRequest();
            xhttpPost.open("POST", "fixtures", true);
            xhttpPost.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhttpPost.send(this.responseText);
            xhttpPost.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.querySelector('.info').innerHTML = this.responseText;
                }
            }
        }
    };
    xhttp.open("GET", "scraper", true);
    xhttp.send();
}
window.getData = getData;