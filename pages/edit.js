import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../pages/layouts/layout'
import ImageUploading from '../pages/imageUploading'
import VideoUploading from '../pages/videoUploading'
import TextEditing from '../pages/textEditing'
import Save from '../pages/saveChanges'

export default class Edit extends Component {
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

constructor(probs) {
    super(probs)
    this.state = {
      Überschrift: null,
      Inhalt: null,
      Unterschrift: null,
      messages: this.props.messages
    }
    this.addDbListener = this.addDbListener.bind(this)   
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
            );
        });
    }

 render () {
  const { messages, Files } = this.state  

    return <Layout>

         <div className = "title"> 
             <h1>
                    {messages[this.props.url.query.id].text}                 
             </h1>
         </div>  

          <Save user_ID={this.props.url.query.id}>
          </Save>
      
              <div>
                  {this.showImages()}
              </div> 

          <VideoUploading>
          </VideoUploading>

          <TextEditing>
          </TextEditing>
      </Layout>
  }
}
