var musicTile = document.querySelector('.musicTile');
var musicResponse = document.querySelector('.response');
var musicToggle = 0;

musicTile.addEventListener('click', function () {
  if (musicToggle % 2 === 0) {
    musicResponse.style.display="block";
  } else {
    musicResponse.style.display="none";
  }
  musicToggle++;

});
