import React, { useState } from 'react';
import { connect } from 'react-redux';
import {getCharactersAction} from '../redux/charsDuck'



function Paginator( {totalPages, nextPage, prevPage, getCharactersAction, current} ) {
    const [actualPage, setActualPage] = useState()

const goBack = () =>{
    getCharactersAction(current, prevPage)
    setActualPage(prevPage)
    window.scrollTo({top: 0, behavior: 'smooth'})
      
}

const goFoward = () => {
    getCharactersAction(current, nextPage)
    setActualPage(nextPage)
    window.scrollTo({top: 0, behavior: 'smooth'})
}

 return (
     <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center pagination-sm">
            <li className="page-item">
                <button 
                    className="page-link" 
                    disabled={prevPage===0} 
                    onClick={goBack}>
                    Prev
                </button>
            </li>
            
            {
                prevPage===0? 
                    null : <li className="page-item"><button className="page-link" onClick={goBack}>{prevPage}</button></li>
            }
            
            <li className="page-item"><div className="page-link"><strong>{prevPage+1}</strong></div></li>
            
            {
                actualPage===totalPages || totalPages === 1?
                    null : <li className="page-item"><button className="page-link" onClick={goFoward}>{nextPage}</button></li>
            }

            <li className="page-item">
                <button 
                    className="page-link" 
                    disabled={actualPage===totalPages || totalPages===1} 
                    onClick={goFoward}>
                    Next
                </button>
            </li>
        </ul>
    </nav>
 )
}

function mapState (state){
    return {
        current: state.characters.current,
        prevPage: state.characters.prevPage,
        nextPage: state.characters.nextPage,
        totalPages: state.characters.pages
    }
}

export default connect (mapState, {getCharactersAction})(Paginator);