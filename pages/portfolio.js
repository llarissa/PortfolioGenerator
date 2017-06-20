import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../components/layouts/layout'
import Link from '../pages/index'

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
      text: this.state.value
    })
    this.setState({ value: '' })
  }

   handleClick(e) {
    e.preventDefault(); 
  }

  showheadline()
  {
    if(!this.state.messages) return;

    let headline = this.state.messages[this.props.url.query.id].headline;    

            return(
              <div>
                <h2> {headline} </h2>
              </div>
            )        
  }

  showsignature()
  {
    if(!this.state.messages) return;

    let signat = this.state.messages[this.props.url.query.id].signature;                            

            return(
              <div>
                <h3> {signat} </h3>
              </div>
            )        
  }

    showImages()
    {
      if(!this.state.messages) return;

        let imageList = this.state.messages[this.props.url.query.id].images;
        if (!imageList) imageList = {};               

        return Object.keys(imageList).map((element) => {
            
            let image = imageList[element].image;   
            let image_text = imageList[element].Text;                     

            return(
              <div>
                <img src={image}/>
                <br></br>
                <h3>{image_text}</h3>
              </div>
            )
        })
    }

    showEdit()
    {
      if(!guest_auth)
      {
      return(
          <form action="../edit" method="GET">
          <button name="id" value={this.props.url.query.id} type="submit">Edit </button> 
          </form>
      )
      }
    }

     showVideos()
    {
       if(!this.state.messages) return;

        let videoList = this.state.messages[this.props.url.query.id].videos;
        if (!videoList) videoList = {};              

        return Object.keys(videoList).map((element) => {
            
            let video = videoList[element].video;   
            let video_text = videoList[element].Text;                    

            return(
              <div>                
                <video src={video} controls/>
                <br></br>
                <h3>{video_text}</h3>
              </div>
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
            {this.showheadline()}
      </div>

              <div>
                  {this.showImages()}
              </div> 

              <div>
                  {this.showVideos()}
              </div> 

              <div>
                  {this.showEdit()}
              </div>

      <div>
          {this.showsignature()}
      </div>

      </Layout>
)}
}
