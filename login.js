function userRegister(event){

  let username = document.getElementById('registerUsername').value;
  let password = document.getElementById('registerPassword').value;
  let email = document.getElementById('registerEmail').value;

  axios.post('http://localhost:3000/account/create', {
    name: username,
    pass: password,
    data: {
      "email": email
    }
  })
  .then(function(response) {
    let responseDiv = document.getElementById('response');
    responseDiv.innerHTML = `<div class="message is-success" style="padding: 20px;"><p>Account has been created. Please log in</p></div>`;

    document.getElementById('registerUsername').value = "";
    document.getElementById('registerPassword').value = "";
    document.getElementById('registerEmail').value = "";

    setTimeout(function() {
      const $responseDiv = $('#response')
      $responseDiv.empty();
    }, 5000);

  })
  .catch(function(error) {
    let responseDiv = document.getElementById('response');
    responseDiv.innerHTML = `<div class="message is-danger" style="padding: 20px;"><p>Error: ${error.response.data['msg']}</p></div>`;
    
    document.getElementById('registerUsername').value = "";
    document.getElementById('registerPassword').value = "";
    document.getElementById('registerEmail').value = "";
  

    setTimeout(function() {
      const $responseDiv = $('#response')
      $responseDiv.empty();
    }, 5000);
  })
  event.preventDefault();

}

function userLogin(event){
  let username = document.getElementById('loginUsername').value;
  let password = document.getElementById('loginPassword').value;

 axios.post('http://localhost:3000/account/login', {
    name: username,
    pass: password,
    
  })
  .then(function(response) {
    window.location.replace("home.html");
    let responseValues = Object.values(response);
    console.log(responseValues[0]['jwt']);
    localStorage.setItem('jwt', responseValues[0]['jwt']);
    localStorage.setItem('loggedInUser', username);
  })
  .catch(function(error) {
    //TODO: set an if statement to catch diff kinds of errors... rn this is 401 -- maybe not since it displays message instead
    let responseDiv = document.getElementById('response');
    responseDiv.innerHTML = `<div class="message is-danger" style="padding: 20px;"><p>Error: ${error.response.data['msg']}</p></div>`;
  
    setTimeout(function() {
      const $responseDiv = $('#response')
      $responseDiv.empty();
    }, 5000);
  })
  event.preventDefault();

}




$(function() {
    
    //////////const $signupForm = $('#signupForm');
    //////////const $root = $('#content');

   /////////// $("#content").on('click', `#loginSubmit`, handleloginSubmitButton);
 
    
  document.getElementById('registerSubmit').addEventListener('click', userRegister);
  document.getElementById('loginSubmit').addEventListener('click', userLogin);
  });