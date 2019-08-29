import React from 'react'
import { Collection, CollectionItem, Row, Col, Button } from 'react-materialize'
import { Link } from "react-router-dom";
import '../App.css';
import moment from 'moment'
// import 'moment/locale/ru';


class ProfileReady extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            loading: true
        }
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        const resp = await fetch(`http://localhost:3001/user/${id}`, {
            method: 'GET'
        })
        const user = await resp.json()
        this.setState({ user: user, loading: false })
    }
    render() {
        const dateDepature = moment(this.state.dateDepature).format("DD MMM YYYY")
        const dateReturn = moment(this.state.dateReturn).format("DD MMM YYYY")

        return (
            <div className="back">
                {/* {this.state.user ? this.state.user._id : <p>loading</p>}  */}
                <Row style={{color: "#FF8C00"}}>
                    <Col m={6} s={12}>
                        <Collection header={`You may join ${this.state.user.name}`}>
                            <CollectionItem>
                                <img src={`http://localhost:3001/${this.state.user.imageData}`} alt="" />
                            </CollectionItem>
                            <CollectionItem>
                                {`${this.state.user.name} is going to visit ${this.state.user.country}, ${this.state.user.city}`}
                            </CollectionItem>
                            <CollectionItem>
                                {`Date of trip ${dateDepature} - ${dateReturn}`}
                            </CollectionItem>
                            <CollectionItem>
                                {`${this.state.user.name} is interested ${this.state.user.gastronomy ? "in gastronomy" : ""} ${this.state.user.shopping ? "shopping" : ""} ${this.state.user.sightseeings ? "to see sightseeings" : ""} ${this.state.user.seaChilling ? "seachilling" : ""} as you`}
                            </CollectionItem>
                            <CollectionItem>
                                {`You may send a message to ${this.state.user.name}`}
                            </CollectionItem>
                            <CollectionItem>
                            <Button className="button">{`Send a message ${this.state.user.name}`}
                                <Link to={`/messages/${this.state.user._id}`}></Link>
                            </Button>
                            </CollectionItem>
                        </Collection>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ProfileReady