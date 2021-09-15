import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from '../LandingPage/LandingPage.module.css';

const LandingPage = () => {

    const history = useHistory();

    function onClick(){
        history.push('/home');
    }

    return (
        <div className={styles.landingPageImg}>
            <h1 className={styles.appTitle}>Doggo App</h1>
            <p className={styles.quote}> "Because everyone loves doggos." <br/>-Snoopy</p>
            <button className={styles.fill} onClick={onClick}>See our Doggos</button>
        </div>
    )
}

export default LandingPage
 