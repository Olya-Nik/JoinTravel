import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';
import {
  TextInput,
  Col,
  Row,
  Collection,
  CollectionItem,
  Checkbox,
  DatePicker,
  Select,
  Button
} from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
import '../App.css';
// import moment from 'moment'
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
            country: '',
            city: '',
            dateDepature: '',
            dateReturn: '',
            gastronomy: false,
            shopping: false,
            sightseeings: false,
            seaChilling: false,
            about: String,
            contacts: String,
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
    fileSelected = (e) => {
        this.setState({
<<<<<<< HEAD
            selectedFile: e.target.files[0]
        }, state => console.log(this.state.selectedFile))

=======
            selectedFile: e.target.files[0],
            image: URL.createObjectURL(e.target.files[0])
        })
>>>>>>> master
    }

    uploadImage = (e) => {
        this.setState({
<<<<<<< HEAD
            multerImage: URL.createObjectURL(this.state.selectedFile)
        });
        // console.log(imageFormObj)
        axios.post('http://localhost:3001/uploadimage', imageFormObj, {
            onUploadProgress: ProgressEvent => {
                console.log(ProgressEvent.loaded / ProgressEvent.total)
            }
        })
            .then((data) => {
                console.log(data)
                if (data.data.success) {
                    alert("Image SUCCESSSSS");
                }
            })
            .catch((err) => {
                alert("Error");
            });

=======
            image: URL.createObjectURL(this.state.selectedFile)
        });
>>>>>>> master
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
<<<<<<< HEAD

    onClick = async () => {
        const sendForm = {
            name: this.state.name,
            age: this.state.age,
            avatar: this.state.avatar,
            country: this.state.country,
            city: this.state.city,
            dateDepature: this.state.dateDepature,
            dateReturn: this.state.dateReturn,
            gastronomy: this.state.gastronomy,
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
                    Your foto <div>
                        <input type="file" placeholder="Download foto" onChange={this.fileSelected} />
                        <img src={this.state.multerImage} alt="uploading" />
                        <button onClick={this.uploadImage}>Upload</button>
                    </div>
=======
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
        imageFormObj.append("age", this.state.age)
        imageFormObj.append("country", this.state.country)
        imageFormObj.append("city", this.state.city)
        imageFormObj.append("dateDepature", this.state.dateDepature)
        imageFormObj.append("dateReturn", this.state.dateReturn)
        imageFormObj.append("gastronomy", this.state.gastronomy)
        imageFormObj.append("shopping", this.state.shopping)
        imageFormObj.append("about", this.state.about)
        imageFormObj.append("contacts", this.state.contacts)

    axios
      .post('http://localhost:3001/profilesend', imageFormObj)
      .then(data => {
        // console.log(data)
        if (data.data.success) {
          alert('Image');
        }
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
                    <TextInput label="Your name" placeholder="Your name" onChange={this.changeName} />
                    Your age<TextInput placeholder="Your age" onChange={this.changeAge} />
                    Your foto <Image image={this.state.image} fileSelected={this.fileSelected} uploadImage={this.uploadImage} />
>>>>>>> master
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
                               
                    Some words about you<TextInput placeholder="Abour you" onChange={this.changeAbout} />
                    Contacts<TextInput placeholder="Your contacts" onChange={this.changeContacts} />
                    <Button type="submit" onClick={this.onClick}>SAVE
                    {/* <Link to={'/company'}></Link> */}
                    </Button>
                </div>
    );
  }
}

export default Profile;
