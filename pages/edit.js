import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../pages/layouts/layout'



export default class Edit extends Component {


 render () {
   


    return <Layout>
  
      {
        <div>
            
            <button onClick={this.Edit}>Zurück</button>

            <button onClick={this.Edit}>Änderungen speichern</button>

            <h3> Überschrift EP </h3>   
            
            <p> Textblock EP </p>
            
            <p> Unterschrift EP </p>

        </div>
      }


    </Layout>

 
}
}
