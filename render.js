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
    <div class="field is-grouped has-addons" style="margin-top:15px">
        <button class="button logout-button is-danger is-outlined" style="margin-left:2%;">Logout</button>
        <button class="button account-button" style="margin-left:5px;">Account</button>
        <button class="button sports-button" style="margin-left:5px;">Upcoming Events</button>
    </div>
    <section class="section">
        <div class="box" style="background-color: #209CEE;">
            <h1 class="title" style="color:white; display:inline-block;">Threads</h1><button class="button is-rounded is-light new-thread-button" style="float:right">Post New Thread</button>
            <div class="field has-addons search" style="width:100%;" id="seachDiv";> 
                <input class="input" type="text" placeholder="Search threads" name="mySearch" id="searchThread" autocomplete="off">
                <div class="control">
                    <button class="button is-rounded submit-search-button" id="submitSearch">Submit</button>
                </div>
            </div>
            <br>
            <div id="threadFeed">
            </div>
        </div>
    </section>
    `);
    renderFeed();
}

export async function renderFeed() {
    const $threads = $('#threadFeed');
    let jwt = localStorage.getItem('jwt');
    let url = 'http://localhost:3000/private/threads';

    axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}`}
        }).then(function(response) {
            let threads = response.data.result;
            
            let IDs = [];
            for(let i in threads) {
                IDs.push(i);
            }

            for(let i = 0; i < IDs.length; i++) {
                $threads.append(`
                    <div class="box" id="${IDs[i]}">
                        <h3 class="title is-4">${threads[IDs[i]]['title']}</h3>
                        <h3 class="subtitle is-6">${threads[IDs[i]]['author']} &emsp; <strong>${threads[IDs[i]]['sportTag']}</strong></h5>
                        <button class="button view-button">View</button>
                    </div>
                `);
            }        
        }).catch(function(error) {
        console.log(error + " hit when rendering threadFeed");
    });  
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

export const renderPost = async function() {
    const $root = $('#root');
    
    $root.empty();

    let jwt = localStorage.getItem('jwt');
    let viewingID = localStorage.setItem('viewingID',null);
    viewingID = localStorage.getItem('currentViewingID');
console.log(viewingID);
    if(viewingID == 'null'){
        renderSite();
        return;
    }

    let url = 'http://localhost:3000/private/threads';

    let result = await axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}`}
        }).then(function(response) {
            let currentPost = response.data.result[viewingID]
            return currentPost;       
        }).catch(function(error) {
            console.log(error + " hit when rendering post");
    });

    $root.append(`
    <section class="hero is-info is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">426Sports</h1>
            </div>
        </div>
    </section>
    <section>
        <div class="field is-grouped" style="margin-left:4%; margin-top:15px;" id="buttonControls">
            <button class="button back-button">Back</button>
            <button class="button favorite-button" style="margin-left:5px;" id="favoriteButton">&#10084</button>
        </div>
        <br>
        <div id=${viewingID}>
        <h1 class="title is-3" id="threadTitle">${result['title']}</h1>
        <div class="box" style="margin-left: 5%; margin-right:5%;" id="postBox">
            <h1 class="title is-4">${result['author']}</h1>
            <p id="bodyBox">${result['body']}</p>    
            </div>
            <div id="commentFeed" class="box" style="background-color: #209CEE; margin-left: 5%; margin-right:5%;">
                <h1 class="title is-4" style="color: white;">Replies</h1>
            </div>
            <div id="replyForm" class="control" style="margin-left: 5%; margin-right:5%;">
                <textarea class="textarea" placeholder="Send a reply" id="replyBox"></textarea>
                <button class="button is-info reply-button" style="margin-top: 5px;">Send</button>
            </div>
        </div>
        <br>
    </section>
    `);

    url = 'http://localhost:3000/user/likedPosts/' + viewingID;

    let saveStatus = await axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}`}
    }).then(function(response) {
        const $button = $('#favoriteButton');

        $button.css("color", "red");

        $button.attr("class", "button unfavorite-button")
        $button.attr("id", "unfavoriteButton")
    }).catch(function(error) {
        //This catch will encounter 404 errors, but this is by design  
    });

    url = 'http://localhost:3000/user/myPosts/' + viewingID;

    let editStatus = await axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}`} 
    }).then(function(response) {
        const $buttons = $('#buttonControls');
        $buttons.append(`
        <button class="button edit-button is-info is-outlined" style="margin-left:5px;" id="editButton">Edit</button>
        <button class="button delete-button is-danger" style="margin-left:5px;" id="deleteButton">Delete</button>
        `)
    }).catch(function(error) {
        console.log(error)
    });

    renderComments();
}

export async function renderComments() {
    const $comments = $('#commentFeed');
    let jwt = localStorage.getItem('jwt');
    let url = 'http://localhost:3000/private/comments';
    let parentID = localStorage.getItem('currentViewingID');
    
    axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}`}
        }).then(function(response) {
            let threads = response.data.result;
            
            let IDs = [];
            for(let i in threads) {
                IDs.push(i);
            }
            
            let replyIDs = IDs.filter(reply => threads[reply]['parentID'] == parentID);

            for(let i = 0; i < replyIDs.length; i++) {
                $comments.append(`
                    <div class="box">
                        <h1 class="subtitle is-6">${threads[replyIDs[i]]['author']}</h1>
                        <p>${threads[replyIDs[i]]['reply']}</p>
                    </div>
                `);
            } 
        }).catch(function(error) {
            console.log(error + " hit when rendering commentFeed");
    });
}

export const renderAccountFeed = function() {
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
            <h1 class="title">Your Account</h1>
        </div>
        <br>
        <br>
        <div class="tile is-ancestor">
            <div class="tile is-child is-1"></div>
            <div class="tile is-child box" style="background-color:#209CEE;">
                <div>
                    <h1 class="title is-3" style="color:white;">Your Posts</h1>
                    <div class="box" id="createdThreadsFeed">
                    </div>
                </div>
            </div>
            <div class="tile is-child is-1"></div>
            <div class="tile is-child box" style="background-color:#209CEE;">
                <div>
                    <h1 class="title is-3" style="color:white;">Favorite Posts</h1>
                    <div class="box" id="SavedThreadsFeed">
                        
                    </div>
                </div>
            </div>
            <div class="tile is-child is-1"></div>
        </div>
    </section>
    `);
}

export const renderAccount = async function() {
   
    renderAccountFeed();
    const $favoriteFeed = $('#SavedThreadsFeed');
    
    let user = localStorage.getItem('loggedInUser');
    let url = 'http://localhost:3000/user/likedPosts' ;
    let jwt = localStorage.getItem('jwt');
     
    let threads = axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}`}
        }).then(function(response) {
            let threads = response.data.result;
            console.log(Object.keys(threads).length === 0 && threads.constructor === Object);

console.log(threads);

            if(Object.keys(threads).length === 0 && threads.constructor === Object){
                $favoriteFeed.empty();
                $favoriteFeed.append(`
                <h1 class="subtitle is-6"><strong>You haven't liked any posts</strong></h1>
                `);
            }else{
        
                $favoriteFeed.empty();
            url = 'http://localhost:3000/private/threads' ;

            let allThreads = axios.get(url, {
                headers: { Authorization: `Bearer ${jwt}`}
                }).then(function(response) {

                    let allThreads = response.data.result;
                    let userThreads;
                    let userTitles;
                    let userBodies;
                    for (let i in allThreads) {
                        for (let c in threads) {
                            if(i === c){
                                $favoriteFeed.append(`
                                         <div class="box" id="${i}">
                                            <h1 class="subtitle is-6"><strong>${allThreads[i]['title']}</strong></h1>
                                            <p>${allThreads[i]['body']}</p><br>
                                            <button class="button view-button">View</button>
                                        </div>
                                    `);
                           }
                        }
                    }
                }).catch(function(error) {

                    console.log(error + " hit when rendering saved feeds");
            });}

        }).catch(function(error) {
            console.log(error + " hit when rendering commentFeed");
    });

    const $createdThreads = $('#createdThreadsFeed');

    url = 'http://localhost:3000/user/myPosts'

    threads = axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}`}
        }).then(function(response) {
            let threads = response.data.result;


            if (Object.keys(threads).length === 0 && threads.constructor === Object){

                $createdThreads.empty();
                $createdThreads.append(`
                <h1 class="subtitle is-6"><strong>You haven't made any posts</strong></h1>
                `);
            } else {

                $createdThreads.empty();

        url = 'http://localhost:3000/private/threads' ;

        let allThreads = axios.get(url, {
            headers: { Authorization: `Bearer ${jwt}`}
            }).then(function(response) {
                let allThreads = response.data.result;
                for (let i in allThreads) {
                    for (let c in threads) {
                       if(i === c){
                             $createdThreads.append(`
                                <div class="box" id="${i}">
                                    <h1 class="subtitle is-6"><strong>${allThreads[i]['title']}</strong></h1>
                                    <p>${allThreads[i]['body']}</p><br>
                                    <button class="button view-button">View</button>
                                </div>
                            `);
                        }
                    }
                }
        }).catch(function(error) {

            console.log(error + " hit when rendering saved feeds");
    });};

}).catch(function(error) {
    console.log(error + " hit when rendering saved feeds");
});
}

export const renderSportsPage = function() {
    const $root = $('#root');
    $root.empty();

    $root.append(`
    <section class="hero is-info is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">426Sports</h1>
                <h1 class="subtitle">Upcoming events</h1>
            </div>
        </div>
    </section>
    <section>
        <button class="button back-button" style="margin-left:4%; margin-top:15px;">Back</button>
        <br>
        <br>
        <div style="margin-left: 4%; margin-top:15px; margin-right:4%">
            <h1 class="is-4 title">NFL</h1>
            <div class="box" id="nflGames">
                
            </div>
        </div>
        <br>
        <div style="margin-left: 4%; margin-top:15px;">
            <h1 class="is-4 title">NBA</h1>
            <div class="box" style="margin-right:4%" id="nbaGames">
            </div>
        </div>
        <br>
        <div style="margin-left: 4%; margin-top:15px;">
            <h1 class="is-4 title">NHL</h1>
            <div class="box" style="margin-right:4%" id="nhlGames">
            </div>
        </div>
        <br>
    </section>
    `);
    
    loadGames('nflGames', 4391);
    loadGames('nbaGames', 4387);
    //loadGames('mlbGames', 4424);
    loadGames('nhlGames', 4380);
    //loadGames('ncaafGames', 4479); 
}

export const loadGames = async function(id, leagueID) {
    let $gameID = $('#' + id);
    let url = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=' + leagueID;
    let result = await axios.get(url);

    let games = result.data.events;
    
    for(let i = 0; i < games.length; i++) {
        let date = new Date(games[i]['dateEventLocal']);

        let dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        
        let day = dates[date.getDay()];
        let month = date.getMonth()+1;
        let numDay = date.getDate();

        $gameID.append(`
        <div class="gameTime">
            <h3 class="subtitle is-6">${day} ${month}/${numDay}</h3>
        </div>
        <div>
            <h3 class="title is-5">${games[i]['strAwayTeam']} @ ${games[i]['strHomeTeam']}</h3>
        </div>
        <br>
        `);
    }
}

export const handleViewButtonEvent = function(event) {
    event.preventDefault();
    localStorage.setItem('currentViewingID', event.target.parentElement.id);
    renderPost();
}

export const handleBackButtonEvent = function(event) {
    event.preventDefault();
    
    localStorage.setItem('currentViewingID', null);

    window.location.replace("home.html");
}

export const handleAccountButtonEvent = function(event) {
    event.preventDefault();

    localStorage.setItem('currentViewingID', null);
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
                        <input class="input" type="text" id="newPostTitle" placeholder="Title" autocomplete="off"/>
                    </div>
                    <br>
                    <div class="select">
                        <select id="sportSelect">
                            <option value="NFL">NFL</option>
                            <option value="NBA">NBA</option>
                            <option value="MLB">MLB</option>
                            <option value="NHL">NHL</option>
                            <option value="NCAAM">NCAAM</option>
                            <option value="NCAAF">NCAAF</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <br>
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

export const handleReplySendButtonEvent = async function(event) {
    event.preventDefault();
    
    let jwt = localStorage.getItem('jwt');
    let user = localStorage.getItem('loggedInUser');
    let replyID = new Date().getTime(); 
    let parentID = event.target.parentElement.parentElement.id; 
    let reply = document.getElementById("replyBox").value;
    let url = 'http://localhost:3000/private/comments/' + replyID;

    axios.post(url, {
        data: {
            "parentID": parentID,
            "reply": reply,
            "author": user
        }
    },
        {
            headers: { Authorization: `Bearer ${jwt}`}
    }).then(function(response) {
        renderPost();
    }).catch(function(error) {
        console.log(error.response.data['msg']);
    });
}

export const handleSendNewThreadButton = async function(event) {
    event.preventDefault();

    let title = document.getElementById("newPostTitle").value;
    let body = document.getElementById("newPostBody").value;
    let postID = new Date().getTime();
    let url = 'http://localhost:3000/private/threads/' + postID;
    let sportTag = document.getElementById("sportSelect").value;
    let jwt = localStorage.getItem('jwt');
    let user = localStorage.getItem('loggedInUser');
    
    await axios.post(url, {
        data: {
          "title": title,
          "body": body,
          "author": user,
          "sportTag": sportTag
        } 
    },
    {
        headers: { Authorization: `Bearer ${jwt}`}
    }).then(function(response) {            
        localStorage.setItem('currentViewingID', postID);
        
        event.preventDefault();     
        renderPost();

    }).catch(function(error) {
        console.log(error.response.data['msg']);
    });

    url = 'http://localhost:3000/user/myPosts/' + postID;

    await axios.post(url, {
        data: body,
        "type": "merge"
    },
    {
        headers: { Authorization: `Bearer ${jwt}`},
    }).then(function(response) {
        console.log("adding post to user store");
    }).catch(function(error) {
        console.log(error + " when adding post to user store");
    });
}

export const getTitles = async function(event) {
    let url = 'http://localhost:3000/private/threads';

    let jwt = localStorage.getItem('jwt');
    
    let output = await axios.get(url,
    {
        headers: { Authorization: `Bearer ${jwt}`}
    }).then(function(response) {
        let titles = {};
        titles = response.data.result;
        return titles;   
    }).catch(function(error) {
        console.log(error + " hit when loading titles");       

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

export const handleFavoriteButtonEvent = async function(event) {
    event.preventDefault();

    const $button = $('#favoriteButton');

    $button.css("color", "red");

    $button.attr("class", "button unfavorite-button")
    $button.attr("id", "unfavoriteButton")

    let jwt = localStorage.getItem('jwt');
    let viewing = localStorage.getItem('currentViewingID');
    let url = 'http://localhost:3000/user/likedPosts/' + viewing;
    

    await axios.post(url, {
        data: "thread saved",
        "type": "merge"
    },
    {
        headers: { Authorization: `Bearer ${jwt}`}
    }).then(function(response) {
        console.log("thread saved");
    }).catch(function(error) {
        console(error + " when saving thread");
    });
}

export const handleUnfavoriteButtonEvent = function(event) {
    event.preventDefault();

    const $button = $('#unfavoriteButton');

    $button.css("color", "");

    $button.attr("class", "button favorite-button")
    $button.attr("id", "favoriteButton")

    let jwt = localStorage.getItem('jwt');
    let viewing = localStorage.getItem('currentViewingID');
    let url = 'http://localhost:3000/user/likedPosts/' + viewing;

    axios.delete(url, {headers: { Authorization: `Bearer ${jwt}`}});
}

export const handleSportsButtonEvent = function(event) {
    event.preventDefault();

    renderSportsPage();
}

export const handleLogoutButtonEvent = function(event) {
    event.preventDefault();

    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('currentViewingID', null);

    window.location.replace("index.html");
}

export const handleSubmitSearchButton = async function(event) {
    event.preventDefault();

    const $warn = $('#searchWarning');
    $warn.empty();

    let url = 'http://localhost:3000/private/threads';
    let jwt = localStorage.getItem('jwt');
    let search = document.getElementById('searchThread').value;

    let result = await axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}`}
    }).then(function(response) {
        let threads = response.data.result;
        
        let IDs = [];
        for(let i in threads) {
            IDs.push(i);
        }

        for(let i = 0; i < IDs.length; i++) {
            if(search == threads[IDs[i]]['title']) {
                localStorage.setItem('currentViewingID', IDs[i]);
                renderPost();
                break;
            }
        }

        let $threads = $('#threadFeed');
        $threads.prepend(`
            <div  id="searchWarning">
                <div class="box" style="width:39%; margin-left:30%; background-color:#B33A3A;">
                    <h1 class="title is-4" style="color:white;">A thread with that title was not found<h1>
                </div>
            <div>
        `);

        setTimeout(function() {
            const $warn = $('#searchWarning');
            $warn.empty();
        }, 3000);

    }).catch(function(error) {
        console.log(error + " hit when searching");
    });
}

export const handleEditButtonEvent = async function(event) {
    event.preventDefault();

    let viewing = localStorage.getItem('currentViewingID');
    let url = 'http://localhost:3000/user/myPosts/' + viewing;
    let jwt = localStorage.getItem('jwt');
    const $body = $('#bodyBox');

    await axios.get(url, {headers: { Authorization: `Bearer ${jwt}`}}, {data: "edited"}).
    then(function(response) {
        $body.replaceWith(`
        <textarea class="textarea" id="editBox">${response.data.result}</textarea>
        `);

        const $editDiv = $('#postBox');
        $editDiv.append(`
        <br>
        <div class="field is-grouped">
            <button class="button is-info is-outlined edit-send-button">Send</button>
            <button class="button is-danger edit-cancel-button">Cancel</button>
        </div>
        `);
    }).catch(function(error) {
        console.log(error + " when trying to edit")
    })  
}

export const handleEditSendEvent = async function(event) {
    let viewing = localStorage.getItem('currentViewingID');
    let url = 'http://localhost:3000/user/myPosts/' + viewing;
    let jwt = localStorage.getItem('jwt');
    let edited = document.getElementById('editBox').value;

    await axios.post(url, {
        data: edited,
    },
    {
        headers: { Authorization: `Bearer ${jwt}`},
    }).then(function(response) {
        console.log("adding post to user store");
    }).catch(function(error) {
        console.log(error + " when editing post to user store");
    });


    let url2 = 'http://localhost:3000/private/threads/' + viewing + '/body';
    await axios.post(url2, {
        data: edited,
    },
    {
        headers: { Authorization: `Bearer ${jwt}`},
    }).then(function(response) {
        renderPost();
    }).catch(function(error) {
        console.log(error + " when editing post to private store");
    });
}

export const handleEditCancelEvent = function(event) {
    event.preventDefault();

    renderPost();
}

export const handleDeleteButtonEvent = function(event) {
    event.preventDefault();

    let viewing = localStorage.getItem('currentViewingID');
    let url = 'http://localhost:3000/user/myPosts/' + viewing;
    let jwt = localStorage.getItem('jwt');

    axios.delete(url, {headers: { Authorization: `Bearer ${jwt}`}});

    let url2 = 'http://localhost:3000/private/threads/' + viewing;
    axios.delete(url2, {headers: { Authorization: `Bearer ${jwt}`}});
    
    localStorage.setItem('currentViewingID', null);
    renderSite();
}

$(async function() {
    if((localStorage.getItem('currentViewingID')).toString() != 'null'){
        renderPost();
    } else {
        renderSite();
    }

    const $root = $('#root');

    $root.on('click', '.view-button', handleViewButtonEvent);

    $root.on('click', '.back-button', handleBackButtonEvent);

    $root.on('click', '.account-button', handleAccountButtonEvent);

    $root.on('click', '.new-thread-button', handleNewThreadButton);

    $root.on('click', '.send-new-thread-button', handleSendNewThreadButton);

    $root.on('click', '.reply-button', handleReplySendButtonEvent);

    $root.on('click', '.favorite-button', handleFavoriteButtonEvent);

    $root.on('click', '.unfavorite-button', handleUnfavoriteButtonEvent);

    $root.on('click', '.sports-button', handleSportsButtonEvent);

    $root.on('click', '.logout-button', handleLogoutButtonEvent);

    $root.on('click', '.submit-search-button', handleSubmitSearchButton);

    $root.on('click', '.edit-button', handleEditButtonEvent);

    $root.on('click', '.delete-button', handleDeleteButtonEvent);

    $root.on('click', '.edit-send-button', handleEditSendEvent);

    $root.on('click', '.edit-cancel-button', handleEditCancelEvent); 

    let titles  = await getTitles();

    if((localStorage.getItem('currentViewingID')).toString() == 'null'){
        autocomplete(document.getElementById("searchThread"), titles);
    }

});
