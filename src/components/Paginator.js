import React, { useState } from 'react';
import { connect } from 'react-redux';
import {getInformationAction} from '../redux/charsDuck'


function Paginator( {totalPages, nextPage, prevPage, getInformationAction, current} ) {
    const [actualPage, setActualPage] = useState()

//Change page handlers
const goBack = () =>{
    getInformationAction(current, prevPage)
    setActualPage(prevPage)
    window.scrollTo({top: 0, behavior: 'smooth'})
}
const goFoward = () => {
    getInformationAction(current, nextPage)
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
                    null : <li className="page-item"><button className="page-link pagnmb" onClick={goBack}>{prevPage}</button></li>
            }
            
            <li className="page-item"><div className="page-link inpag"><strong>{prevPage+1}</strong></div></li>
            
            {
                actualPage===totalPages || totalPages === 1?
                    null : <li className="page-item"><button className="page-link pagnmb" onClick={goFoward}>{nextPage}</button></li>
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

export default connect (mapState, {getInformationAction})(Paginator);