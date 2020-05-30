function createSquare( square1, square2 ){

    function initializeStatus( variable, value ){

        square[variable] = value;

    }

    function generateColor( maxHunger, speed, range ){

        color = 'rgb(';

        color += Math.abs(maxHunger/500*80)+',';
        color += Math.abs(speed/30*80)+',';
        color += Math.abs( range/300*80 )+')';

    }

    function reproduce( square1, square2 ){

        const genes1 = [ square1.maxHunger, square1.speed, square1.range, square1.minHunger ];
        const genes2 = [ square2.maxHunger, square2.speed, square2.range, square1.minHunger ];

        if ( Math.random() > 0.5 ) maxHunger = genes1[0]
        else maxHunger = genes2[0];
        if ( Math.random() < 0.5 ) speed = genes1[1]
        else speed = genes2[1];
        if ( Math.random() > 0.5 ) range = genes1[2]
        else range = genes2[2];
        if ( Math.random() > 0.5 ) minHunger = genes1[3]
        else minHunger = genes2[3];

        if ( Math.random() > 0.5 ) maxHunger -= Math.floor( Math.random()*100 );
        else maxHunger += Math.floor( Math.random()*100 );
        if ( Math.random() > 0.5 ) speed -= Math.floor( Math.random()*10 );
        else speed += Math.floor( Math.random()*10 );
        if ( Math.random() > 0.5 ) range -= Math.floor( Math.random()*100 );
        else range += Math.floor( Math.random()*100 );
        if ( Math.random() > 0.5 ) minHunger -= Math.floor( Math.random()*100 );
        else minHunger += Math.floor( Math.random()*100 );

        x = square1.x;
        y = square1.y;

        square1.reproduction = 0;
        square2.reproduction = 0;

    }




    const id = getNewId( 's' );
    let x = Math.floor( Math.random( )*globalConstants.display.w );
    let y = Math.floor( Math.random( )*globalConstants.display.h );

    let color = 'black';
    let gender = '';
    let maxHunger = 500;
    let minHunger = 0;
    let speed = 30;
    let range = 150;
    const w = 100+minHunger*2;
    const h = 100+minHunger*2;
    if ( Math.random() > 0.5 ) gender = 'male'
    else gender = 'female';

    if ( square1 != undefined && square2 != undefined ) reproduce(square1, square2);

    generateColor(maxHunger, speed, range);

    const radar = createRadar( id, x+w/2, y+h/2, range );

    const square = createPhysicalObject( id, color, x, y, w, h, false, true );

    radar.square = square;

    initializeStatus( 'speed', speed );       //gene 1 - green
    initializeStatus( 'range', range );     //gene 2 - blue
    initializeStatus( 'maxHunger', maxHunger );  //gene 3 - red
    initializeStatus( 'minHunger', minHunger );  //gene 4 - size
    initializeStatus( 'hunger', 0 );
    initializeStatus( 'reproduction', 0 );
    initializeStatus( 'gender', gender );
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

        if ( square.vx == 0 || square.vy == 0 ){

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
        else if ( obj.objectType == 'square' ){

            if ( square.gender != obj.gender && square.hunger < 250 && obj.hunger < 250 && square.reproduction >= 100 && obj.reproduction >= 100 ){

                const CA = square.radar.x - obj.radar.x;
                const CO = square.radar.y - obj.radar.y;
                const distance = Math.sqrt( Math.pow( CA, 2 ) + Math.pow( CO, 2 ) );

                if ( distance <= 250 ){

                    if ( square.gender == 'female' ) createSquare( square, obj );

                }
                else{

                    const v = square.speed;
                    const cos = CA/distance;
                    const sin = CO/distance;

                    square.vx = -cos*v*0.8; 
                    square.vy = sin*v*0.8;

                }

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

    if (square.hunger >= 20 ){
        square.hunger -= 200;
        delete physicalObjects[fruit.name];
        square.situation = 'searching';
        if ( square.hunger < -square.minHunger ) square.hunger = -square.minHunger;
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

            if ( square.reproduction < 100 ) square.reproduction++;

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