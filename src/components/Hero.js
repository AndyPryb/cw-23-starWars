import React from 'react';
import hero from "../Images/main.jpg";
import styles from '../css_modules/hero.module.css'

const Hero = () => {
    return (
        <section className="float-left w-25 mr-2 row">
            <img className={`${styles.hero} col`} src={hero} alt="Luke Skywalker"/>
        </section>
    );
};

export default Hero;