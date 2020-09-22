import React from 'react';



function CharMiniCard({char}) {

if (char === undefined ){ 
    return  <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>
} 
 
return (
    <React.Fragment>
    {   char.name === null ? <div>No character(s) info</div> 
        :
        <div className="miniCards card text-dark border-dark mb-3" >
            <div className="card-header" >
                <img src={char.image} alt={char.name} width='100%'/>
            </div>

            <div className="card-body mini">
                <h5>{char.name}</h5>
            </div>
        </div>
    }  
    </React.Fragment>
    )

}

export default CharMiniCard;
