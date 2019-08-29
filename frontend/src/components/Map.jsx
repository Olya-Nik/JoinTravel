import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import { Card, Row, Col, CardTitle, Select } from 'react-materialize';
import spinner from '../img/lg.ajax-spinner-preloader.gif'
import '../App.css'


export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            places: [],
            loading: false,
            trip: null,
        };
    }
    changeAction = (e) => {
        this.setState({
            trip: e.target.value
        })
        this.geo()
        console.log(e.target.value)
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

                await this.setState({ loading: true, places: [] })

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
                        trip: this.state.trip,
                    })


                });

                const data = await places.json()
                await this.setState({ places: data, loading: false })
                console.log(data);


            } catch (err) {
                console.log(err);

            }

        }
        navigator.geolocation.getCurrentPosition(geoSuccess);

    }


    async componentDidMount() {
        // this.geo()
    }

    render() {

        return (
            <div className='map'>
                <h3> Places Nearby</h3>

                <div className='selectplace'>
                    <Select defaultValue="" onChange={this.changeAction}>
                        <option value="" disabled>
                            Choose your option
                        </option>

                        <option value="sights">
                            Sightseeings
                        </option>
                        <option value="natural_feature">
                            SeaChilling
                        </option>
                        <option value="clothing_store">
                            Shopping
                        </option>
                        <option value="restaurant">
                            Gastronomy
                        </option>
                    </Select>

                </div>

                <div className='cards'>
                    {this.state.loading && <> <img src={spinner} alt="loading..." /></>}

                    {this.state.places.length > 0 && this.state.places.map((item, index) => {
                        return (
                            <div className="cards">
                                <Row>
                                    <Col m={15} s={15} className='f'>
                                        <Card horizontal header={<CardTitle />} actions={[<img src={item.image} alt="none" width="400" height="500" />, <p> Geolocation: {item.vicinity} </p>, <p> Price-level {item.price_level ? item.price_level : "?"}/5 </p>, <p> Raiting: {item.rating}/5 </p>]}>
                                            {item.name}
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

