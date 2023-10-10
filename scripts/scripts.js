$('document').ready(function(){
    fetchGames();
});

function fetchGames() {
    fetch("../libs/game_info.json")
        .then(response => response.json())
        .then(data => {
            let index = 0;
            data.forEach(section => {
                let o = data[index];
                let card = `
                    <div class="col-md-2">
                        <div class="card mx-2" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${o.game_name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${o.contributor}</h6>
                                <p class="card-text">${o.desc}</p>
                                <button class="btn btn-primary" onclick="window.open('${o.game}','_blank')>GAME LINK</button>
                                <button class="btn btn-primary" onclick="window.open('${o.repo}','_blank')>GAME REPO</button>
                            </div>
                        </div>
                    </div>
                `;
                index++;
                $("#games").append(card);
            })
        });
}