import React from 'react';
import styles from '../css_modules/fargalaxy.module.css'

const url = 'https://sw-info-api.herokuapp.com/v1/films/'

class FarGalaxy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    randomize = () => {
        return Math.trunc(Math.random()*6)+1
    }

    componentDidMount() {
        const opening_crawl = sessionStorage.getItem('opening_crawl');
        if (opening_crawl) {
            this.setState({
                isLoading: false,
                opening_crawl
            });
        } else {
            fetch(url+this.randomize())
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoading: false,
                        opening_crawl: data.opening_crawl
                    });
                    sessionStorage.setItem('opening_crawl', data.opening_crawl);
                })
        }
    }

    render() {
        const text = this.state.isLoading ? 'Loading' : this.state.opening_crawl;
        return (
            <p className={styles.farGalaxy}>{text}</p>
        );
    }
};

export default FarGalaxy;