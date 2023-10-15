let displayDeltaCheck = 0;
let displayCharlieCheck = 0;
$('document').ready(function () {
    fetchGames();
});

function fetchGames() {
    fetch("./lib/delta_info.json")
        .then(response => response.json())
        .then(data => {
            let index = 0;
            data.forEach(section => {
                let o = data[index];
                //console.log("IN FETCH: " + o.id); //debug method
                let delta_card;
                if (index < 4) {
                    delta_card = `
                        <div class="col-md-12 mt-3">
                            <div class="row">
                                <div class="col-md-3">
                                    <img class="img-fluid game-icon" src="./styles/imgs/game-icons/delta/${o.id}-preview.png">
                                </div>
                                <div class="col-md-9">
                                    <div class="card w-100 h-80">
                                        <div class="card-body">
                                            <h5 class="card-title" style="color: #29bffd; font-weight: 700;">${o.game_name}</h5>
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
                } else {
                    delta_card = `
                        <div class="col-md-12 mt-3 hiddenDelta">
                            <div class="row">
                                <div class="col-md-3">
                                    <img class="img-fluid game-icon" src="./styles/imgs/game-icons/delta/${o.id}-preview.png">
                                </div>
                                <div class="col-md-9">
                                    <div class="card w-100 h-80">
                                        <div class="card-body">
                                            <h5 class="card-title" style="color: #29bffd; font-weight: 700;">${o.game_name}</h5>
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
                }
                index++;
                $("#delta-games").append(delta_card);
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
                if (index < 4) {
                    charlie_card = `
                        <div class="col-md-12 mt-3">
                            <div class="row" id="${o.id}">
                                <div class="col-md-3">
                                    <img class="img-fluid game-icon" src="./styles/imgs/game-icons/charlie/${o.id}-preview.png">
                                </div>
                                <div class="col-md-9">
                                    <div class="card w-100 h-80">
                                        <div class="card-body">
                                            <h5 class="card-title" style="color: #29bffd; font-weight: 700;">${o.game_name}</h5>
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
                } else {
                    charlie_card = `
                        <div class="col-md-12 mt-3 hiddenCharlie">
                            <div class="row" id="${o.id}">
                                <div class="col-md-3">
                                    <img class="img-fluid game-icon" src="./styles/imgs/game-icons/charlie/${o.id}-preview.png">
                                </div>
                                <div class="col-md-9">
                                    <div class="card w-100 h-80">
                                        <div class="card-body">
                                            <h5 class="card-title" style="color: #29bffd; font-weight: 700;">${o.game_name}</h5>
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
                }
                index++;
                $("#charlie-games").append(charlie_card);
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
                    $('#generalModalLabel').html(o.game_name);
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
                    $('#generalModalLabel').html(o.game_name);
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
