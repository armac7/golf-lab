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
                    <div class="col-md-4 d-flex">
                        <div class="card w-100 mt-4"  id="${o.id}">
                            <div class="card-body">
                                <h5 class="card-title">${o.game_name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${o.contributor}</h6>
                                <p class="card-text">${o.desc}</p>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#generalModal"
                                onclick="rebuildIframe('${o.id}')">
                                 PLAY GAME
                                </button>
                                <button class="btn btn-primary" onclick="window.open('${o.repo}','_blank')">GAME REPO</button>
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