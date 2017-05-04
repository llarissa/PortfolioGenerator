import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../pages/layouts/layout'
import Link from '../pages/index'

export default class Portfolio extends Component {

  render() {
return (
<Layout>
  <div className = "title"> 
      <h1>Portfolio-Title</h1>

</div>

<div>
    <br></br>
    <button onClick={this.Portfolio}>Add project</button>
</div>   
      </Layout>
)}

}
