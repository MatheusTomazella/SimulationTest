defineArea( "simulation", 300*35, 150*35 );

function getNewId( indic, nMax ){

    let id = 1;

    if ( nMax == undefined ) nMax = 100;

    while( id < nMax ){

        if ( indic+id in physicalObjects ){

            id++
            continue;

        }
        else{

            return indic+id;
            break;

        }

    }

    return 0;
}

function searchObject( obj ){

    for ( let i in physicalObjects ){

        const current = physicalObjects[i];
        if ( current == obj ){

            return current;

        }

    }

    return -1;
}

//for ( let i = 1; i <= 50; i++ ) createFruit();
//for ( let i = 1; i <= 10; i++ ) createSquare();

function updateCollisionHandlers(){    
    for ( let i in physicalObjects ){

        for ( let j in physicalObjects ){

            const obj1 = physicalObjects[i];
            const obj2 = physicalObjects[j];
            const id = obj1.name+obj2.name;
            const type1 = obj1.objectType;
            const type2 = obj2.objectType;

            if ( collisionHandlers[id] == undefined && obj1 != obj2 ){

                if ( type1 == 'radar' && type2 != 'radar' && obj1.name.search(obj2.name) == -1 ){
                    createCollisionHandler( obj1, obj2, objectDetected );
                }

            }

        }

    }
}

addToLoop( updateCollisionHandlers )
addToLoop( think );
addToLoop( updateRadarPositions );
addToLoop( status );
addToLoop( spawnFruit );
addToLoop( addPoint );

Loop();