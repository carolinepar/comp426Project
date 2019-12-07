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
            <h1 class="title" style="color:white;">Threads</h1>
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
        <button class="button back-button" style="margin-left:4%; margin-top:15px;">Back</button>
        <br>
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
            <button class="button is-info" style="margin-top: 5px;">Send</button>
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

    //make render functions
}

export async function renderFeed() {
    const $threads = $('#threadFeed');
    //make axios call to get all the threads, loop through and append to the threadFeed div
}

export async function renderComments() {
    const $comments = $('#commentFeed');
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

$(function() {
    renderSite();

    const $root = $('#root');

    $root.on('click', '.view-button', handleViewButtonEvent);

    $root.on('click', '.back-button', handleBackButtonEvent);

    $root.on('click', '.account-button', handleAccountButtonEvent);
});