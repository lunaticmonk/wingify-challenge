"use strict";

(function() {
  function markRead() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/markRead', true);
    xhttp.onreadystatechange = ()=> {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log(xhttp.responseText);
      }
    }
    xhttp.send();
  }
})();
