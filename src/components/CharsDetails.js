import React from 'react';
import CharMiniCard from './CharMiniCard'

function CharsDetails( {details} ) {

    
return (
    <React.Fragment>
        <div className="modal fade" id={"Modal"+details.id} aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-light">
                    <h4 className="modal-title" id="ModalLabel">{details.name}</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body container">
                        <div className="row">
                            <div className="col-4">
                                {
                                details.species?  (
                                    <div> 
                                        <strong>SPECIES:</strong> {details.species} <br/>
                                        <strong>TYPE:</strong> {details.type || 'No info available'} <br/>
                                        <strong>GENDER:</strong> {details.gender || 'No info available'} <br/>
                                    </div> 
                                    ) : 
                                    details.dimension? (
                                        <div> 
                                            <strong>DIMENSION:</strong> {details.dimension} <br/>
                                            <strong>TYPE:</strong> {details.type || 'No info available'} <br/>
                                        </div> 
                                    ) : 
                                        <div> 
                                            <strong>RELEASE DATE:</strong> {details.air_date} <br/>
                                            <strong>EPISODE:</strong> {details.episode} <br/>
                                        </div> 
                                }
                            </div>
                            <div className="col-8 text-center">
                            {
                                details.image? <img className="detailImg" src={details.image} height='250' alt={details.name} /> 
                                :
                                details.characters?
                                <div>
                                    <div><strong>CHARACTERS:</strong></div>
                                    {
                                        details.characters.map((char, index)=>{
                                            if(index <=4){
                                                return <CharMiniCard char={char} height='25' width='100%' key={index}/>
                                            }
                                            return null
                                        })
                                    } 
                                </div>
                                :
                                <div>
                                    <div><strong>RESIDENTS:</strong></div>
                                    {
                                        details.residents.map((char, index)=>{
                                            if(index <=4){
                                                return <CharMiniCard char={char} height='25' width='100%' key={index}/>
                                            }
                                            return null
                                        })
                                    } 
                                </div>
                            }
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )

}


export default CharsDetails;
