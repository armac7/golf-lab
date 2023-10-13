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
                let card = `
<<<<<<< Updated upstream
                    <div class="col-md-3">
                        <div class="card" style="width: 100%;" id="${o.id}">
                            <div class="card-body">
                                <h5 class="card-title">${o.game_name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${o.contributor}</h6>
                                <p class="card-text">${o.desc}</p>
                                <button class="btn btn-primary" onclick="window.open('${o.game}','_blank')">GAME LINK</button>
                                <button class="btn btn-primary" onclick="window.open('${o.repo}','_blank')">GAME REPO</button>
=======
                    <div class="col-md-12 d-flex">
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
>>>>>>> Stashed changes
                            </div>
                        </div>
                    </div>
                `;
                index++;
                $("#games").append(card);
            })
        });
}
