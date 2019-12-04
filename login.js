import Axios from "axios";



function loginFormSubmit() {

}

let handleloginSubmitButton = function () {
    const $loginForm = $('#loginForm');
    username = document.getElementById('loginUsername').value;
    password = document.getElementById('loginPassword').value;
    


}

async function createAccount() {
    const result = await Axios({
        method: post,
        name: username,
        pass: password
        //do we need withCredentials?
    }
}
       




$(function() {


    const pubRoot = new axios.create({
        baseURL: "http://localhost:3000/account"
      });
      

    const $signupForm = $('#signupForm');
    const $root = $('#content');

    $("#content").on('click', `#loginSubmit`, handleloginSubmitButton);
 
    
    
    
    
    
    /*const $message = $('#message');
  
    $form.submit(function(e) {
      e.preventDefault();
  
      $message.html('');
  
      const data = $form.serializeArray().reduce((o, x) => {
        o[x.name] = x.value;
        return o;
      }, {});
      
      $.ajax({
        url: 'https://comp426fa19.cs.unc.edu/sessions/login',
        type: 'POST',
        data,
        xhrFields: {
            withCredentials: true,
        },
      }).then(() => {
        $message.html('<span class="has-text-success">Success! You are now logged in.</span>');
      }).catch(() => {
        $message.html('<span class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>');
      });
    });*/
  });