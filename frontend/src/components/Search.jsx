import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import { DatePicker, Button, Select } from 'react-materialize'
import { Link } from "react-router-dom";
import SearchedCompany from './SearchedCompany'
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateDepature: '',
            dateReturn: '',
            country: '',
            filterUsers: [],
        }
    }
    changeDateDepature = (e) => {
        this.setState({
            dateDepature: e
        })
    }
    changeDateReturn = (e) => {
        this.setState({
            dateReturn: e
        })
    }
    changeCountry = (e) => {
        this.setState({
            country: e.target.value
        })
    }
// async componentDidMount() {
// }
onClick = async () => {
    const data = {
        dateDepature: this.state.dateDepature,
        dateReturn: this.state.dateReturn,
        country: this.state.country
    }
    const resp = await fetch ('http://localhost:3001/filter', {
        method: 'POST',
        credentials : 'include', 
        headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        body: JSON.stringify(data)
    })

    const matches = await resp.json()
    console.log(matches)
        this.setState({ filterUsers: matches })
}
    render() {
        return (
            <div>
                Date of depature <DatePicker placeholder="Choose dates" onChange={this.changeDateDepature} />
                Date of retutn <DatePicker placeholder="Choose dates" onChange={this.changeDateReturn} />
                Country to visit<Select defaultValue="" onChange={this.changeCountry}>
                        <option value="" disabled>
                            Choose country
                    </option>
                        <option value="Australia">
                            Australia
                    </option>
                        <option value="Iceland">
                            Iceland
                    </option>
                        <option value="Morocco">
                            Morocco
                    </option>
                    </Select>
                <Button type="submit" onClick={this.onClick}>FIND COMP
                    <Link to={'/company'}></Link>
                    </Button>
<SearchedCompany users={this.state.filterUsers}/>
            </div>
        )
    }
}
