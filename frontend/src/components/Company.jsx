import React from 'react'
import { Collection, CollectionItem, Row, Col } from 'react-materialize'
import { Link } from "react-router-dom";

class Company extends React.Component {
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
        return (
            <Row>
                <Col m={6} s={12}>
                    <Collection>
                        {this.state.allusers ? this.state.allusers.map((user) =>
                            <CollectionItem className="avatar" key={user._id}>
                                <img src="https://materializecss.com/images/yuna.jpg" alt="" className="circle" />
                                <span className="title">
                                    <Link to={`/company/${user._id}`}>{user.name}</Link>
                                </span>
                            </CollectionItem>
                        ) : null}
                    </Collection>
                </Col>
            </Row>
        )
    }
}

export default Company