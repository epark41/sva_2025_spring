let data;

function preload(){
   data = loadJSON('./data.json');
}

function setup() {
   createCanvas(600,600);
   textSize(20);
}


function draw() {

    background(175);
    let y = 100;
    /*const stations = data.stations.filter(s=>
     s.borough === "Queens"
    );*/
    let stations = data.stations;
    stations = stations.sort((a,b)=> a.rank - b.rank);
    stations.forEach ((station,i) =>{
        const name = station.name;
        text(name,100,y+i*25);
    });
    /*for(let i = 0; i < stations.length; i++){
        const station = stations[i];
        const name = station.name;
        text(name,100,y+i*25);
    }*/

}

