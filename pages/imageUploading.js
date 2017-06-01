import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Link from '../pages/index'
var files;

export default class ImageUploading extends Component {

constructor(props) {
  super(props)
  this.state = {  
    imagefilelist: {} ,
    file: '',imagePreviewUrl:''}        
    this.images = []    
}

deleteImage (e) {

  var key = e.target.getAttribute("data");
  console.log(key);
  this.images.splice(key, 1);

  this.setState({images:this.images})                            

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
        this.setState({imagefilelist : files});
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
    let key = -1;
            return this.images.map((image) => {
            key++;            

            return(
              <div key={key}>
                <img src={image}/>
                <button data={key} className="deleteButton" onClick={(e)=>this.deleteImage(e)}>x</button>
              </div>
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

