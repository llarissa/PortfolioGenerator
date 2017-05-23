import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import ImageUploading from './imageUploading.js'
var files;

export default class Save extends Component {

constructor(props) {
    super(props)
      this.state = { render_now : 0 }
      this.databaseWriter = this.databaseWriter.bind(this)
}

  handleUploader(e) {
    e.preventDefault()    

    files = this.imgUploader.state.imagefilelist; 

    for(var i=0; i < files.length; i++){        
        var filename = files[i].name
        var storageRef = firebase.storage().ref('Images/'+ filename)
        var uploadTask = storageRef.put(files[i])
        console.log('file', files[i])

          //Dateien im Storage mit Database verknüpfen
 
	      uploadTask.on('state_changed', (snapshot) => {},
	       // Handle unsuccessful uploads
       (error) => {console.log('upload error:', error)},
        // Handle successful uploads on complete
        () => {
            var downloadURL = uploadTask.snapshot.downloadURL 
            let PID = this.props.user_ID;   
            const imageID = new Date().getTime()
            firebase.database().ref('messages/' + PID + '/images/' + imageID).set({
                            id: imageID,                   
                            Text: '',
                            image: downloadURL
                          });                        
                                  
        console.log('url:', downloadURL)
        })
        this.setState({render_now : this.state.render_now++});
        }                         
  }

databaseWriter(file) {  
  //Daten Firebase-Storage speichern         

}

render () {
    return <div>
      <button type="button" onClick={(e)=>this.handleUploader(e)}>Änderungen speichern</button>
      <ImageUploading ref={(imgUploader) => { this.imgUploader = imgUploader}}></ImageUploading>
    </div>
}}
