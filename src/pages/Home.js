import React from 'react';
import SearchBar from '../components/SearchBar'
import Results from '../components/Results'
import Footer from '../components/Footer'

function Home() {


return (
    <React.Fragment>
        <div className="search">
            <SearchBar /> 
        </div>
        <div className="results">
            <Results />
        </div>
        <div className="footer">
            <Footer />
        </div>
    </React.Fragment>
    )

}

export default Home;

