import React from 'react';



function CharCard({char}) {


if (char === undefined ){ 
    return  <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>
} 
 
return (
    <React.Fragment>
        <div className="resCard card text-dark border-dark mb-3" >
            {
                char.image? <img src={char.image} height='250' width='100%' alt={char.name} /> : null
            }
            <div className="card-body">
                <h5>{char.name}</h5>
                {
                    char.episode ? <h6>{char.episode}</h6> 
                    : 
                    char.dimension ? <h6>{char.dimension}</h6> 
                    : 
                    null
                }
            </div>
        </div>
        
    </React.Fragment>
    )

}

export default CharCard;




