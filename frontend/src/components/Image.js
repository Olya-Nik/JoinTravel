import React from 'react'
import '../App.css'
import { Button } from 'react-materialize';
class Image extends React.Component {

    render(){
        return(
            <div>

            <input  type="file" placeholder="Download foto" onChange={this.props.fileSelected} />
            <img className="image" src={this.props.image} alt="" />
            
        </div>
        )
    }
}


export default Image