import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Link from '../pages/index'
var file

export default class VideoUploading extends Component {

constructor(props) {
  super(props)
  this.state = {file: '',videoPreviewUrl:''}
}

 handleVideoChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        videoPreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

 render() {
   let {videoPreviewUrl} = this.state
    let $videoPreview = null
    if (videoPreviewUrl) {
    $videoPreview = (<video src={videoPreviewUrl} controls/>)
  }
  else{
   $videoPreview = ''
  }
     return (
    <div>
      <div className="vidPreview">
        {$videoPreview}
      </div>
  <label className="uploadControls">Add Video
  <input className="addBtn" type="file" accept="video/*" onChange={(e)=>this.handleVideoChange(e)} multiple/>
  </label>
  </div>
     )}
 }