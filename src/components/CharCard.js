import React from 'react';



function CharCard({char}) {

//Individual card loading spinner  
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
            <div className="card-header" >    
                {
                    char.image? <img src={char.image} height='250' width='100%' alt={char.name} /> : null
                }
            </div>
            <div className="card-body text-center">
                <h5><strong>{char.name}</strong></h5>
                <h6>{char.episode || null}</h6>
                <h6>{char.dimension || null}</h6> 
            </div>
        </div>
        
    </React.Fragment>
    )

}

export default CharCard;




