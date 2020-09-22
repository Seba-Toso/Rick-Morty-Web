import React from 'react';



function Footer() {

    const scrollUp = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    }

    let date = new Date( )
    date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    return (
        <React.Fragment>
            <div id="scrollBtn" onClick={scrollUp}>
                <button className="scrollUp" >
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-double-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                        <path fillRule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                </button>  
            </div> 
            <p className="designer text-light small">Design by SEBASTIAN TOSO</p>
            <p className="time text-light small">{date}</p>
        </React.Fragment>
    )
}

export default Footer;