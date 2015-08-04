var signUperror = document.getElementById('handleError')

if (signUperror) {
  if(signUperror.innerHTML != ""){
  var clicker = function(){
    document.getElementById('signup').click()
  }
  clicker()
  }
}


var loginError = document.getElementById('handleError2')

if (loginError) {
  if(loginError.innerHTML != ""){
  var clicker2 = function(){
    document.getElementById('login').click()
  }
  clicker2()
  }
}
