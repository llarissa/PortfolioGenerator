import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Link from '../pages/index'
var files

export default class ImageUploading extends Component {
       static async getInitialProps ({req, query}) {
        const user = req && req.session ? req.session.decodedToken : null
        const snap = await req.firebaseServer.database().ref('messages/' + query.id).once('value')
     
        return { user, Portf: snap.val() }
    }

constructor(props) {
  super(props)
  this.state = {
    user : this.props.user,
    Portf : this.props.Portf,
    file: '',imagePreviewUrl:'', i : 0}    
    this.images = []    
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
      this.handleUpload(files[counter]);          
      counter++;

      if (counter < files.length)
      {
       reader.readAsDataURL(files[counter])
      }      
      else
      {
        this.setState({i : this.state.i++});        
      }

    }
    counter = 0;
    reader.readAsDataURL(files[counter])
  }

list_pictures()
{
  let {imagePreviewUrl} = this.state;
  if (imagePreviewUrl) 
  {         
    let key = 0;
            return this.images.map((image) => {
            key++;

            return(
                <img key={key} src={image}/>
            );
        });
       
  } else
  {
    return(<h2 className="previewText">Your portfolio seems to be empty. Add your first image</h2>)
  } 
}

handleUpload(file){  
  //Daten Firebase-Storage speichern  
var filename = file.name
var storageRef = firebase.storage().ref('Images/'+ filename)
var uploadTask = storageRef.put(file)
console.log('file', file)

  //Dateien im Storage mit Database verknüpfen
 
	uploadTask.on('state_changed', (snapshot) => {},
	     // Handle unsuccessful uploads
       (error) => {console.log('upload error:', error)},
       // Handle successful uploads on complete
() => {
	   var downloadURL = uploadTask.snapshot.downloadURL 
     let PID = "1495228054388";   
     const imageID = new Date().getTime()
     firebase.database().ref('messages/' + PID + '/images/' + imageID).set({
                    id: imageID,                   
                    Text: '',
                    image: downloadURL
                  });                        

console.log('url:', downloadURL)
})
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

