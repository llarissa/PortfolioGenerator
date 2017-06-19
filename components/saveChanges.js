import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import ImageUploading from '../components/imageUploading.js'
import VideoUploading from '../components/videoUploading.js'

var img_files
var img_text
var vid_files
var vid_text

export default class Save extends Component {

constructor(props) {
    super(props)
      this.state = { render_now : 0 }      
}

  handleUploader(e) {
    e.preventDefault()    

    img_files = this.imgUploader.state.imagefilelist; 
    img_text = this.imgUploader.state.imagetext;
    vid_files = this.vidUploader.state.videofilelist;  
    vid_text =  this.vidUploader.state.videotext;

    for(var i=0; i < img_files.length; i++){        
        var filename = img_files[i].name
        var storageRef = firebase.storage().ref('Images/'+ this.props.user_ID + '/' + filename)
        var uploadTask = storageRef.put(img_files[i])
        console.log('file', img_files[i])

          //Dateien im Storage mit Database verknüpfen
 
	      uploadTask.on('state_changed', (snapshot) => {
            var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log(percent + "% done");
        },
	       // Handle unsuccessful uploads
       (error) => {console.log('upload error:', error)},
        // Handle successful uploads on complete
        (complete) => {
            var downloadURL = uploadTask.snapshot.downloadURL 
            let PID = this.props.user_ID;   
            const imageID = new Date().getTime()
            firebase.database().ref('messages/' + PID + '/images/' + imageID).set({
                            id: imageID,                   
                            Text: img_text,
                            image: downloadURL
                          });                        
                                  
        console.log('url:', downloadURL)
        })
        this.setState({render_now : this.state.render_now++});        
      }  

    for(var i=0; i < vid_files.length; i++){        
        var filename = vid_files[i].name
        var storageRef = firebase.storage().ref('Videos/'+ this.props.user_ID + '/' + filename)
        var uploadTask = storageRef.put(vid_files[i])
        console.log('file', vid_files[i])

          //Dateien im Storage mit Database verknüpfen
 
	      uploadTask.on('state_changed', (snapshot) => {
            var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log(percent + "% done");
        },
	       // Handle unsuccessful uploads
       (error) => {console.log('upload error:', error)},
        // Handle successful uploads on complete
        (complete) => {
            var downloadURL = uploadTask.snapshot.downloadURL 
            let PID = this.props.user_ID;   
            const videoID = new Date().getTime()
            firebase.database().ref('messages/' + PID + '/videos/' + videoID).set({
                            id: videoID, 
                            Text: vid_text,
                            video: downloadURL
                          });                        
                                  
        console.log('url:', downloadURL)
        })
        this.setState({render_now : this.state.render_now++});        
      }              
      //window.location = './portfolio?id='+ this.props.user_ID;                     
  }

render () {
    return <div>
      <button className ="saveChanges" type="button" onClick={(e)=>this.handleUploader(e)}>upload media</button>
      <ImageUploading ref={(imgUploader) => { this.imgUploader = imgUploader}}></ImageUploading>      
      <VideoUploading ref={(vidUploader) => { this.vidUploader = vidUploader}}></VideoUploading>
    </div>
}}
                  