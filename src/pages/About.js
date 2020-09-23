import React from 'react';


function About() {


return (
    <React.Fragment>
        <div className="text-center">
            <img src={require('../assets/profile.jpeg')} alt="Profile Avatar" className="avatar" /> <br/>

                <h5>About me</h5>
                <div className="aboutContainer">
                <p>Hi! my name is Sebastian, I'm from Argentina.<br/>
                I'm a Trainee/Jr Front-end developer trying to make his way into this fascinating line of work.<br/>
                </p>
                </div>
                <h5>My Skills:</h5>
                <div className="aboutContainer">
                <ul className="list">
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Redux</li>
                    <li>Bootstrap</li>
                    <li>A bit Angular and Typescript</li>
                </ul>
                </div>
                <h5>About this page</h5>
                <div className="aboutContainer">
                <p>This website was made for the Puzzle Challenge.<br/>
                It uses the <a href="https://rickandmortyapi.com/" target="blank" >Rick and Morty</a> API to get all data and
                it was made using React, Redux and GraphQL.<br/>
                Want to see the complete code? <br/>
                Go to my <a href="https://github.com/Seba-Toso" target="blank" >Github</a>!
                </p>
            </div>
        </div>
    </React.Fragment>
    )

}

export default About;
