import React, { Component } from 'react'

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { latitude: Number, longitude: Number };
    }

    geo = () => {
        let startPos;
        const geoSuccess = (position) => {
            startPos = position;
            let a = startPos.coords.latitude;
            let b = startPos.coords.longitude;
            //console.log(a)
            //console.log(b)
            this.setState({ latitude: a, longitude: b })
        }
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }
    async componentDidMount() {
        this.geo()

        try {

            const places = await fetch('http://localhost:3001/map', {
                method: 'POST',
                // mode: 'no-cors',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                
            })
            //console.log(places);
           
            const data = await places.json()
            //console.log(data)
        } catch (err) {
            console.log(err);

        }

        // res.header("Access-Control-Allow-Origin", "*");res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


        //  const jopa = await fetch('http://localhost:3001/map'); 
        //  const data = await jopa.json() 
        // const resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyAIINAfLqMXFcgFSBFbxrm3oxIgnSM-Gfk`)
        // const json = await resp.json();
        // console.log(json)
    }


    render() {
        return (
            <div>
                <p>latitude {this.state.latitude}</p>
                <p>longitude {this.state.longitude}</p>
            </div>
        )
    }
}

