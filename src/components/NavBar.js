import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
import { useGlobalContext } from '../context';

//import PropTypes from 'prop-types'

const NavBar = () => {
    
    const {dark,toggleDark} = useGlobalContext();
    

    

        return (
            <div>
                
                <nav className={dark? "navbar fixed-top navbar-expand-lg navbar-dark bg-dark":"navbar fixed-top navbar-expand-lg navbar-dark bg-primary"}>
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">NewsToday</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/business">Business</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/entertainment">Entertainment</Link>
                                </li>
                               
                                <li className="nav-item">
                                <Link className="nav-link" to="/health">Health</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/science">Science</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/sports">Sports</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/technology">Technology</Link>
                                </li>
                                
                               </ul>
                            </div>
                           
                            <label class="switch">
                                <input type="checkbox" checked={dark} onChange={toggleDark}/>
                                <span class="slider round"></span>
                            </label>

                        </div>
                        </nav>
               
            </div>
        )
   
}

export default NavBar
