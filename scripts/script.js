let displayDeltaCheck = 0;
let displayCharlieCheck = 0;
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

/* if someone wants they can figure out how to refactor buildCard and 
 * fetchGames so we don't have duplicate functions that differ only in
 * a few hard-coded strings like hiddenDelta/hiddenCharlie and filepaths
 */
function fetchGames() {
    fetch("./lib/delta_info.json")
        .then(response => response.json())
        .then(data => {
            let index = 0;
            data.forEach(section => {
                let o = data[index];
                //console.log("IN FETCH: " + o.id); //debug method

                let delta_card;
                delta_card = buildCard("./styles/imgs/game-icons/delta", o);

                $("#delta-games").append(delta_card);
                // use class to hide remaining games
                if (index > 3) {
                    $(`#${o.id}Container`).addClass("hiddenDelta") //add hiddenDelta / hiddenCharlie
                };
                index++;
            });
        });

    fetch("./lib/charlie_info.json")
        .then(response => response.json())
        .then(data => {
            let index = 0;
            data.forEach(section => {
                let o = data[index];
                //console.log("IN FETCH: " + o.id); //debug method
                let charlie_card;
                charlie_card = buildCard("./styles/imgs/game-icons/charlie", o);

                $("#charlie-games").append(charlie_card);

                // add class to hide remaining games
                if (index > 3) {
                    $(`#${o.id}Container`).addClass("hiddenCharlie") //add hiddenCharlie
                };
                index++;

            });
        });
}
function rebuildIframe(id) {
    //console.log(id) //debug method
    // Checks the id of each object to find a match, then updates iframe to match content.
    fetch("./lib/delta_info.json")
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

    fetch("./lib/charlie_info.json")
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
function showHideDelta() {
    if (displayDeltaCheck == 0) {
        $(".hiddenDelta").css("display", "inline-block");
        $("#deltaShowHide").html("Hide Games &lt&lt&lt");
        displayDeltaCheck++;
    } else if (displayDeltaCheck == 1) {
        $(".hiddenDelta").css("display", "none");
        $("#deltaShowHide").html("See All &gt&gt&gt");
        displayDeltaCheck--;
    }
}

function showHideCharlie() {
    if (displayCharlieCheck == 0) {
        $(".hiddenCharlie").css("display", "inline-block");
        $("#charlieShowHide").html("Hide Games &lt&lt&lt");
        displayCharlieCheck++;
    } else if (displayCharlieCheck == 1) {
        $(".hiddenCharlie").css("display", "none");
        $("#charlieShowHide").html("See All &gt&gt&gt");
        displayCharlieCheck--;
    }
}
