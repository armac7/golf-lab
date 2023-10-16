// TODO: put a header here
const DELTA_DEFAULT_SHOW = 3;
const CHARLIE_DEFAULT_SHOW = 23;
/*
* Constants used to dictate how many games are shown per section on site
* DELTA_DEFAULT_SHOW dictates "Most Popular"
* CHARLIE_DEFAULT_SHOW dictates "Trending"
* The int dictates after what index of "game_info.json" to start hiding games per section.
*/
const visibility = {
    // visibility of sections, [0] == "true" currently means "collapsed".
    "Delta": [true, DELTA_DEFAULT_SHOW],
    "Charlie": [true, CHARLIE_DEFAULT_SHOW]
};

$('document').ready(function () {
    fetchGames();
});

function buildCard(dir, o) {
    /**
     * [Builds the card using the agreed-upon html/css.]
     * @param o [JSON object]
     * @param dir [directory for thumbnail relative to index.html]
     * @returns [string representation of html for card]
     */
    let card = `
    <div class="col-md-12 mt-3" id="${o.id}Container">
        <div class="row" id="${o.id}">
            <div class="col-md-3">
                <img class="img-fluid game-icon" src="${dir}/${o.id}-preview.png">
            </div>
            <div class="col-md-9">
                <div class="card w-100 h-80">
                    <div class="card-body">
                        <h5 class="card-title" style="color: #29bffd; font-weight: 700;">${o.gameName}</h5>
                        <h6 class="card-subtitle">${o.contributor}</h6>
                        <p class="card-text mt-1">${o.desc}</p>
                        <button type="button" class="btn btn-secondary mb-2" data-bs-toggle="modal" data-bs-target="#generalModal"
                        onclick="rebuildIframe('${o.id}')">
                            PLAY GAME
                        </button>
                        <button class="btn btn-secondary mb-2" onclick="window.open('${o.repo}','_blank')">GAME REPO</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
    return card;
};

function fetchGames() {
    /**
     * [Fetches games from "game_info.json", calls "buildCard", and appends the card to appropriate section based on object ID.]
     */
    fetch("./lib/game_info.json")
        .then(response => response.json())
        .then(data => {
            let index = 0;
            data.forEach(section => {
                let o = data[index];
                //console.log("IN FETCH: " + o.id); //debug method

                // used to see if id of current object is -delta or -charlie
                let includesDelta = (o.id).includes("-delta");
                let includesCharlie = (o.id).includes("-charlie");

                let card;
                if (includesDelta) {
                    card = buildCard("./styles/imgs/game-icons/delta", o);
                    $("#delta-games").append(card);
                } else if (includesCharlie) {
                    card = buildCard("./styles/imgs/game-icons/charlie", o);
                    $("#charlie-games").append(card);
                };


                //  if index is greater than the default amount shown, append the appropriate "hidden" class to the card's container.
                if (includesDelta && index > DELTA_DEFAULT_SHOW) {
                    $(`#${o.id}Container`).addClass("hiddenDelta") //add hiddenDelta / hiddenCharlie
                };
                if (includesCharlie && index > CHARLIE_DEFAULT_SHOW) {
                    $(`#${o.id}Container`).addClass("hiddenCharlie") //add hiddenDelta / hiddenCharlie
                };
                index++;
            });
        });
}

function rebuildIframe(id) {
    /**
     * [Rebuilds the Iframe to update the current game appearing inside of it when "Play Game" is pressed.]
     * @param id [ID of game to be loaded in the modal.]
     */

    //console.log(id) //debug method
    // Checks the id of each object to find a match, then updates iframe to match content.
    fetch("./lib/game_info.json")
        .then(response => response.json())
        .then(data => {
            let index = 0;
            data.forEach(section => {
                let o = data[index];
                // If id is found, update iframe and label of modal.
                if (o.id === id) {
                    $('#gameFrame').attr('src', o.game);
                    $('#generalModalLabel').html(o.gameName);
                };
                index++;
            });
        });
}

function toggleExpandAndUpdateText(buttonId, sectionName) {
    /**
     * [Shows or hides games based on whether the assoc. section is currently expanded or not.
     * Called when the "see all" button is clicked.]
     * @param buttonId [the DOM ID of the clicked element ]
     * @param sectionName [the name of the section to toggle visibility on]
     */
    // isCollapsed = current visibility of section we're toggling
    isCollapsed = visibility[sectionName][0]
    className = ".hidden" + sectionName // DOM class name
    if (isCollapsed) {
        $(className).css("display", "inline-block");
        $("#" + buttonId).html("Hide Games &lt&lt&lt");
        isCollapsed = false;
    } else if (!isCollapsed) {
        $(className).css("display", "none");
        $("#" + buttonId).html("See All &gt&gt&gt");
        isCollapsed = true;
    }
    // ensure these two are the same value
    visibility[sectionName][0] = isCollapsed;
    // console.log(isCollapsed,visibility[sectionName][0]); // check
}

