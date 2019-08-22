import React from 'react'
import { TextInput, Pickers, DatePicker, Select, Button } from 'react-materialize'
import 'materialize-css/dist/css/materialize.min.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            avatar: '',
            country: '',
            city: ''
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
            gastronomy: e.target.value
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
            city: this.state.city
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
                    <TextInput placeholder="Your name" onChange={this.changeName} />
                    <TextInput placeholder="Your age" onChange={this.changeAge} />
                    <TextInput placeholder="Download foto" onChange={this.changeAvatar} />
                    <TextInput placeholder="What country are you going to visit?" onChange={this.changeCountry} />
                    <TextInput placeholder="Do you know what place exactly?" onChange={this.changeCity} />
                    {/* <Select value="" className="browser-default" onChange={this.handleChange}>
                        <option value="">
                            Choose your option
                        </option>
                        <option value="1">
                            Option 1
                        </option>
                        <option value="2">
                            Option 2
                        </option>
                        <option value="3">
                            Option 3
                        </option>
                    </Select > */}
                    <Button type="submit" onClick={this.onClick}>Send</Button>                   
                </form>




            </div>
        )
    }
}

export default Profile