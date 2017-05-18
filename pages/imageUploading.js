import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Link from '../pages/index'
var files

export default class ImageUploading extends Component {

constructor(props) {
  super(props)
  this.state = {file: '',imagePreviewUrl:'', i : 0}
  this.images = [];
}

  handleImageChange(e) {
    e.preventDefault()
    
    var counter;
    let reader = new FileReader();   
    files = e.target.files;             

    reader.onloadend = () => {
      this.setState({
        file: this.state.files,
        imagePreviewUrl: reader.result
      })   

      this.images.push(reader.result);

      counter++;

      if (counter < files.length)
      {
       reader.readAsDataURL(files[counter])
      }      
      else
      {
        this.setState({i : this.state.i++});        
      }

    }
    counter = 0;
    reader.readAsDataURL(files[counter])
  }

list_pictures()
{
  let {imagePreviewUrl} = this.state;
  if (imagePreviewUrl) 
  {         
    let key = 0;
            return this.images.map((image) => {
            key++;

            return(
                <img key={key} src={image}/>
            );
        });
       
  } else
  {
    return(<h2 className="previewText">Your portfolio seems to be empty. Add your first image</h2>)
  } 
}

  render() {
  return (
  <div>    
    <div className="imgPreview">{this.list_pictures()}</div>        
    <label className="uploadControls">Add Image
       <input className="addBtn" type="file" accept="image/*" onChange={(e)=>this.handleImageChange(e)} multiple/>
    </label>
  </div>   
)}

}

