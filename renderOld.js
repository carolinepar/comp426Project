export const renderSite = function() {
    const $root = $('#root');
    $root.empty();
    $root.append(`
    <section class="hero is-info is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">426Sports</h1>
                <!--<h2 class="subtitle">Forums</h2>-->
            </div>
        </div>
    </section>
    <button class="button account-button" style="margin-left:2%; margin-top:15px;">Account</button>
    <section class="section">
        <div class="box" style="background-color: #209CEE;">
            <h1 class="title" style="color:white; display:inline-block;">Threads</h1><button class="button is-rounded is-light new-thread-button" style="float:right">Post New Thread</button>
            <div>
                <form autocomplete="off">
                    <div class="control search">
                            <input class="input" type="text" placeholder="Search threads" name="mySearch" id="searchThread">
                    </div>
                    <button type="button" id="submitSearch">Submit</button>
                </form>
            </div>
            <br>
            <div id="threadFeed">
                <div class="box">
                    <h3 class="title is-4">Post Title Placeholder</h3>
                    <h3 class="subtitle is-6">Author Name Placeholder &emsp; <strong>Sport Placeholder</strong></h5>
                    <button class="button view-button">View</button>
                </div>
            </div>
        </div>
    </section>
    `);
    renderFeed();
}

























export const autocomplete = async function(searchBar, options) {
    let currentFocus;


    searchBar.addEventListener("input", debounce(function(e){
        let val = this.value;
        let a;
        let b;
        let i;
        closeAllLists();
        if(!val) {
            return false;
        }
        currentFocus = -1;

        a = document.createElement("div");
        a.setAttribute('id',this.id + 'autocompleteItems');
        a.setAttribute("class", "autocompleteItems");
        this.parentNode.appendChild(a);
        for(i = 0; i < options.length; i++) {
            if(options[i].substr(0,val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement('div');
                b.innerHTML = "<strong>" + options[i].substr(0, val.length) + "</strong>";
                b.innerHTML += options[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + options[i] + "'>";
                b.addEventListener("click", function(e) {
                    searchBar.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    }, 125, false));




/*execute a function presses a key on the keyboard:*/
searchBar.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");   //um?
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
});
function addActive(x) {
  /*a function to classify an item as "active":*/
  if (!x) return false;
  /*start by removing the "active" class on all items:*/
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  /*add class "autocomplete-active":*/
  x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}
function closeAllLists(elmnt) {
  /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
  var x = document.getElementsByClassName("autocompleteItems");
  console.log(x);
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != searchBar) {
    x[i].parentNode.removeChild(x[i]);
  }
}
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
  closeAllLists(e.target);
});
}




function debounce(func, wait, immediate) {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
          
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
      
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
      
      if (callNow) func.apply(context, args);
    };
  };




export const renderPost = function() {
    const $root = $('#root');
    $root.empty();

    //TODO
    //make axios call to get thread specific info

    $root.append(`
    <section class="hero is-info is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">426Sports</h1>
            </div>
        </div>
    </section>
    <section>
        <div class="field is-grouped" style="margin-left:4%; margin-top:15px;">
            <button class="button back-button">Back</button>
            <button class="button favorite-button" style="margin-left:5px;" id="favoriteButton">&#10084</button>
        </div>
        <br>
        <div>
            <h1 class="title is-3" id="threadTitle">Title Placeholder</h1>
            <div class="box" style="margin-left: 5%; margin-right:5%;">
                <h1 class="title is-4">Author Name</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div id="commentFeed" class="box" style="background-color: #209CEE; margin-left: 5%; margin-right:5%;">
                <h1 class="title is-4" style="color: white;">Replies</h1>
                <div class="box">
                    <h1 class="subtitle is-6">Commenter Name</h1>
                    <p>Enim ut sem viverra aliquet eget sit amet. Etiam tempor orci eu lobortis elementum nibh tellus molestie. Lectus nulla at volutpat diam. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Ridiculus mus mauris vitae ultricies. Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Nascetur ridiculus mus mauris vitae ultricies leo integer. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. Ultricies lacus sed turpis tincidunt id aliquet risus. In tellus integer feugiat scelerisque varius morbi. Eget arcu dictum varius duis at consectetur lorem. At elementum eu facilisis sed odio. Nulla porttitor massa id neque aliquam vestibulum morbi. Turpis nunc eget lorem dolor. Felis bibendum ut tristique et egestas quis ipsum. Ridiculus mus mauris vitae ultricies leo. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Massa tincidunt nunc pulvinar sapien et ligula. Congue nisi vitae suscipit tellus mauris a diam. Risus sed vulputate odio ut enim blandit volutpat.</p>
                </div>
                <div class="box">
                    <h1 class="subtitle is-6">Commenter Name 2</h1>
                    <p>Yes this post was very cool and informative. Very cool, proud of you, keep it up</p>
                </div>
            </div>
            <div id="replyForm" class="control" style="margin-left: 5%; margin-right:5%;">
                <textarea class="textarea" placeholder="Send a reply"></textarea>
                <button class="button is-info reply-button" style="margin-top: 5px;">Send</button>
            </div>
        </div>
        <br>
    </section>
    `);

    renderComments();
}

export const renderAccount = function() {
    const $root = $('#root');
    $root.empty();

    $root.append(`
    <section class="hero is-info is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">426Sports</h1>
            </div>
        </div>
    </section>
    <section>
        <button class="button back-button" style="margin-left:4%; margin-top:15px;">Back</button>
        <br>
        <br>
        <div style="margin-left: 5%; margin-top:5px;">
            <h1 class="title">Account Name</h1>
        </div>
        <br>
        <br>
        <div class="tile is-ancestor">
            <div class="tile is-child is-1"></div>
            <div class="tile is-child box" style="background-color:#209CEE;">
                <div>
                    <h1 class="title is-3" style="color:white;">Your Posts</h1>
                    <div class="box">
                        <h3 class="title is-4">Post Title Placeholder</h3>
                        <h3 class="subtitle is-6"><strong>Sport Placeholder</strong></h5>
                        <button class="button view-button">View</button>
                    </div>
                    <div class="box">
                        <h3 class="title is-4">Post Title Placeholder</h3>
                        <h3 class="subtitle is-6"><strong>Sport Placeholder</strong></h5>
                        <button class="button view-button">View</button>
                    </div>
                </div>
            </div>
            <div class="tile is-child is-1"></div>
            <div class="tile is-child box" style="background-color:#209CEE;">
                <div>
                    <h1 class="title is-3" style="color:white;">Favorite Posts</h1>
                    <div class="box">
                        <h3 class="title is-4">Post Title Placeholder</h3>
                        <h3 class="subtitle is-6">Author Name Placeholder &emsp; <strong>Sport Placeholder</strong></h5>
                        <button class="button view-button">View</button>
                    </div>
                </div>
            </div>
            <div class="tile is-child is-1"></div>
        </div>
    </section>
    `);

    //TODO
    //make render functions
}

export async function renderFeed() {
    const $threads = $('#threadFeed');
    //TODO
    //make axios call to get all the threads, loop through and append to the threadFeed div
}

export async function renderComments() {
    const $comments = $('#commentFeed');
    //TODO
    //make axios call to get all the threads, loop through and append to the threadFeed div

}

export const handleViewButtonEvent = function(event) {
    event.preventDefault();

    renderPost();
}

export const handleBackButtonEvent = function(event) {
    event.preventDefault();

    renderSite();
}

export const handleAccountButtonEvent = function(event) {
    event.preventDefault();

    renderAccount();
}

export const handleNewThreadButton = function(event) {
    event.preventDefault();

    const $root = $('#root');
    $root.empty();
    $root.append(`
    <section class="hero is-info is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">426Sports</h1>
            </div>
        </div>
    </section>
    <section>
        <button class="button back-button" style="margin-left:4%; margin-top:15px;">Back</button>
        <br>
        <br>
        <div style="margin-left: 4%; margin-top:5px;">
            <h1 class="title">New Thread</h1>
        </div>
        <br>
        <div >
            <div class="box" style="margin-left:6%; margin-right:6%; background-color:#209CEE;">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" id="newPostTitle" placeholder="Title">
                    </div>
                    <br>
                    <div class="control">
                        <textarea class="textarea" id="newPostBody" placeholder="Text"></textarea>
                    </div>
                </div>
                <button class="button send-new-thread-button">Send</button>
            </div>
        </div>
    </section>
    `);
}

export const handleReplySendButtonEvent = function(event) {
    event.preventDefault();

    alert("sending new reply to the datastore")
    //TODO
    //Handle sending a reply to a particular thread
    renderSite();
}

export const handleSendNewThreadButton = function(event) {
    event.preventDefault();

    let title = document.getElementById("newPostTitle").value;
    //this.threads[threads.length] = title;
    //alert(threads);
    let body = document.getElementById("newPostBody").value;
    let postID = new Date().getTime();
    let url = 'http://localhost:3000/private/threads/' + postID;

    let jwt = localStorage.getItem('jwt');
    
    axios.post(url, {
        data: {
          "title": title,
          "body": body
        } 
    },
    {
        headers: { Authorization: `Bearer ${jwt}`}
    }).then(function(response) {
         //threads.add(title);
        console.log("thread stored in privateStore");

        //go to post page once posted   
    }).catch(function(error) {
        //post doesn't get sent to dataStore
        //what errors could there be (no title? no body?)
        alert(error.response.data['msg']);
    });



        //add post id to user accunt
       

    //renderSite();
}




export const getTitles = async function(event) {
    

    let url = 'http://localhost:3000/private/threads';

    let jwt = localStorage.getItem('jwt');
    
    let output = await axios.get(url,
    {
        headers: { Authorization: `Bearer ${jwt}`}
    }).then(function(response) {
         //threads.add(title);
        // console.log("titles loaded");
        // console.log(response.data.result);

        let titles = {};
        titles = response.data.result;
        return titles;
        // titles = r once posted   
    }).catch(function(error) {
        alert("error hit");


        
    });

        let titles = output;
        let counter = 0;

        let temp = [];

        for (let i in titles){
                temp[counter] = titles[i]['title']
            counter++;
        }

        return temp;
}





export const handleFavoriteButtonEvent = function(event) {
    event.preventDefault();

    const $button = $('#favoriteButton');

    $button.css("color", "red");

    $button.attr("class", "button unfavorite-button")
    $button.attr("id", "unfavoriteButton")

    //TODO
    //Update in the user datastore that this thread was favorited
}

export const handleUnfavoriteButtonEvent = function(event) {
    event.preventDefault();

    const $button = $('#unfavoriteButton');

    $button.css("color", "");

    $button.attr("class", "button favorite-button")
    $button.attr("id", "favoriteButton")

    //TODO
    //Update in the user datastore that this thread was unfavorited
}

$( async function() {
    renderSite();

    const $root = $('#root');

    $root.on('click', '.view-button', handleViewButtonEvent);

    $root.on('click', '.back-button', handleBackButtonEvent);

    $root.on('click', '.account-button', handleAccountButtonEvent);

    $root.on('click', '.new-thread-button', handleNewThreadButton);

    $root.on('click', '.send-new-thread-button', handleSendNewThreadButton);

    $root.on('click', '.reply-button', handleReplySendButtonEvent);

    $root.on('click', '.favorite-button', handleFavoriteButtonEvent);

    $root.on('click', '.unfavorite-button', handleUnfavoriteButtonEvent);

    let titles  = await getTitles();
    autocomplete(document.getElementById("searchThread"), titles);

});

