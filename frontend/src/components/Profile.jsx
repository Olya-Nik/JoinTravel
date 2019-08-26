import React from 'react'
import { TextInput, Col, Row, Collection, CollectionItem, Checkbox, DatePicker, Select, Button } from 'react-materialize'
import 'materialize-css/dist/css/materialize.min.css'
// import moment from 'moment'
// import 'moment/locale/ru';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            avatar: '',
            country: '',
            city: '',
            dateDepature: '',
            dateReturn: '',
            gastronomy: false,
            shopping: false,
            sightseeings: false,
            seaChilling: false,
        }
    }
    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    changeAge = (e) => {
        this.setState({
            age: e.target.value
        })
    }
    changeAvatar = (e) => {
        this.setState({
            avatar: e.target.value
        })
    }
    changeCountry = (e) => {
        console.log(e.target.value)
        this.setState({
            country: e.target.value
        })
    }
    changeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    changeDateDepature = (e) => {
        // const dateStart = moment(e).format('D/M/Y')
        // console.log(dateStart)
        this.setState({
            dateDepature: e
        })
    }
    changeDateReturn = (e) => {
        this.setState({
            dateReturn: e
        })
    }
    changeBudgetPerDay = (e) => {
        this.setState({
            budgetPerDay: e.target.value
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
    
    onClick = async () => {
        const sendForm = {
            name: this.state.name,
            age: this.state.age,
            avatar: this.state.avatar,
            country: this.state.country,
            city: this.state.city,
            dateDepature: this.state.dateDepature,
            dateReturn: this.state.dateReturn,
            gastronomy:this.state.gastronomy,
            shopping: this.state.shopping,
            sightseeings: this.state.sightseeings,
            seaChilling: this.state.seaChilling

            
        }
        console.log(sendForm)
        await fetch('http://localhost:3001/profilesend', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendForm)
        })
    }
    
    
    render() {
        return (
            <div>
                <form>
                    <TextInput label="Your name" placeholder="Your name" onChange={this.changeName} />
                    Your age<TextInput placeholder="Your age" onChange={this.changeAge} />
                    Your foto<TextInput placeholder="Download foto" onChange={this.changeAvatar} />
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
                    City<TextInput placeholder="What place exactly?" onChange={this.changeCity} />
                    Date of depature <DatePicker placeholder="Choose dates" onChange={this.changeDateDepature} />
                    Date of retutn <DatePicker placeholder="Choose dates" onChange={this.changeDateReturn} />
                    <Row>
                        <Col m={6} s={12}>
                            <Collection header="What are you interested in">
                                <CollectionItem>
                                    <Checkbox value="No" label="Gastronomy" onChange={this.changeGastronomy} />
                                </CollectionItem>
                                <CollectionItem>
                                    <Checkbox value="No" label="Shopping" onChange={this.changeShopping}/>
                                </CollectionItem>
                                <CollectionItem>
                                    <Checkbox value="No" label="Sightseeings" onChange={this.changeSightseeings}/>
                                </CollectionItem>
                                <CollectionItem>
                                    <Checkbox value="No" label="Sea chilling" onChange={this.changeSeaChilling}/>
                                </CollectionItem>
                            </Collection>
                        </Col>
                    </Row>
                    <Button type="submit" onClick={this.onClick}>Send</Button>
                </form>




            </div>
        )
    }
}

export default Profile;
