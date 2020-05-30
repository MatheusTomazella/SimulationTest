class Square{

    constructor( ){

        let id = 1;

        while( id < 100 ){

            if ( 's'+id in physicalObjects ){

                id++
                continue;

            }
            else{

                id = 's'+id;
                break;

            }

        }

        this.x = parseInt( Math.floor( Math.random( )*300*10 ) );
        this.y = parseInt( Math.floor( Math.random( )*150*10 ) );
        this.name = id;
        this.hunger = 0;
        this.fruit = 'f1';
        this.range = 500;
        this.heat = 0;
        this.speed = 7;
        this.h = 100;
        this.w = 100;
        this.collision = true;
        this.color = 'black';
        const radar =  undefined //new Radar( id, this.x+this.w/2, this.y+this.h/2, this.range );
        this.radar = radar;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;

        console.log( this )

        physicalObjects[ id ] = this;

        return physicalObjects[id];
    }

}

function think( ){

    const square = physicalObjects.s1;

    let situation = "going";
    // going - Indo para fruta
    // searching - Andando aleatoriamente

    function goEat( square ){

        if ( physicalObjects[square.fruit] == undefined ){

            situation = "searching";
            square.vx = 0;
            square.vy = 0;

        }
        else{

            const v = square.speed;
            const fruit = physicalObjects[ square.fruit ];
            const radar = physicalObjects[ 'radar'+square.name ];

            const CA = radar.x - fruit.x;
            const CO = radar.y - fruit.y;
            const distance = Math.sqrt( Math.pow( CA, 2 ) + Math.pow( CO, 2 ) );
            const cos = CA/distance;
            const sin = CO/distance;

            square.vx = -cos*v; 
            square.vy = sin*v;

        }

    }

    const functions = {

        going: goEat,
        //searching: search

    }

    functions[ situation ](square);

}



/*function radar( square ){

    const range = square.radar;
    const width = square.w;
    const x = Math.round((square.x+square.w)/2);
    const y = Math.round((square.y+square.h)/2);

    const map = 0

    let readingX = x-range*width;
    let readingY = y-range*width;

    function whichFruit( x, y, w ){

        const obj = { x: x, y: y, w: w, h: w };

        for ( let f in physicalObjects ){
            
            const obj2 = physicalObjects[f];

            const var1 = [ 'x', 'y', 'w', 'h', 'r' ];
            const var2 = [ 'x', 'y', 'w', 'h', 'r' ];

            if (obj.type == 'custom'){

                for  ( let a in var1 ){

                    var1[a] = change[a];

                }

            };

            let testX = 0;
            let testY = 0;
            let distX = 0;
            let distY = 0;
            let distance = 0;

            if (obj2[var2[0]]       < obj[var1[0]])                    testX = obj[var1[0]];     
            else if (obj2[var2[0]]  > obj[var1[0]]+obj[var1[2]])       testX = obj[var1[0]]+obj[var1[2]];   
            if (obj2[var2[1]]       < obj[var1[1]])                    testY = obj[var1[1]];
            else if (obj2[var2[1]]  > obj[var1[1]]+obj[var1[3]])       testY = obj[var1[1]]+obj[var1[3]];  

            distX = obj2[var2[0]]-testX;
            distY = obj2[var2[1]]-testY;
            distance = Math.sqrt( (distX*distX) + (distY*distY) );

            if (distance <= obj2[var2[4]]) return obj2;
            else return 0;

        }

    }

    for ( let i = readingX; i <= range*2*width; i+=width ){

        for ( let j = readingY; j <= range*2*width; j+=width ){

            const pixels = display.getImageData( readingX, readingY, width, width );
            const red = pixels.data[1];

            if ( red.indexOf( 244 ) != -1 ){

                map.push( whichFruit( readingX, readingY, width ) );
                

            }

        }

    }

}
*/