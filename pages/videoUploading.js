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

deleteVideo (e) {

  var key = e.target.getAttribute("data");
  console.log(key);
  this.videos.splice(key, 1);

  this.setState({videos:this.videos})                            

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
    let key = -1;
            return this.videos.map((video) => {
            key++;            

            return(
               <div key={key}>
                <video src={video} controls/>     
                <button data={key} className="deleteButton" onClick={(e)=>this.deleteVideo(e)}>x</button>  
                </div>            
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