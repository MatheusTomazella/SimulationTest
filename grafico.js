const graficoHungerCanvas = document.getElementById( "hunger" )
const w = 300*5, h = 150;
graficoHungerCanvas.width = w;
graficoHungerCanvas.height = h;
const graficoHunger = graficoHungerCanvas.getContext("2d");

const labelHunger = document.getElementById("hungerValue");

const graficoPopCanvas = document.getElementById( "population" )
graficoPopCanvas.width = w;
graficoPopCanvas.height = h;
const graficoPop = graficoPopCanvas.getContext("2d");

const labelPop = document.getElementById("populationValue");



let quadradosCriados = 0;
let quadradosMortos = 0;
let quadradosAtualmente = 0;
let frutasCriadas = 0;
let frutasComidas = 0;



let graficoX = 0;

function addPoint( ){

    let n = 0;
    let hunger = 0;

    for ( let i in physicalObjects ){

        const square = physicalObjects[i];

        if ( square.objectType == 'square' ){

            hunger += square.hunger;
            n++

        }

    }

    hunger /= n;
    labelHunger.innerText = hunger.toFixed(2);
    hunger = hunger*h/maxHunger;

    graficoHunger.fillStyle = 'white';
    graficoHunger.fillRect(0,0,w,h);

    graficoHunger.stroke();
    graficoHunger.lineWidth = 5;
    
    graficoHunger.lineTo( graficoX, h-hunger );


    graficoPop.fillStyle = 'white';
    graficoPop.fillRect(0,0,w,h);

    graficoPop.stroke();
    graficoPop.lineWidth = 5;
    
    const ny = n*h/50;
    graficoPop.lineTo( graficoX, h-ny );
    labelPop.innerText = n;


    graficoX++

    if ( graficoX >= w || hunger >= h ){

        graficoHunger.closePath();
        graficoHunger.beginPath();
        graficoPop.closePath();
        graficoPop.beginPath();
        graficoX = 0;

    }

}

addPoint();