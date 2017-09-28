function help() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           
        }
    };
    xhttp.open("GET", "help", true);
    xhttp.send();
}
window.help = help;