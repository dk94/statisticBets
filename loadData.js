function loadData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           document.querySelector('.info').innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "load", true);
    xhttp.send();
}
window.loadData = loadData;