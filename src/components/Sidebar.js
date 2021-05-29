import React, { useState } from 'react';
import {connect} from 'react-redux'
import {setFilterAction, cleanAllAction} from '../redux/charsDuck'
import {Link, useLocation} from 'react-router-dom'


function Sidebar({setFilterAction, cleanAllAction}) {
    const [visibility, setVisibility] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        characters: true,
        locations: false,
        episodes: false
    })

// Show/Hide handler
function toggleSidebar () {
    let sidebar = document.getElementById("mySidebar");
    let main = document.getElementById("main");
    if (visibility){
        sidebar.style.width = "0";
        main.style.marginLeft= "0"
    }
    else{
        sidebar.style.width = "13rem";
        main.style.marginLeft = "13rem";
    }
    setVisibility(!visibility)
}
// Search Filter handler
const setFilter = (event) => {
    let clickedButton = event.target.id
    setActiveFilters({
        characters: clickedButton === 'Characters' ? true : false, 
        locations: clickedButton === 'Locations' ? true : false, 
        episodes: clickedButton === 'Episodes' ? true : false
    })
    setFilterAction(clickedButton)
    cleanAllAction()
}


return (
    <React.Fragment>
        <div>
            <div id="main">
                <button className="openbtn" onClick={toggleSidebar} onBlur={toggleSidebar}>☰</button>  
            </div>  
            <div id="mySidebar" className="sidebar">
                {   //duplicate Home path for resolving problems with gh-pages
                    useLocation().pathname === ('/') ?
                    <div>
                        <button id="Characters" onClick={setFilter} className={activeFilters.characters? 'active' : ''}>Character</button>
                        <button id="Locations" onClick={setFilter} className={activeFilters.locations? 'active' : ''}>Location</button>
                        <button id="Episodes" onClick={setFilter} className={activeFilters.episodes? 'active' : ''}>Episode</button>
                    </div>
                    :
                    <button><Link className="link" to="/">Home</Link></button> 
                }
                {useLocation().pathname === ('/') && <button><Link className="link" to="/about">About</Link></button>}
            </div>
        </div>
    </React.Fragment>
    );
}

function mapState(state){  
    return {
        filter: state.filter      
    }
    
}     

export default connect(mapState, {setFilterAction, cleanAllAction})(Sidebar);
