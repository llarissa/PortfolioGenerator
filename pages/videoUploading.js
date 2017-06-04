import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Link from '../pages/index'
var files

export default class VideoUploading extends Component {

constructor(props) {
  super(props)
  this.state = {  
    videofilelist: {} ,
    file: '',videoPreviewUrl:''}        
    this.videos = []    
}

 handleVideoChange(e) {
    e.preventDefault()

    var counter
    let reader = new FileReader()
    files = e.target.files

    reader.onloadend = () => {
      this.setState({
        file: this.state.files,
        videoPreviewUrl: reader.result
      })
    

      this.videos.push(reader.result);      
      
      counter++;

      if (counter < files.length)
      {
       reader.readAsDataURL(files[counter])
      }      
      else
      {        
        this.setState({videofilelist : files});
      }

    }
    counter = 0;
    reader.readAsDataURL(files[counter])
  }

list_videos()
{  
  let {videoPreviewUrl} = this.state;
  if (videoPreviewUrl) 
  {         
    let key = 0;
            return this.videos.map((video) => {
            key++;            

            return(
                <video key={key} src={video} controls/>                   
            );
        });               
  } else
  {
    return('')
  } 
}
render () {
     return (
    <div>
      <div className="vidPreview">{this.list_videos()}</div>
  <label className="uploadControls">Add Video
  <input className="addBtn" type="file" accept="video/avi, video/mov, video/*" onChange={(e)=>this.handleVideoChange(e)} multiple/>
  </label>
  </div>
     )}
 }