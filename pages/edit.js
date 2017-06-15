import React, { Component } from 'react'
import firebase from 'firebase'
import 'isomorphic-fetch'
import { clientCredentials } from '../firebaseCredentials'
import Layout from '../components/layouts/layout'
import ImageUploading from '../components/imageUploading'
import VideoUploading from '../components/videoUploading'
import Save from '../components/saveChanges'
let empty_project;

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

deleteImage(e)
{

}

deleteVideo(e)
{
  
}
    showImages()
    {
        let imageList = this.state.messages[this.props.url.query.id].images;
        if (!imageList) 
        {
          imageList = {};  
          empty_project = (<h2 className="previewText">Your portfolio seems to be empty. Add your first media</h2>);                          
        }         
        return Object.keys(imageList).map((element) => {
            
            let image = imageList[element].image;  
            let image_text = imageList[element].Text;                     

            return(
              <div>
                <img src={image}/>
                <button className="deleteButton" onClick={(e)=>this.deleteImage(e)}>x</button>
                <br></br>
                <textarea placeholder='Bildbeschriftung' 
                    id="textarea" value={image_text} 
                    onChange={this.onChange}>
                </textarea>
                </div>
            );
        });
    }

    
    showVideos()
    {
        let videoList = this.state.messages[this.props.url.query.id].videos;
        if (!videoList) videoList = {};             

        return Object.keys(videoList).map((element) => {
            
            let video = videoList[element].video;  
            let video_text = videoList[element].Text;                     
            
            return(
              <div>
                <video src={video} controls/>
                <button className="deleteButton" onClick={(e)=>this.deleteVideo(e)}>x</button>
                <br></br>
                <textarea placeholder='Videobeschriftung'
                    id="textarea" value={video_text} 
                    onChange={this.onChange}>
                </textarea>
              </div>
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
          {empty_project}   
          <Save user_ID={this.props.url.query.id}>
          </Save>
           
            <input type="text" placeholder="Überschrift" className="title"
              value={this.state.nameOne} onChange={this.onChange}/>

            <div> {this.showImages()} </div> 
            <div> {this.showVideos()} </div>

            <input type="text" placeholder="Unterschrift" className="TextThree"          
              value={this.state.nameThree} onChange={this.onChange}/>
      </Layout>
  }
}
