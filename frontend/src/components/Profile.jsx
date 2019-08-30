import React from 'react';
import Image from './Image';
import {
  TextInput,
  Checkbox,
  DatePicker,
  Select,
  Button
} from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
import '../App.css';
import moment from 'moment'
// import 'moment/locale/ru';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            name: '',
            age: '',
            imageName: '',
            imageData: '',
            image: '',
            parts: [],
            part: '',
            countries: [],
            country: '',
            regions: [],
            region: '',
            city: '',
            dateDepature: '',
            dateReturn: '',
            budgetPerDay: '',
            gastronomy: false,
            shopping: false,
            sightseeings: false,
            seaChilling: false,
            about: String,
            contacts: String,
            apicountries: {}

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

    changePart = async (e) => {
        this.setState({
            part: e.target.value
        }, ()=>this.chooseCountry())      
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    fileSelected = (e) => {
        this.setState({
            selectedFile: e.target.files[0],
            image: URL.createObjectURL(e.target.files[0])
        })
    }

    uploadImage = (e) => {
        this.setState({
            image: URL.createObjectURL(this.state.selectedFile)
        });
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
        }, ()=>this.chooseRegion())
    }
    chooseRegion = async () => {
        const idArr = this.state.country.split(' ')
        const id = idArr[idArr.length-1]
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
    changeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    changeDateDepature = (e) => {
        // const dateStart = moment(e).format('D/M/Y')
        // console.log(dateStart)
        this.setState({
            dateDepature: moment(e).format("DD MMM YYYY")
        })
    }
    changeDateReturn = (e) => {
        this.setState({
            dateReturn: moment(e).format("DD MMM YYYY")
        })
    }
    changeBudget = (e) => {

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
    changeAbout = (e) => {
        this.setState({
            about: e.target.value
        })
    }
    changeContacts = (e) => {
        this.setState({
            contacts: e.target.value
        })
    }

    onClick = async () => {
        let imageFormObj = new FormData();
        imageFormObj.append("imageName", "multer-image-" + Date.now());
        imageFormObj.append("imageData", this.state.selectedFile, this.state.selectedFile.name);
        imageFormObj.append("image", this.state.image)
        imageFormObj.append("name", this.state.name)
        imageFormObj.append("country", this.state.country)
        imageFormObj.append("city", this.state.city)
        imageFormObj.append("dateDepature", this.state.dateDepature)
        imageFormObj.append("dateReturn", this.state.dateReturn)
        imageFormObj.append("budgetPerDay", this.state.budgetPerDay)
        imageFormObj.append("gastronomy", this.state.gastronomy)
        imageFormObj.append("shopping", this.state.shopping)
        imageFormObj.append("sightseeings", this.state.sightseeings)
        imageFormObj.append("seaChilling", this.state.seaChilling)
        imageFormObj.append("about", this.state.about)
        imageFormObj.append("contacts", this.state.contacts)

    axios.post('http://localhost:3001/profilesend', imageFormObj)
      .then(data => {
        console.log(data)
    //     if (data.data.success) {
    //       alert('Image');
    //     }
      })
      .catch(err => {
        alert('Error');
      });
    this.setState({
      image: URL.createObjectURL(this.state.selectedFile)
    });
    this.props.history.push('/company');
  };
        render() {
            return (
                <div className="formProfile">

                    Your name<TextInput placeholder="Your name" onChange={this.changeName} />
                    Your foto <Image image={this.state.image} fileSelected={this.fileSelected} uploadImage={this.uploadImage} />
                    Country to visit
                    <Select defaultValue="" onChange={this.changePart}>
                    <option value="" disabled>
                        Choose part
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
                City<TextInput placeholder="What place exactly?" onChange={this.changeCity} />
                Date of depature <DatePicker placeholder="Choose dates" onChange={this.changeDateDepature} />
                Date of return <DatePicker placeholder="Choose dates" onChange={this.changeDateReturn} />
                Budget per day<Select defaultValue="" onChange={this.changeBudget}>
                    <option value="" disabled>
                        Your budget

                    </option>
                    <option value="100">
                        100$
                    </option>
                    <option value="100-200">
                        100-200$
                    </option>
                    <option value="200 and more">
                        200$ and more
                    </option>
                </Select>
                <Checkbox value="No" label="Gastronomy" onChange={this.changeGastronomy} />
                <Checkbox value="No" label="Shopping" onChange={this.changeShopping} />
                <Checkbox value="No" label="Sightseeings" onChange={this.changeSightseeings} />
                <Checkbox value="No" label="Sea chilling" onChange={this.changeSeaChilling} />

                
                Some words about you<TextInput placeholder="About you" onChange={this.changeAbout} />
                    
                Contacts<TextInput placeholder="Your contacts" onChange={this.changeContacts} />
                <Button type="submit" onClick={this.onClick}>SAVE
                    {/* <Link to={'/company'}></Link> */}
                </Button>
            </div>
        );
    }
}

export default Profile;
