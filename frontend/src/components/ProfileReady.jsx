import React from 'react'
import { Collection, CollectionItem, Row, Col } from 'react-materialize'

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
        const resp = await fetch(`http://localhost:3001/${id}`, {
            method: 'GET'
        })
        const user = await resp.json()
        this.setState({ user: user, loading: false })
    }
    render() {

console.log(this.state)
        return (
            <div>
    {this.state.user ? this.state.user._id : <p>loading</p>} 
                <Row>
                    <Col m={6} s={12}>
                        <Collection header={this.state.user.name}>
                            <CollectionItem>
                                {this.state.user.name}
                            </CollectionItem>
                            <CollectionItem>
                                Alvin
        </CollectionItem>
                            <CollectionItem>
                                Alvin
        </CollectionItem>
                            <CollectionItem>
                                Alvin
        </CollectionItem>
                        </Collection>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ProfileReady