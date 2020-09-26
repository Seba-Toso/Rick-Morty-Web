import React from 'react';
import { connect } from 'react-redux';
import CharCard from './CharCard'
import Paginator from './Paginator'
import CharsDetails from './CharsDetails';

function Results( {chars, error, filter, fetching} ) {
    

return (
    <React.Fragment>
    {
        chars.length === 0 ? 
        <div> 
            <p className="text-muted noSearch-text">▲ <br/> 
            Type and start Searching {filter}!</p> 
            {
                fetching?
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                :
                error ? 
                    <p className="errorMob text-muted text-center">
                    No data found ... 
                    </p> 
                : 
                null
            }
        </div> 
        :
        <>
            <small className="text-muted">Click the cards to get more information!</small>
            <div className="container">
                <div className="row" >
                {
                    chars.map(element => {
                        return (
                            <div className="col cardCol" key={element.id}> 
                                <div data-toggle="modal" data-target={"#Modal"+element.id} type="button">
                                    <CharCard char={element} /> 
                                </div>
                                <CharsDetails details={element} />  
                            </div>
                        )
                    })
                }
                </div>
            </div>
            
            <Paginator />
        </>
    }
        
    </React.Fragment>
    )
}


function mapState (state){
return {
    fetching: state.characters.fetching,
    filter: state.characters.filter,
    error: state.characters.error,
    chars: state.characters.array
    }
}

export default connect (mapState)(Results);
