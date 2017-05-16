import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Link from '../pages/index'
import Layout from '../pages/layouts/layout'




export default class textEditing extends Component {

   constructor() {
    super();
    this.state = {
      name: '',
    };
  

  }
  

onChange(e) {
    this.setState({ inputValue: e.target.value });
  }


adjustHeight(el){
    el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "60px";
}


render() {
    return (
      <div>
               <br></br>
        <input
          type="text"
          placeholder="Überschrift"
          value={this.state.name}
          onChange={this.onChange}
        />
                <br></br>
                <br></br>

                    <textarea 
                    placeholder="Inhalt" 
                    id="textarea" 
                    value={this.state.name} 
                    onChange={this.onChange} />

                        <br></br>
                        <br></br>

        <input
          type="text"
          placeholder="Unterschrift"
          value={this.state.name}
          onChange={this.onChange}
        />
                        <br></br>

      </div>
    );
  }
}
