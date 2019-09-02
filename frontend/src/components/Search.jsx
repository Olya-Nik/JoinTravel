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
            parts: [],
            part: '',
            countries: [],
            country: '',
            regions: [],
            region: '',
            gastronomy: false,
            shopping: false,
            sightseeings: false,
            seaChilling: false,
            budgetPerDay: '',
            filterUsers: [],
        }
    }
    async componentDidMount() {
        const resp = await fetch('http://htmlweb.ru/geo/api.php?locations&json&api_key=7464b9d209e6dcb1d5ebaa5a587c784e')

        const parts = await resp.json()
        const arr = Object.keys(parts).map(function (key) {
            return [Number(key), parts[key]]
        })

        this.setState({
            parts: arr,

        })
        console.log(arr)
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
    changePart = async (e) => {
        this.setState({
            part: e.target.value
        }, () => this.chooseCountry())
    }
    chooseCountry = async () => {
        const resp1 = await fetch(`http://htmlweb.ru/geo/api.php?location=${this.state.part}&json&api_key=7464b9d209e6dcb1d5ebaa5a587c784e`)
        const countries = await resp1.json()
        const arr1 = Object.keys(countries).map(function (key) {
            return [Number(key), countries[key]]
        })
        console.log(arr1)
        this.setState({
            countries: arr1
        })
    }
    changeCountry = async (e) => {
        this.setState({
            country: e.target.value
        }, () => this.chooseRegion())
    }
    chooseRegion = async () => {
        const idArr = this.state.country.split(' ')
        const id = idArr[idArr.length - 1]
        console.log(this.state.country)
        const resp2 = await fetch(`http://htmlweb.ru/geo/api.php?country=${id}&json&api_key=7464b9d209e6dcb1d5ebaa5a587c784e`)
        const regions = await resp2.json()
        console.log(regions)
        const arr2 = Object.keys(regions).map(function (key) {
            return [Number(key), regions[key]]
        })
        console.log(arr2)
        this.setState({
            regions: arr2
        })
    }
    changeRegion = async (e) => {
        this.setState({
            region: e.target.value
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
        const resp = await fetch('http://localhost:3001/filter', {
            method: 'POST',
            credentials: 'include',
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
                <Select defaultValue="" onChange={this.changePart}>
                    <option value="" disabled>
                        Choose Materic
                    </option>
                    {this.state.parts ? this.state.parts.map((part) =>
                        <option value={`${part[1]}`}>
                            {part[1]}
                        </option>
                    ) : null}
                </Select>

                <Select defaultValue="" onChange={this.changeCountry}>
                    <option value="" disabled>
                        Choose country
                        </option>
                    {this.state.countries ? this.state.countries.map((country) =>
                        <option value={`${country[1].name} ${country[1].id}`} >
                            {`${country[1].name} ${country[1].id}`}
                        </option>
                    ) : null}
                </Select>

                <Select defaultValue="" onChange={this.changeRegion}>
                    <option value="" disabled>
                        Choose region
    </option>
                    {this.state.regions ? this.state.regions.map((region) =>
                        <option value={`${region[1].name}`} >
                            {region[1].name}
                        </option>
                    ) : null}
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
                <SearchedCompany users={this.state.filterUsers} />
            </div>
        )
    }
}
