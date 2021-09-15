import React from 'react';
import { Link } from 'react-router-dom'
import styles from '../NavBar/NavBar.module.css';

function Navbar() {


    return (
        <nav className={styles.navPrueba}>
            <h4>Doggo App tm</h4>
            <Link to='/createDoggo'>Create your doggo</Link>
        </nav>
    );
}

export default Navbar;