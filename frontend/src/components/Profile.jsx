import React from 'react'
import { TextInput, Col, Icon, Row, Collection, CollectionItem, Pickers, Checkbox, DatePicker, Select, Pagination, Button } from 'react-materialize'
import 'materialize-css/dist/css/materialize.min.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            avatar: '',
            country: '',
            city: '',
            gastronomy: false
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
        this.setState({
            country: e.target.value
        })
    }
    changeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    changeDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }
    changeBudgetPerDay = (e) => {
        this.setState({
            budgetPerDay: e.target.value
        })
    }
    changeGastronomy = (e) => {
        this.setState({
            gastronomy: true
        })
    }
    changeShopping = (e) => {
        this.setState({
            shopping: e.target.value
        })
    }
    changeSightseeings = (e) => {
        this.setState({
            sightseengs: e.target.value
        })
    }
    // handleChange = (e) => {
    //     this.setState({country: e.target.value})
    //     console.log(this.state)
    // }

    onClick = async () => {
        const sendForm = {
            name: this.state.name,
            age: this.state.age,
            avatar: this.state.avatar,
            country: this.state.country,
            city: this.state.city,
            startDate: this.state.startDate,
            gastronomy: this.state.gastronomy
        }
        await fetch('http://localhost:3001/profile', {
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
                    Country to visit<TextInput placeholder="What country are you going to visit?" onChange={this.changeCountry} />
                    City<TextInput placeholder="What place exactly?" onChange={this.changeCity} />
                    Dates <DatePicker placeholder="Choose dates" onChange={this.changeDate} />
                    {/* <Select browserDefault value="2" onChange={this.changeCountry}>
<option value="1">
Option 1
</option>
<option value="2">
Option 2
</option>
<option value="3">
Option 3
</option>
</Select> */}
                    {/* What is the purpose of your journey?
                    <Checkbox value={true} label="Gastronomy" />
                    <Checkbox value={true} label="Shopping" />
                    <Checkbox value={true} label="Sightseeings" />
                    <Checkbox value={true} label="Sea chilling" /> */}
                    <Row>
                        <Col m={6} s={12}>
                            <Collection header="What are you interested in">
                                <CollectionItem>
                                    <Checkbox value="Gastronomy" label="Gastronomy" onChange={this.changeGastronomy} />
                                </CollectionItem>
                                <CollectionItem>
                                    <Checkbox value="Shopping" label="Shopping" />
                                </CollectionItem>
                                <CollectionItem>
                                    <Checkbox value={true} label="Sightseeings" />
                                </CollectionItem>
                                <CollectionItem>
                                    <Checkbox value={true} label="Sea chilling" />
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
