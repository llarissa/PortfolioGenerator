import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'


export default class Save extends Component {

constructor() {
    super()
  }

handleUpload(e){
  //Daten Firebase-Storage speichern
var filename = file.name
var storageRef = firebase.storage().ref('/ImageUploads'+ filename)
var uploadRef = firebase.database().ref('/ImageUploads/uploads')
var uploadTask = storageRef.put(file)
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
console.log('url:', downloadURL)
})
storageRef.child(file.name).getDownloadURL().then((url) => {
var image = document.getElementById()
image.src = url
})
}

render () {
    return <div>
     <button type="button" onClick={(e)=>this.handleUpload(e)}>Änderungen speichern</button>
</div>
}


}
