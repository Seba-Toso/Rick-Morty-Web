import React from 'react';


function About() {


 
return (
    <React.Fragment>
        <div className="text-center">
            <img src={require('../assets/profile.jpeg')} alt="Profile Avatar" className="avatar" /> <br/>

                <h5>About me</h5>
                <div className="aboutContainer">
                <p>Hi! my name is Sebastian, i'm from Argentina.<br/>
                I'm a Trainee/Jr Front-end developer that tries to enter to this beautiful work world. <br/>
                </p>
                </div>
                <h5>I've got skills in:</h5>
                <div className="aboutContainer">
                <ul className="list">
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Redux</li>
                    <li>Bootstrap</li>
                    <li>Some little Angular and Typescript</li>
                </ul>
                </div>
                <h5>About this page</h5>
                <div className="aboutContainer">
                <p>This page was made for the Puzzle Challenge<br/>
                It uses the <a href="https://rickandmortyapi.com/" target="blank" >Rick and Morty API</a> to get all data and
                it's made using React, Redux and GraphQl. <br/>
                Want to see the complete code? <br/>
                Go to my <a href="https://github.com/Seba-Toso" target="blank" >Github</a>
                </p>
            </div>
        </div>
    </React.Fragment>
    )

}

export default About;
