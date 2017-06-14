import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../components/layouts/layout'
import Link from 'next/link'

var guest_auth;

export default class Index extends Component {
  static async getInitialProps ({req, query}) {
    const user = req && req.session ? req.session.decodedToken : null    
    let inspList = null;
    if(req && req.firebaseServer)
    {          
    const snap = await req.firebaseServer.database().ref('messages').once('value') //db änderung handler
    inspList = snap.val();
    }
    return { user, messages: inspList }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,      
      value: '',
      messages: this.props.messages,      
    }    
    this.addDbListener = this.addDbListener.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)    
  }

  componentDidMount () {
    if(firebase.apps.length === 0)
    {
      firebase.initializeApp(clientCredentials)      
    }

    if (this.state.user) this.addDbListener()    

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        guest_auth = user.isAnonymous;
        this.setState({ user: user })
        return user.getToken()
          .then((token) => {
            // eslint-disable-next-line no-undef
            return fetch('/api/login', {
              method: 'POST',
              // eslint-disable-next-line no-undef
              headers: new Headers({ 'Content-Type': 'application/json' }),
              credentials: 'same-origin',
              body: JSON.stringify({ token })
            })
          }).then((res) => this.addDbListener())
      } else {
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        }).then(() => firebase.database().ref('messages').off())
      }
    })
  }

  addDbListener () {
    firebase.database().ref('messages').on('value', snap => {
      const messages = snap.val()
      if (messages) this.setState({ messages })
    })
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    const date = new Date().getTime()
    firebase.database().ref(`messages/${date}`).set({      
      id: date,
      text: this.state.value,
      headline: 'Überschrift',
      signature: 'Unterschrift'
    })
    this.setState({ value: '' })
  }

  handleLogin () {        
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  guest_handleLogin () {               
    firebase.auth().signInAnonymously().catch(function(error) {  
    var errorCode = error.code;
    var errorMessage = error.message;  
    console.log(errorCode + " - " + errorMessage)    
  });  
  }

  handleLogout () {    
    firebase.auth().signOut()    
    }

  render () {
    const {user, value, messages} = this.state      
    let aut_stat, guest_stat;      

    if (guest_auth)
    {
      guest_stat = (<h2 className="guest_auth">Gastaccount</h2>);
    }
    else
    {
      aut_stat = (
          <form onSubmit={this.handleSubmit}>
            <input
              type={'text'}
              onChange={this.handleChange}
              placeholder={'enter your name'}
              value={value}/>
          </form>)
    }

    return <Layout>  
      {<button className="gast_Login" onClick={this.guest_handleLogin}>Gastaccount</button>} 
      {       
        user        
        ? <button className="Logout" onClick={this.handleLogout}>Logout</button>
        : <button className="Login" onClick={this.handleLogin}>Login</button>               
      }             
          <h1>Portfolio Generator</h1>           
          {guest_stat}         
          <p>If your name isn't listed below, please create a new portfolio</p>               
      {
       user &&
        <div>              
          {aut_stat}                
          <ul>
            {
              messages &&
              Object.keys(messages).map(key => 
                <li key={key}>
                  <Link href={"/portfolio?id=" + messages[key].id}> 
                    <a>{messages[key].text}</a>
                  </Link>
                </li>)
            }
          </ul>
        </div>
      }
    </Layout>
  }
}