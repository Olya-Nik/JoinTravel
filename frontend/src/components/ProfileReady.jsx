import React from 'react'
import { Collection, CollectionItem, Row, Col } from 'react-materialize'

class ProfileReady extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allusers: ''
        }
    }
    async componentDidMount() {
        const resp = await fetch('http://localhost:3001/getall')
        const allusers = await resp.json()
        this.setState({ allusers: allusers })
    }
    render() {
        const id = this.props.match.params.id;
        const userProfile = this.state.allusers ? this.state.allusers.find((user) => user.id === id) : null
console.log(this.state)
console.log(userProfile)
        return (
            <div>
    
                <Row>
                    <Col m={6} s={12}>
                        <Collection header="First Names">
                            <CollectionItem>
                                {/* {user.name} */}
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