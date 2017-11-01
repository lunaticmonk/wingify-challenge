(function() {
  document.querySelector('[name="scheduleBtn"]').addEventListener('click', () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/generate', true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        // console.log(xhttp.responseText);
        document.querySelector('.info-text').innerHTML = xhttp.responseText;
      }
    }
    xhttp.send();
  });

  document.querySelector('[name="delBtn"]').addEventListener('click', () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/delete', true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log(xhttp.responseText);
        document.querySelector('.info-text').innerHTML = xhttp.responseText;
      }
    }
    xhttp.send();
  });
})();
