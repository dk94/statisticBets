function saveData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           document.querySelector('info').innerHTML ="<h2>Data is saved</h2>"
        }
    };
    xhttp.open("GET", "save", true);
    xhttp.send();
}
window.saveData = saveData;