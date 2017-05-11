import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../pages/layouts/layout'
import ImageUploading from '../pages/imageUploading'
import VideoUploading from '../pages/videoUploading'
import Save from '../pages/saveChanges'


export default class Edit extends Component {

constructor() {
    super()
    this.state = {
      Überschrift: null,
      Inhalt: null,
      Unterschrift: null
    }
  }
  
  

 render () {

    return <Layout>
      <Save>
      </Save>
      
         <div className = "title"> 
             <h1>Hier sollte der Name des Portfolioinhabers stehen</h1>
         </div>
    
          <ImageUploading >
          </ImageUploading>
      
          <VideoUploading>
          </VideoUploading>
      </Layout>
  }
}
