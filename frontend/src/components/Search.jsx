import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import { DatePicker, Button, Select, CollectionItem, Checkbox } from 'react-materialize'
import { Link } from "react-router-dom";
import SearchedCompany from './SearchedCompany'
import moment from 'moment'
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateDepature: '',
            dateReturn: '',
            country: '',
            gastronomy: false,
            shopping: false,
            sightseeings: false,
            seaChilling: false,
            budgetPerDay: '',
            filterUsers: [],
        }
    }
    changeDateDepature = (e) => {
        this.setState({
            dateDepature: moment(e).format("DD MMM YYYY")
        })
    }
    changeDateReturn = (e) => {
        this.setState({
            dateReturn: moment(e).format("DD MMM YYYY")
        })
    }
    changeCountry = (e) => {
        this.setState({
            country: e.target.value
        })
    }
    changeGastronomy = () => {
        this.setState({
            gastronomy: true
        })
    }
    changeShopping = () => {
        this.setState({
            shopping: true
        })
    }
    changeSightseeings = (e) => {
        this.setState({
            sightseengs: true
        })
    }
    changeSeaChilling = (e) => {
        this.setState({
            seaChilling: true
        })
    }
    changeBudget = (e) => {
        
        this.setState({
            budgetPerDay: e.target.value
        })
    }
// async componentDidMount() {
// }
onClick = async () => {
    const data = {
        dateDepature: this.state.dateDepature,
        dateReturn: this.state.dateReturn,
        country: this.state.country,
        gastronomy: this.state.gastronomy,
        shopping: this.state.shopping,
        sightSeeings: this.state.sightseeings,
        seaChilling: this.state.seaChilling,
        budgetPerDay: this.state.budgetPerDay
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
            <div className="searchClass">
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
                    Budget per day<Select defaultValue="" onChange={this.changeBudget}>
                        <option value="" disabled>
                            Your budget
                    </option>
                        <option value="Australia">
                            100$
                    </option>
                        <option value="Iceland">
                            100-200$
                    </option>
                        <option value="Morocco">
                            200$ and more
                    </option>
                    </Select>
                    <CollectionItem>
                                    <Checkbox value="No" label="Gastronomy" onChange={this.changeGastronomy} />
                                </CollectionItem>
                                <CollectionItem>
                                    <Checkbox value="No" label="Shopping" onChange={this.changeShopping} />
                                </CollectionItem>
                                <CollectionItem>
                                    <Checkbox value="No" label="Sightseeings" onChange={this.changeSightseeings} />
                                </CollectionItem>
                                <CollectionItem>
                                    <Checkbox value="No" label="Sea chilling" onChange={this.changeSeaChilling} />
                                </CollectionItem>
                <Button type="submit" onClick={this.onClick}>FIND COMP
                    <Link to={'/company'}></Link>
                    </Button>
<SearchedCompany users={this.state.filterUsers}/>
            </div>
        )
    }
}
