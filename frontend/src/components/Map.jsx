import React, { Component, Suspense } from 'react'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import 'materialize-css/dist/css/materialize.min.css'
import { Card, Row, Col, CardTitle, Select } from 'react-materialize';
import spinner from '../img/lg.ajax-spinner-preloader.gif'
import '../App.css'
const server = "http://localhost:3001"


class Map extends Component {
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

                const places = await fetch(`${server}/map`, {
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
        const { t } = this.props;
        return (
            <div className='map'>
            <h3 className="places"> {t('Places nearby')}</h3>

                <div className='selectplace'>
                    <Select defaultValue="" onChange={this.changeAction}>
                        <option value="" disabled>
                            {t('Choose your option')}
                        </option>

                        <option value="sights">
                        {t('Sightseengs')}
                        </option>
                        <option value="natural_feature">
                        {t('Sea chilling')}
                        </option>
                        <option value="clothing_store">
                        {t('Shopping')}
                        </option>
                        <option value="restaurant">
                        {t('Gastronomy')}
                        </option>
                    </Select>

                </div>

                <div className='cards'>
                    {this.state.loading && <> <img src={spinner} alt="loading..." /></>}

                    {this.state.places.length > 0 && this.state.places.map((item, index) => {
                        return (
                            <div className="cards">
                                <Row>
                                    <Col m={15} s={15} className='f' style={{
                                        width: "448px",
                                        height: "812px",
                                        boxSizing: "content-box"
                                    }}>
                                        <Card horizontal header={<CardTitle />} actions={[
                                        <div style={{
                                            backgroundColor: "#fff", 
                                            backgroundImage: `url(${item.image})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            height:"500px", 
                                            width:"400px"
                                        }}></div>,
            
                                        <p> Geolocation: {item.vicinity} </p>, <p> Price-level {item.price_level ? item.price_level : "?"}/5 </p>, <p> Raiting: {item.rating}/5 </p>]}>
                                            <p id ='Nameplace'>{item.name}</p>
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
const MapTrans = withTranslation()(Map);
const Loader = () => (
    <div className="App">
      <div>loading...</div>
    </div>
  );
  export default function App() {
    return (
      <Suspense fallback={<Loader />}>
        <MapTrans />
      </Suspense>
    );
  }