import React from 'react';
import styles from './about.module.css';
import about from './about.webp';

const About = () => {
    return (
        <div className={styles.about_container}>
            <img className={styles.about_image} src={about} alt=""/>
        </div>
    );
};

export default About;