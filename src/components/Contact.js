import React from 'react';
import styles from '../css_modules/contactContainer.module.css'

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const planets = localStorage.getItem('planets');
        if (planets && planets[0] > (Date.now()-(30*24*60*60*1000))) {
            this.setState({
                loading: false,
                planets
            })
        } else {
            fetch('https://sw-info-api.herokuapp.com/v1/planets')
                .then(response => response.json())
                .then(data => {
                    let planetsArray = new Array();
                    planetsArray.push(Date.now());
                    data.forEach(obj => planetsArray.push(obj.name));
                    this.setState({
                        isLoading: false,
                        planets: planetsArray
                    });
                    localStorage.setItem('planets', JSON.stringify(planetsArray));
                })
        }
    }

    getPlanets(planets) {
        let options = new Array();
        for (let i=1; i < planets.length; i++) {
            options.push(<option key={planets[i]}>{planets[i]}</option>);
        }
        return options;
    }

    render() {
        const res = this.state.isLoading ? "Loading" : this.state.planets;
        if (typeof res === 'string') {
            return res;
        } else {
            return (
                <div className={styles.container}>
                    <form>
                        <label>First Name</label>
                        <input type="text" className={styles.fields} placeholder="Your first name.."/>

                        <label>Last Name</label>
                        <input type="text" className={styles.fields} placeholder="Your last name.."/>

                        <label>Planet</label>
                        <select className={styles.fields}>
                            {this.getPlanets(res)}
                        </select>

                        <label htmlFor="subject">Subject</label>
                        <textarea className={styles.fields} name="subject" placeholder="Your message.."></textarea>
                        <input className={styles.button} type="submit" value="Submit"/>
                    </form>
                </div>
            );
        }
    }
};

export default Contact;