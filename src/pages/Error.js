import React from 'react';
import {Link} from 'react-router-dom'


function Error() {


return (
    <React.Fragment>
        <div className="errorMsg text-center">
            <img src={require('../assets/404imgMsg-01.png')} alt="404 Error Page" className="errorImg404" /> <br/>
            <img src={require('../assets/404imgMsg-02.png')} alt="404 Error Page" className="errorImgText" /> <br/>
            <img src={require('../assets/404img.png')} alt="404 Error Page" className="errorImg" /> <br/>
            <Link to='/rickandmorty-app' className="errorBtn btn btn-outline-success">Back Home</Link>
        </div>
    </React.Fragment>
    )

}

export default Error;
