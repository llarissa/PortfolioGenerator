import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../pages/layouts/layout'
import ImageUploading from '../pages/imageUploading'


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
      <ImageUploading >
      </ImageUploading>
      </Layout>
  }
}
