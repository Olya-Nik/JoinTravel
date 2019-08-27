import React from 'react'
import { Collection, CollectionItem, Row, Col } from 'react-materialize'
import { Link } from "react-router-dom";
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

console.log(this.state)
        return (
            <div>
    {/* {this.state.user ? this.state.user._id : <p>loading</p>}  */}
                <Row>
                    <Col m={6} s={12}>
                        <Collection header={`You may join ${this.state.user.name}`}>
                            <CollectionItem>
                            <img src={`http://localhost:3001/${this.state.user.imageData}`} alt="" />
                            </CollectionItem>
                            <CollectionItem>
                            {`${this.state.user.name} is ${this.state.user.age} old`}
        </CollectionItem>
                            <CollectionItem>
                            {`${this.state.user.name} is going to visit ${this.state.user.country}`}
        </CollectionItem>
                            <CollectionItem>
                            {`${this.state.user.name} is interested in ${this.state.user.gastronomy} as you`}
        </CollectionItem>
        <CollectionItem>
                            {`You may send a message to ${this.state.user.name}`}
                            <Link to={`/messages/${this.state.user._id}`}>{`Contact to ${this.state.user.name}`}</Link>
        </CollectionItem>
                        </Collection>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ProfileReady