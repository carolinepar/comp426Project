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
                <div class="control">
                        <input class="input" type="text" placeholder="Search threads">
                </div>
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
    let body = document.getElementById("newPostBody").value;
    let postID = "3";
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
        console.log("thread stored in privateStore");
        //go to post page once posted   
    }).catch(function(error) {
        //post doesn't get sent to dataStore
        //what errors could there be (no title? no body?)
        alert("error hit");
    });

    //renderSite();
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

$(function() {
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
});