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
    localStorage.setItem('currentViewingID', null);
    
  })
  .catch(function(error) {
  let responseDiv = document.getElementById('response');
  responseDiv.innerHTML = `<div class="message is-danger" style="padding: 20px;"><p>Error: ${error.response.data['msg']}</p></div>`;

  setTimeout(function() {
    const $responseDiv = $('#response')
    $responseDiv.empty();
  }, 5000);
  
  })
  event.preventDefault();
}

function sendFeedback(event) {
  event.preventDefault();

  let ID = new Date().getTime();
  let feedback = document.getElementById('feedbackBox').value;

  axios.post('http://localhost:3000/public/feedback/' + ID, {
    data: {
      "response": feedback
    },
  }).then(function(response) {
    document.getElementById('feedbackBox').value = "";
  }).catch(function(error) {
    console.log(error);
  });
}

$(async function() {
  document.getElementById('registerSubmit').addEventListener('click', userRegister);
  document.getElementById('loginSubmit').addEventListener('click', userLogin);
  document.getElementById('feedbackSend').addEventListener('click', sendFeedback);
});