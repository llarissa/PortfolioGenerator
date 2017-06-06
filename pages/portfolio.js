import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../pages/layouts/layout'
import Link from '../pages/index'

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

  constructor(props)
  {
    super(props)
      this.state = {
      user: this.props.user,
      value: '',
      messages: this.props.messages
  }
    this.addDbListener = this.addDbListener.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    if(firebase.apps.length === 0)
    {
      firebase.initializeApp(clientCredentials)
    }

    if (this.state.user) this.addDbListener()    

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
      text: this.state.value
    })
    this.setState({ value: '' })
  }

   handleClick(e) {
    e.preventDefault(); 
  }

    showImages()
    {
        let imageList = this.state.messages[this.props.url.query.id].images;
        if (!imageList) imageList = {};     
        let key = 0;   

        return Object.keys(imageList).map((element) => {
            
            let image = imageList[element].image;   
            key++;         

            return(
                <img key={key} src={image}/>
            )
        })
    }

     showVideos()
    {
        let videoList = this.state.messages[this.props.url.query.id].videos;
        if (!videoList) videoList = {};     
        let key = 0;   

        return Object.keys(videoList).map((element) => {
            
            let video = videoList[element].video;   
            key++;         

            return(
                <video key={key} src={video}/>
            )
        })
    }

  render() {
    const { messages } = this.state

    return (
    <Layout>
      <div className = "title">         
                    {messages && Object.keys(messages).map(key => 
                <h1 key={this.props.url.query.id}>
                    {messages[this.props.url.query.id].text}                 
                </h1>)}
      </div> 

              <div>
                  {this.showImages()}
              </div> 

              <div>
                  {this.showVideos()}
              </div> 

          <form action="../edit" method="GET">
          <button name="id" value={this.props.url.query.id} type="submit">Edit </button> 
          </form>

      <ul>
      </ul> 
      </Layout>
)}
}
