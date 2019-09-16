import React from 'react'
import { Collection, CollectionItem, Row, Col, Icon } from 'react-materialize'
import moment from 'moment'
const server = "http://localhost:3001"

class SearchedCompany extends React.Component {
    render() {
        const allusers = this.props.users
        console.log(allusers)
        return (
            <Row>
                <Col m={6} s={12} style={{width: "900px"}}>
                    <Collection>
                        {allusers.map((user) =>
                            <CollectionItem className="avatar" key={user._id}>
                                <img src={`${server}/${user.imageData}`} alt="" className="circle" />
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
                        )}
                    </Collection>
                </Col>
            </Row>
        )
    }
}

export default SearchedCompany