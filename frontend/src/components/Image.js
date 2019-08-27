import React from 'react'
import '../App.css'
class Image extends React.Component {

    render(){
        return(
            <div>
            <input type="file" placeholder="Download foto" onChange={this.props.fileSelected} />
            <img className="image" src={this.props.image} alt="jpg" />
            <button onClick={this.props.uploadImage}>Upload</button>
        </div>
        )
    }
}


export default Image