export const renderSite = function() {
    const $root = $('#root');
    $root.append(`
    <section class="hero is-info is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">426Sports</h1>
                <!--<h2 class="subtitle">Forums</h2>-->
            </div>
        </div>
    </section>
    <section class="section">
        <div>
            <div class="control">
                    <input class="input" type="text" placeholder="Search threads">
            </div>
        </div>
        <div class="box">
            <h1 class="title">Threads</h1>
            <div id="threadFeed">
                <div class="box">
                    <h3 class="title is-4">Post Title</h3>
                    <h5 class="subtitle is-6">Author</h5>
                    <button class="button">View</button>
                </div>
                <div class="box">
                    <h3>Post Title</h3>
                    <h5>Author</h5>
                </div>
            </div>
        </div>
    </section>
    `);
    renderFeed();
}

export async function renderFeed() {
    const $threadFeed = $('#threadFeed');
    //make axios call to get all the threads, loop through and append to the threadFeed div
}

$(function() {
    renderSite();
});