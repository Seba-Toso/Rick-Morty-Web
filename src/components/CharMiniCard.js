import React from 'react';



function CharMiniCard({char}) {

return (
    <React.Fragment>
    {   char.name === null ? <p>No character(s) info</p> 
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
