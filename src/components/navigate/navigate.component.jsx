import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Library
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/books">Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/readers">Readers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/readerstype">Readers Type</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/lending">Book Lending</Link>
                        </li>
                    </ul>

                </div>

            </div>
        </nav>
    );
}

export default NavBar;