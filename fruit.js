function createFruit( ){

    id = getNewId( 'f' );

    if ( id != 0 ){

    const x = Math.floor( Math.random( )*globalConstants.display.w );
    const y = Math.floor( Math.random( )*globalConstants.display.h );

    const fruit = createCircularPhysicalObject( id, '#FE0000', x, y, 25, false, true );
    fruit.objectType = 'fruit';

    return fruit;
    }

    return '';
}

let fruitSpawnRate = 5;
function spawnFruit(){

    if ( Math.floor( Math.random()*fruitSpawnRate ) == 0 ) createFruit();

    if ( male == 0 || female == 0 ) createSquare();

}