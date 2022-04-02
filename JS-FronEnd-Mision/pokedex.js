const pokeNameInput = document.getElementById("pokeName");

pokeNameInput.addEventListener("keyup", (event) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      fetchPokemon();
    }
});

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    if(pokeName != ""){
        pokeName = pokeName.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
        fetch(url).then((res) => {
            if (res.status != "200") {
                console.log(res);
                pokeImage("./pokeball.png")
            }
            else {
                return res.json();
            }
        }).then((data) => {
            if (data) {
                console.log(data);
                let pokeImg = data.sprites.other["official-artwork"]["front_default"];
                pokeImage(pokeImg);
                let id = ('00' + data.id).slice(-3);
                let weight = data.weight;
                pokeWeight(weight);
                let height = data.height;
                pokeHeight(height);
                let types = data.types;
                pokeType(types);
                let stats = data.stats;
                pokeStats(stats);
                console.log(data);
            }
        });
    }
}

const pokeStats = (stats) => {
    const typeInput = document.getElementById("pokeStats");
    const typeNameInput = document.getElementById("pokeStatsName");
    let typeInnerHTML = ``;
    let typeNameInnerHTML = ``;
    let noStats = 12/stats.length;
    for(let index in stats){
        typeInnerHTML += `<div class="col-${noStats} pokeStatsDiv">${stats[index]["base_stat"]}</div>`;
        typeNameInnerHTML += `<div class="col-${noStats} pokeStatsNameDiv">${statsNameFormat(stats[index]["stat"]["name"])}</div>`;
    }
    typeInput.innerHTML = typeInnerHTML;
    typeNameInput.innerHTML = typeNameInnerHTML;
}

const statsNameFormat = (stat) => {
    return stat.replaceAll("-"," ").replaceAll("hp","ps").replaceAll("defense","def").replaceAll("attack","atk").replaceAll("special ","sp.").toUpperCase();
}
const pokeType = (types) => {
    const typeInput = document.getElementById("pokeType");
    typeInput.innerHTML = `Tipo: `;
    for(let index in types){
        typeInput.innerHTML += `${types[index]["type"]["name"]} `;
    }
}

const pokeHeight = (height) => {
    const heightInput = document.getElementById("pokeHeight");
    heightInput.innerHTML = `Altura: ${height} kg`;
}

const pokeWeight = (weight) => {
    const weightInput = document.getElementById("pokeWeight");
    weightInput.innerHTML = `Peso: ${weight} cm`;
}

const pokeImage = (url) => {
    const photoInput = document.getElementById("pokeImg");
    photoInput.src = url;
}

