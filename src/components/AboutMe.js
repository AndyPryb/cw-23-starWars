import React from 'react';

class AboutMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const infoString = localStorage.getItem('luke');
        if(infoString) {
            const infoArray = JSON.parse(infoString);
            console.log(infoArray[7])
            if((Date.now()-1000*60*60*24*30) > infoArray[7]) {
                this.doFetch();
                return;
            }
            this.setState({
                isLoading: false,
                infoArray
            });
        } else {
            this.doFetch();
        }
    }

    doFetch() {
        fetch('https://sw-info-api.herokuapp.com/v1/peoples/1')
            .then(response => response.json())
            .then(data => {
                const infoArray = [
                    data.name,
                    data.height,
                    data.birth_year,
                    data.mass,
                    data.hair_color,
                    data.skin_color,
                    data.eye_color,
                    Date.now()
                ]
                this.setState({
                    isLoading: false,
                    infoArray
                });
                localStorage.setItem('luke', JSON.stringify(infoArray));
            })
    }

    render() {
        const res = this.state.isLoading ? 'Loading' : this.state.infoArray;
        if (typeof res === 'string') {
            return res;
        } else {
            return (
                <div>
                    <p>name: {res[0]}</p>
                    <p>height: {res[1]}</p>
                    <p>birth year: {res[2]}</p>
                    <p>mass: {res[3]}</p>
                    <p>hair color: {res[4]}</p>
                    <p>skin color: {res[5]}</p>
                    <p>eye color: {res[6]}</p>
                </div>
            );
        }
    }
};

export default AboutMe;
