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

    this.imageText = "";

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


onChangeImagetextHandler(e)
{
  let imageID = e.target.getAttribute("id");
  let imageText = e.target.value;

  let imageList = this.state.messages[this.props.url.query.id].images;
  let image = imageList[imageID];
  image.Text = imageText;

  this.setState({messages: this.state.messages});
}

onChangeVideotextHandler(e)
{
  let videoID = e.target.getAttribute("id");
  let videoText = e.target.value;

  let videoList = this.state.messages[this.props.url.query.id].videos;
  let video = videoList[videoID];
  video.Text = videoText;

  this.setState({messages: this.state.messages});
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
                <br></br>
                <textarea placeholder='You can type in an image caption' 
                    id={element} value={image_text} 
                    onChange={this.onChangeImagetextHandler.bind(this)}>
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
                <br></br>
                <textarea placeholder='You can type in video caption'
                    id={element} value={video_text} 
                    onChange={this.onChangeVideotextHandler.bind(this)}>
                </textarea>
              </div>
            );
        });
    }

changetexthandler()
{
  let messageID = this.props.url.query.id;

  firebase.database().ref('messages/' + messageID).update({
                            headline: this.state.messages[messageID].headline
                          }); 

  firebase.database().ref('messages/' + messageID).update({
                            signature: this.state.messages[messageID].signature
                          });  

  firebase.database().ref('messages/' + messageID).update({
                            images: this.state.messages[messageID].images
                          });  

  firebase.database().ref('messages/' + messageID).update({
                            videos: this.state.messages[messageID].videos
                          });        
}

  onChangeheadhandler (event) {
    let headtxt = event.target.value;
    
    let headtext = this.state.messages[this.props.url.query.id];
    headtext.headline = headtxt;

  this.setState({messages: this.state.messages});
  }

  onChangesignathandler (event) {
    let signtxt = event.target.value;
    
    let signtext = this.state.messages[this.props.url.query.id];
    signtext.signature = signtxt;

  this.setState({messages: this.state.messages});
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
          <button className="savechanges" onClick={this.changetexthandler.bind(this)}>save text changes</button>
          <Save user_ID={this.props.url.query.id}>
          </Save>
                     
            <br></br>
            <input type="text" placeholder="headline" className="title"
              value={this.state.messages[this.props.url.query.id].headline} onChange={this.onChangeheadhandler.bind(this)}/>

            <div> {this.showImages()} </div> 
            <div> {this.showVideos()} </div>            

            <input type="text" placeholder="footer text" className="TextThree"          
              value={this.state.messages[this.props.url.query.id].signature} onChange={this.onChangesignathandler.bind(this)}/>
      </Layout>
  }
}
