function createSquare( ){

    function generateColor( maxHunger, speed, range ){

        function RGBtoHEX(rgb) { 
            var hex = Number(rgb).toString(16);
            if (hex.length < 2) {
                    hex = "0" + hex;
            }
            return hex;
        };

        function format( comp ){

            if ( comp.length < 3 ) comp = '0'+comp;
            if ( comp.length < 3 ) comp = '0'+comp;

            return comp;
        }

        let color = '';

        color += format(maxHunger/500*3);
        color += format(speed/50*3);
        color += format( range/100*3 );

    }

    const id = getNewId( 's' );
    const x = Math.floor( Math.random( )*globalConstants.display.w );
    const y = Math.floor( Math.random( )*globalConstants.display.h );
    const w = 100;
    const h = 100;
    const range = 500;
    const radar = createRadar( id, x+w/2, y+h/2, range );

    function randomColor(){

        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const color = randomColor();

    const square = createPhysicalObject( id, color, x, y, w, h, false, true );

    radar.square = square;

    function initializeStatus( variable, value ){

        square[variable] = value;

    }

    initializeStatus( 'speed', 100 );       //gene 1 - green
    initializeStatus( 'range', range );     //gene 2 - blue
    initializeStatus( 'maxHunger', 1000 );  //gene 3 - red
    initializeStatus( 'hunger', 0 );
    initializeStatus( 'reproduction', 0 );
    initializeStatus( 'fruit', undefined );
    initializeStatus( 'radar', radar );
    initializeStatus( 'objectType', 'square' );
    initializeStatus( 'situation', 'searching' );

    return square;
}

function think( square, object ){

    const functions = {

        going: goEat,
        searching: search

    }

    function goEat( square ){

        if ( physicalObjects[square.fruit] == undefined || square.hunger < 20 ){

            situation = "searching";
            square.fruit = undefined;

        }
        else{

            const v = square.speed;
            const fruit = physicalObjects[ square.fruit ];
            const radar = physicalObjects[ 'radar'+square.name ];

            if ( radar != undefined && fruit != undefined ){

                const CA = radar.x - fruit.x;
                const CO = radar.y - fruit.y;
                const distance = Math.sqrt( Math.pow( CA, 2 ) + Math.pow( CO, 2 ) );
                const cos = CA/distance;
                const sin = CO/distance;

                square.vx = -cos*v; 
                square.vy = sin*v;
            }

        }

    }

    function search( square ){

        if ( square.vx == 0 && square.vy == 0 ){

            randomDirection(square);

        }

    }

    function decide( square, obj ){
    
        if ( obj.objectType == 'fruit' ){

            if ( square.situation == "going" && square.fruit != undefined ){

                const fruit = physicalObjects[ square.fruit ];
                if ( fruit != obj ){

                    const distanceCurrentFruit = Math.sqrt( Math.pow( (square.radar.x - square.fruit.x), 2 ) + Math.pow( (square.radar.y - square.fruit.y), 2 ) );
                    const distanceNewFruit = Math.sqrt( Math.pow( (square.radar.x - obj.x), 2 ) + Math.pow( (square.radar.y - obj.y), 2 ) );

                    if ( distanceNewFruit < distanceCurrentFruit ) square.fruit = obj;

                }

            }
            else{

                square.fruit = obj.name;
                square.situation = 'going';

            }

        }

    }

    function act( square ){

        const situation = square.situation;
 
        functions[ situation ](square);

    }

    if ( square == undefined ){

        for ( let i in physicalObjects ){

            if ( physicalObjects[i].objectType == "square" ){

                const square = physicalObjects[i];

                act(square);

            }

        }

    }
    else{

        decide( square, object );
        act(square);

    }

}

function eatFruit( square, fruit ){

    if (square.hunger >= 20){
        square.hunger = 0;
        delete physicalObjects[fruit.name];
        square.situation = 'searching';
    }
}

const maxHunger = 1000;
function status(){

    for ( let i in physicalObjects ){

        const square = physicalObjects[i]

        if ( square.objectType == 'square' ){

            if ( square.hunger >= square.maxHunger ){ 
                
                die(square);

            }
            else square.hunger ++

        }

    }

}

function die( square ){

    for ( let j in physicalObjects ){

        if ( square.radar == physicalObjects[j] )
            delete physicalObjects[j];

    }

    for ( let j in physicalObjects ){

        if ( square == physicalObjects[j] )
            delete physicalObjects[j];

    }

}

function randomDirection(square){

    const v = square.speed

    const CA = Math.floor( Math.random()*5 );
    const CO = Math.floor( Math.random()*5 );
    const distance = Math.sqrt( Math.pow( CA, 2 ) + Math.pow( CO, 2 ) );
    const cos = CA/distance;
    const sin = CO/distance;

    square.vx = -cos*v; 
    square.vy = sin*v;

    if ( Math.random() > 0.5 ){

        if ( Math.random() > 0.5 ) 
        square.vx *= -1;
        else square.vy *= -1;

    }

}