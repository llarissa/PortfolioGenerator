import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Link from '../pages/index'
var files

export default class ImageUploading extends Component {

constructor(props) {
  super(props)
  this.state = {  
    imagefilelist: {} ,
    imagetext: '',
    value: '',
    file: '',imagePreviewUrl:''}        
    this.images = [], 
    this.handleChange = this.handleChange.bind(this)
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

handleChange (event) {
    this.setState({ value: event.target.value })   
    this.setState({imagetext : event.target.value});
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
                <textarea data={key} placeholder='Bildbeschriftung' 
                    id="textarea" value={this.state.value} 
                    onChange={this.handleChange}>
                </textarea>    
                <button data={key} className="deleteButton" onClick={(e)=>this.deleteImage(e)}>x</button>
              </div>
            );
        });       
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