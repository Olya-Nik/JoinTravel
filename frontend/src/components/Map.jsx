import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import { Card, Row, Col, CardTitle } from 'react-materialize';
import Places from './Places';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            places: [],
        };
    }

    geo = async () => {
        let startPos;
        const geoSuccess = async (position) => {
            startPos = position;
            let a = startPos.coords.latitude;
            let b = startPos.coords.longitude;
            await this.setState({ latitude: a, longitude: b })

            try {

                const x = this.state.latitude;
                const y = this.state.longitude;


                const places = await fetch('http://localhost:3001/map', {
                    credentials: 'include',
                    method: 'POST',
                    // mode: 'no-cors',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    // mode: 'no-cors',
                    body: JSON.stringify({
                        latitude: x,
                        longitude: y,
                        test: 'test'
                    })


                });

                const data = await places.json()
                await this.setState({ places: data })
                console.log(data);


            } catch (err) {
                console.log(err);

            }

        }
        navigator.geolocation.getCurrentPosition(geoSuccess);

    }


    async componentDidMount() {
        this.geo()
    }

    render() {
        // console.log(this.state.places)
        // console.log(this.state.places && this.state.places.json.results)
        // return null;
        return (
            <div>
                <p>latitude {this.state.latitude}</p>
                <p>longitude {this.state.longitude}</p>

                <div>
                    {this.state.places ? this.state.places.map((item, index) => {
                        return (
                            <div>
                                <Row>
                                    <Col m={3} s={3}>
                                        <Card horizontal header={<CardTitle />} actions={[<img src={item.image} alt="none" width="500" height="500" />, <p> Geolocation: {item.vicinity} </p>, <p> Price-level {item.price_level ? item.price_level : "?"}/10 </p>, <p> Raiting: {item.rating}/10 </p>]}>
                                            {item.name}
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }) : null}
                </div>
            </div>
        )
    }
}

