$( document ).ready(function() {
  
});

var musicTile = document.querySelector('.musicTile');
var musicResponse = document.querySelector('.musicResponse');
var musicToggle = 0;
var foodTile = document.querySelector('.foodTile');
var foodResponse = document.querySelector('.foodResponse')
var foodToggle = 0;

if (musicTile) {
  musicTile.addEventListener('click', function () {
    if (musicToggle % 2 === 0) {
      musicResponse.style.display="block";
    } else {
      musicResponse.style.display="none";
    }
    musicToggle++;

  });
}

if (foodTile) {

  foodTile.addEventListener('click', function () {
    if (foodToggle % 2 === 0) {
      foodResponse.style.display="block";
    } else {
      foodResponse.style.display="none";
    }
    foodToggle++;

  });
}
