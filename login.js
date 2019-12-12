

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
    //window.location.replace("home.html");
    alert("account created, please log in");
    //let responseDiv = document.getElementById('response');
    //responseDiv.innerHTML = `<div class="message is-success" style="padding: 20px;"><p>Success: Account has been created</p></div>`;
})
  .catch(function(error) {
    //TODO: set an if statement to catch diff kinds of errors... rn this is 401 -- maybe not since it displays message instead
    let responseDiv = document.getElementById('response');
  responseDiv.innerHTML = `<div class="message is-danger" style="padding: 20px;"><p>Error: ${error.response.data['msg']}</p></div>`;

    //getError(error);
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
    // localStorage.setItem('loggedInPass', password);

    //TODO: Redirect
    //let responseDiv = document.getElementById('response');
    //responseDiv.innerHTML = `<div class="message is-success" style="padding: 20px;"><p>Success: Account has been created</p></div>`;
})
  .catch(function(error) {
    //TODO: set an if statement to catch diff kinds of errors... rn this is 401 -- maybe not since it displays message instead
    let responseDiv = document.getElementById('response');
    responseDiv.innerHTML = `<div class="message is-danger" style="padding: 20px;"><p>Error: ${error.response.data['msg']}</p></div>`;
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