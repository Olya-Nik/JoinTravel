import React from 'react'
import { Collection, CollectionItem, Row, Col, Icon } from 'react-materialize'
import moment from 'moment'

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allusers: []
        }
    }
    async componentDidMount() {
        const resp = await fetch('http://localhost:3001/getall')
        const allusers = await resp.json()
        this.setState({ allusers: allusers })
        console.log(this.state)
    }

    render() {
        return (
            <Row className="company">
                <Col m={6} s={12}>
                    <Collection>
                        {this.state.allusers ? this.state.allusers.map((user) =>
                            <CollectionItem className="avatar" key={user._id}>
                                <img src={`http://localhost:3001/${user.imageData}`} alt="" className="circle" />
                                <span className="title">
                                    {user.name}
                                </span>
                                <p>
                                    Dates of trip: {`${moment(user.dateDepature).format("DD MMM YYYY")} - ${moment(user.dateReturn).format("DD MMM YYYY")}`}
                                </p>
                                <p>
                                    Contacts: {user.contacts}
                                </p>
                                <a href={`/company/${user._id}`} className="secondary-content">
                                    <Icon>
                                        More info
                                </Icon>
                                </a>
                            </CollectionItem>
                        ) : null}
                    </Collection>
                </Col>
            </Row>
        )
    }
}

export default Company