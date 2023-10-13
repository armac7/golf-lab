$('document').ready(function () {
    fetchGames();
});

function fetchGames() {
    fetch("./lib/game_info.json")
        .then(response => response.json())
        .then(data => {
            let index = 0;
            data.forEach(section => {
                let o = data[index];
                //console.log("IN FETCH: " + o.id); //debug method
                let card = `
                <div class="col-md-12 mt-3 d-flex">
                    <div class="row">
                        <div class="col-md-3 justify-content-center">
                            <img class="img-fluid game-icon" src="./styles/imgs/game-icons/${o.id}-preview.png">
                        </div>
                        <div class="col-md-9">
                            <div class="card w-100 h-80"  id="${o.id}">
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
                index++;
                $("#games").append(card);
            });
        });
}
function rebuildIframe(id) {
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
                    $('#generalModalLabel').html(o.game_name);
                };
                index++;
            });
        });

}
