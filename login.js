

function userRegister(e){
  alert('yeet');

  let username = document.getElementById('registerUsername').value;
  let password = document.getElementById('registerPassword').value;

  axios.post('http://localhost:3000/account/create', {
    name: username,
    pass: password,
    
  })
  .then(function(response) {
    alert('Your account has been created');
  })
  .catch(function(error) {
    //TODO: set an if statement to catch diff kinds of errors... rn this is 401 -- maybe not since it displays message instead
    
    getError(error);
  })
  e.preventDefault();

}

function userLogin(event){
  let username = document.getElementById('loginUsername').value;
  let password = document.getElementById('loginPassword').value;

  //TODO: set those boxes to '' after if it doen't already do taht
 axios.post('http://localhost:3000/account/login', {
    name: username,
    pass: password,
    
  })
  .then(function() {
    alert('Successfully logged in');
  })
  .catch(function(error) {
    //TODO: set an if statement to catch diff kinds of errors... rn this is 401
    getError(error);
  })
  event.preventDefault();

}

function getError(error) {
  //TODO: change this to html added to dom rather than alert
  alert("Error: " + error.response.data['msg']);

}



$(function() {
    
    //////////const $signupForm = $('#signupForm');
    //////////const $root = $('#content');

   /////////// $("#content").on('click', `#loginSubmit`, handleloginSubmitButton);
 
    
  document.getElementById('registerSubmit').addEventListener('click', userRegister);
  document.getElementById('loginSubmit').addEventListener('click', userLogin);
  });