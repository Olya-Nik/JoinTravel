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
            <div>
                {this.state.allusers ? this.state.allusers.map((user) =>
                    <div key={user._id}>
                        <Link to={`/company/${user._id}`}>{user._id}</Link>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default Company