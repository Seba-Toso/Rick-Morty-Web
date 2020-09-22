import React, { useState } from 'react';
import {connect} from 'react-redux'
import {setFilterAction, cleanAllAction} from '../redux/charsDuck'
import {Link, useLocation} from 'react-router-dom'


function Sidebar({setFilterAction, cleanAllAction}) {
    const [visibility, setVisibility] = useState(false);

// Show/Hide
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
// Search Filter
const setFilter = (event) => {
    let filter = event.target.id
    setFilterAction(filter)
    cleanAllAction()
}


  return (
    <React.Fragment>
        <div>
        <div id="main">
            <button className="openbtn" onClick={toggleSidebar} onBlur={toggleSidebar}>☰</button>  
        </div>  
        <div id="mySidebar" className="sidebar">
        {
            useLocation().pathname === '/rickandmorty-app/' ?
            <div>
                <button id="Characters" onClick={setFilter}>Character</button>
                <button id="Locations" onClick={setFilter}>Location</button>
                <button id="Episodes" onClick={setFilter}>Episode</button>
            </div>
            :
            <button><Link className="link" to="/rickandmorty-app/">Home</Link></button> 
        }
            <button><Link className="link" to="/about">About</Link></button>
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
