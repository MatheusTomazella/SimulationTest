function createRadar( id, x, y, r, source ){

    const radar =  createCircularPhysicalObject( 'radar'+id, 'rgba(0,0,0,0.08)', x, y, r, false, true );
    radar.objectType = 'radar';

    return radar;
}

function updateRadarPositions(){

    for ( let i in physicalObjects ){

        const obj = physicalObjects[i];
        try
        {
            if ( obj.name.search( 'radar' ) != -1 ){

                if ( searchObject( obj.square ) == -1 ) delete physicalObjects[i];

                obj.x = obj.square.x+obj.square.w/2;
                obj.y = obj.square.y+obj.square.h/2;

                const square = obj.square;
                if ( square.x <= 0 ) square.vx *= -1;
                else if ( square.x+square.w >= globalConstants.display.w ) square.vx *= -1;
                if ( square.y <= 0 ) square.vy *= -1;
                else if ( square.y+square.h >= globalConstants.display.h ) square.vy *= -1;

            }
        }
        catch{}

    }
    
}

function objectDetected( collision ){

    const square = collision.PhysicalObject1.square;
    const obj = collision.PhysicalObject2;

    if ( obj.objectType == 'fruit' && (obj.x >= square.x && obj.x <= square.x+square.w) && (obj.y >= square.y && obj.y <= square.y+square.h) ){
        eatFruit( square, obj ); 
    }
    else
        think( square, obj );

}