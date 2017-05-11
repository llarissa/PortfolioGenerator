import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Link from '../pages/index'
var file

export default class ImageUploading extends Component {

constructor(props) {
  super(props)
  this.state = {file: '',imagePreviewUrl:''}
}

 /*_handleSubmit(e) {
    e.preventDefault()
    console.log('handle uploading-', this.state.file)
  }
*/
  handleImageChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl}/>)
    } else {
      $imagePreview = (<h2 className="previewText">Your portfolio seems to be empty. Add your first image</h2>)
    }

return (

  <div>
    <div className="imgPreview">{$imagePreview}</div>
    <label className="uploadControls">Add Image
       <input className="addBtn" type="file" accept="image/*" onChange={(e)=>this.handleImageChange(e)} multiple/>
    </label>
  </div>   
)}

}

