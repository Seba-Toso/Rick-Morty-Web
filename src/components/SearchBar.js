import React, { useState } from 'react';
import { connect } from 'react-redux';
import {  getInformationAction, cleanAllAction  } from '../redux/charsDuck'


function SearchBar({getInformationAction, cleanAllAction, error}) {
    const [inputSearch, setTextToSearch] = useState(' ')
    
// Input Handlers
const inputHandler = (event) => {
    setTextToSearch(event.target.value)
    //Start searching after 3rd char
    if(event.target.value.length >2){
        getInformationAction(event.target.value)
    }
}
const doSearch = (e) => {
    e.preventDefault()
    getInformationAction(inputSearch)
}

// Clean handler
const cleanAll = () => {
    setTextToSearch(' ')
    document.querySelector('.searchBar').reset()
    cleanAllAction()
}


return (
    <React.Fragment>
        <form className="searchBar input-group mb-3 w-25" onSubmit={doSearch} >
            <input type="text" 
                className="form-control"
                placeholder="Type your search here..." 
                aria-label="Type your search here..." 
                aria-describedby="button-addon2" 
                autoFocus
                onChange={inputHandler}
            />
            <div className="input-group-append">
                <button
                    //Enable search after 3rd character
                    disabled={inputSearch.length <= 2}                  
                    className="submitbtn btn btn-outline-secondary" 
                    type="submit" 
                    id="button-addon2">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>
                </button>
                <button className="btn btn-outline-danger" type="button" id="inputGroupFileAddon04" onClick={cleanAll}>X</button>
            </div>
        </form>
        {
            error? <small className="errorWeb text-danger"> Your search doesn't match to any data in any dimension</small> : null
        }
    </React.Fragment>
    )
}

function mapState (state){
    return {
        error: state.characters.error,
        searched: state.characters.actualSearch
    }
}

export default connect (mapState, { getInformationAction, cleanAllAction })(SearchBar);
