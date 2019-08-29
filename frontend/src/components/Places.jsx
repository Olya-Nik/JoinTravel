import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import { Card, Row, Col, CardTitle } from 'react-materialize';

export default class places extends Component {
    img = async () => {
        console.log(this.props)
     
        
    }

    componentDidMount() {
            this.img()
    }








    render() {
        return (
            <>
                {this.props.place.results ? console.log(this.props.place.results[0].photos[0].photo_reference) : null}
                {this.props.place.results ? this.props.place.results.map((item, index) => {
                    return (

                        <div>
                            <Row>
                                <Col m={3} s={3}>
                                    <Card horizontal header={<CardTitle />} actions={[<img src="https://materializecss.com/images/yuna.jpg" alt="" className="circle" />, <p> Geolocation: {item.vicinity} </p>, <p> Price-level {item.price_level ? item.price_level : "?"}/10 </p>, <p> Raiting: {item.rating}/10 </p>]}>
                                        {item.name}
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )
                }) : null}






            </>
        )
    }
}
