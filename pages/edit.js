import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../pages/layouts/layout'



export default class Edit extends Component {

constructor() {
    super();
    this.state = {
      Überschrift: null,
      Inhalt: null,
      Unterschrift: null
    };
    
    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

 publish() {
    console.log( this.state.Überschrift, this.state.Inhalt, this.state.Unterschrift );
  }

 render () {
    return <Layout>
      <div>
        <input 
        type="text" 
        name="Überschrift" 
        placeholder="Überschrift..." 
        value={ this.state.Überschrift }
        onChange={ this.handleChange } 
         /><br></br>
       <input 
        type="text" 
        name="Inhalt" 
        placeholder="Inhalt..."
        value={ this.state.Inhalt } 
        onChange={ this.handleChange } 
         />
         <br></br>
       <input 
        type="text" 
        name="Unterschrift" 
        placeholder="Unterschrift..."
        value={ this.state.Unterschrift } 
        onChange={ this.handleChange } 
          />
   <br></br>
   <button onClick={this.Edit}>Löschen</button>
   <br></br>
   <button onClick={this.Edit}>Speichern</button>

   <style jsx>{`
      div {
        line-height: 44px;
      }
    `}
    </style>

    
    </div>
      </Layout>


}
}
