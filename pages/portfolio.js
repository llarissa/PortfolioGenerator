import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../pages/layouts/layout'
import Link from '../pages/index'

export default class Portfolio extends Component {

constructor(props) {
  super(props)
  this.state = {file: '',imagePreviewUrl:''}
}

 _handleSubmit(e) {
    e.preventDefault()
    console.log('handle uploading-', this.state.file)
  }

  _handleImageChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

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
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Your portfolio seems to be empty. Add your first image</div>);
    }

return (
<Layout>
  <div className = "title"> 
      <h1>Hier sollte der Name des Portfolioinhabers stehen</h1>
  </div>

  <div>
    <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
    </form>
      <div className="imgPreview">
          {$imagePreview}     
      </div>
    </div>   
      </Layout>
)}

}

