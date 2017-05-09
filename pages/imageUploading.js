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

handleUpload(e){
  //Daten Firebase-Storage speichern
var filename = file.name
var storageRef = firebase.storage().ref('/ImageUploads')
var uploadRef = firebase.database().ref('/ImageUploads/uploads')
var uploadTask = storageRef.child(file.name).put(file)
console.log('file', file)

  //Dateien im Storage mit Database verknüpfen
 
	uploadTask.on('state_changed', (snapshot) => {},
	     // Handle unsuccessful uploads
       (error) => {
       console.log('upload error:', error)},
       // Handle successful uploads on complete
	     () => {
	    var postKey = firebase.database().ref('Posts/').push().key
      var downloadURL = uploadTask.snapshot.downloadURL
      var updates = {}
      var postData = {
         url: downloadURL,
         filename: filename,
         user: this.user
      }
updates ['/Posts/'+postKey] = postData
firebase.database().ref().update(updates)
})
}

  render() {
     let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<h2 className="previewText">Your portfolio seems to be empty. Add your first image</h2>);
    }

return (
<div>
  <div className = "title"> 
      <h1>Hier sollte der Name des Portfolioinhabers stehen</h1>
  </div>

  <div>
    <div className="imgPreview">
          {$imagePreview}     
    </div>
  <input type="file" onChange={(e)=>this.handleImageChange(e)} multiple/>
  <button type="button" onClick={(e)=>this.handleUpload(e)}>Upload</button>
   
    </div>   

</div>
)}

}

