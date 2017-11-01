(function() {
  $('.ui.dropdown').dropdown();
  $('body > div.ui.massive.menu > div > div').on('click', () => {
    $('#bell-label').html("0");
  });
})();
