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


const graficoMaxHungerCanvas = document.getElementById( "maxHunger" )
graficoMaxHungerCanvas.width = w;
graficoMaxHungerCanvas.height = h;
const graficoMaxHunger = graficoMaxHungerCanvas.getContext("2d");

const labelMaxHunger = document.getElementById("maxHungerValue");


const graficoSpeedCanvas = document.getElementById( "speed" )
graficoSpeedCanvas.width = w;
graficoSpeedCanvas.height = h;
const graficoSpeed = graficoSpeedCanvas.getContext("2d");

const labelSpeed = document.getElementById("speedValue");


const graficoRangeCanvas = document.getElementById( "range" )
graficoRangeCanvas.width = w;
graficoRangeCanvas.height = h;
const graficoRange = graficoRangeCanvas.getContext("2d");

const labelRange = document.getElementById("rangeValue");


const graficoMinHungerCanvas = document.getElementById( "minHunger" )
graficoMinHungerCanvas.width = w;
graficoMinHungerCanvas.height = h;
const graficoMinHunger = graficoMinHungerCanvas.getContext("2d");

const labelMinHunger = document.getElementById("minHungerValue");


const labelMale = document.getElementById("genderMale");
const labelFemale = document.getElementById("genderFemale");

const fruitSpawnRateSlider = document.getElementById( "fruitSpawnRate" );
let fruitSpawnRateMultiplier = fruitSpawnRateSlider.value;
const fruitSpawnRateValue = document.getElementById( "fruitSpawnRateValue" );


let graficoX = 0;
let genesX = 0;
let genesTimer = 0;
let n = 0;
let male = 0;
let female = 0;

function addPoint( ){

    n = 0;
    let hunger = 0;
    let speed = 0;
    let MmaxHunger = 0;
    let range = 0;
    let minHunger = 0;
    male = 0;
    female = 0;

    for ( let i in physicalObjects ){

        const square = physicalObjects[i];

        if ( square.objectType == 'square' ){

            n++
            hunger += square.hunger;
            speed += square.speed;
            MmaxHunger += square.maxHunger;
            range += square.range;
            minHunger += square.minHunger;
            if ( square.gender == 'male' ) male++
            else if ( square.gender == 'female' ) female++;

        }

    }

    fruitSpawnRateMultiplier = fruitSpawnRateSlider.value;
    fruitSpawnRateValue.innerText = (100/(n*fruitSpawnRateMultiplier)).toFixed(1)+'% chance fruit/frame';
    fruitSpawnRate = n*fruitSpawnRateMultiplier;


    graficoHunger.strokeStyle = 'black';
    graficoHunger.lineWidth = 5;
    graficoHunger.fillStyle = 'white';
    graficoHunger.fillRect(0,0,w,h);
    graficoHunger.stroke();

    graficoPop.strokeStyle = 'black';
    graficoPop.lineWidth = 5;
    graficoPop.fillStyle = 'white';
    graficoPop.fillRect(0,0,w,h);
    graficoPop.stroke();

    graficoMaxHunger.strokeStyle = 'black';
    graficoMaxHunger.lineWidth = 5;
    graficoMaxHunger.fillStyle = 'white';
    graficoMaxHunger.fillRect(0,0,w,h);
    graficoMaxHunger.stroke();

    graficoSpeed.strokeStyle = 'black';
    graficoSpeed.lineWidth = 5;
    graficoSpeed.fillStyle = 'white';
    graficoSpeed.fillRect(0,0,w,h);
    graficoSpeed.stroke();

    graficoRange.strokeStyle = 'black';
    graficoRange.lineWidth = 5;
    graficoRange.fillStyle = 'white';
    graficoRange.fillRect(0,0,w,h);
    graficoRange.stroke();

    graficoMinHunger.strokeStyle = 'black';
    graficoMinHunger.lineWidth = 5;
    graficoMinHunger.fillStyle = 'white';
    graficoMinHunger.fillRect(0,0,w,h);
    graficoMinHunger.stroke();


    hunger /= n;
    labelHunger.innerText = 'Hunger: ' + hunger.toFixed(1);
    hunger = hunger*h/maxHunger;
    graficoHunger.lineTo( graficoX, h-hunger );
    
    const ny = n*h/80;
    graficoPop.lineTo( graficoX, h-ny );
    labelPop.innerText = 'n: ' + n;

    MmaxHunger /= n;
    labelMaxHunger.innerText = 'MaxHunger: ' + MmaxHunger.toFixed(1);

    speed /= n;
    labelSpeed.innerText = 'Speed: ' + speed.toFixed(1);

    range /= n;
    labelRange.innerText = 'Range: ' + range.toFixed(1);

    minHunger /= n;
    labelMinHunger.innerText = 'MinHunger: ' + minHunger.toFixed(1);

    if ( genesTimer >= 10 ){
        
        MmaxHunger = MmaxHunger*h/2000;
        graficoMaxHunger.lineTo( genesX, h-MmaxHunger );
        speed = speed*h/150;
        graficoSpeed.lineTo( genesX, h-speed );
        range = range*h/1000;
        graficoRange.lineTo( genesX, h-range);
        minHunger = minHunger*h/500+50;
        graficoMinHunger.lineTo( genesX, h-minHunger );
        
        genesX++;
        genesTimer = 0;
    }
    genesTimer++;

    labelMale.innerText = 'Male: ' + male;
    labelFemale.innerText = "Female: " + female;


    graficoX++

    if ( graficoX >= w ){

        graficoHunger.closePath();
        graficoHunger.beginPath();
        graficoPop.closePath();
        graficoPop.beginPath();
        
        graficoX = 0;
    }
    if ( genesX >= w ){

        graficoMaxHunger.closePath();
        graficoMaxHunger.beginPath();
        graficoSpeed.closePath();
        graficoSpeed.beginPath();
        graficoRange.closePath();
        graficoRange.beginPath();
        graficoMinHunger.closePath();
        graficoMinHunger.beginPath();

        genesX = 0;
    }

}

addPoint();