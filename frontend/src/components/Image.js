import React from 'react'
import '../App.css'
import { Button } from 'react-materialize';
class Image extends React.Component {

    render(){
        return(
            <div>
            <input type="file" style={{fontSize: "40px"}} placeholder="Download foto" onChange={this.props.fileSelected} />
            <img className="image" src={this.props.image} alt="" />
            <Button onClick={this.props.uploadImage}>Upload</Button>
        </div>
        )
    }
}


export default Image