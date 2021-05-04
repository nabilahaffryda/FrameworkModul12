import React, {Component} from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post";
// import '../../services/index';
// import API from "../../services/index";
import firebase from "firebase";
import firebaseConfig from "../../firebase/config";

class BlogPost extends Component{
    constructor(props){
        super(props);
        firebase.initializeApp(firebaseConfig);
        this.state = {
            listArticle: []
        };
    }
    getDataFromServerAPI = () => {
        let ref = firebase.database().ref('/')
        ref.on('value', snapshot => {
            const state = snapshot.val()
            this.setState(state)
        })
    }
    saveDataToServerAPI = () => {
        firebase.database()
            .ref('/')
            .set(this.state)
    }
    componentDidMount(){
        this.getDataFromServerAPI();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState !== this.state){
            this.saveDataToServerAPI();
        }
    }
    handleSaveButton = (event) => {
        let title = this.refs.titleArticle.value;
        let body = this.refs.contentArticle.value;
        let uid = this.refs.uid.value;

        if(uid && title && body){
            const {listArticle} = this.state;
            const indexArticle = listArticle.findIndex(data => {
                return data.uid === uid;
            });
            listArticle[indexArticle].title = title;
            listArticle[indexArticle].body = body;
            this.setState({listArticle});
        }else if (title && body){
            const uid = new Date().getTime().toString();
            const {listArticle} = this.state;
            listArticle.push({uid, title, body});
            this.setState({listArticle});
        }
        
        this.refs.titleArticle.value = "";
        this.refs.contentArticle.value = "";
        this.refs.uid.value = "";
    };

    handleAddArticle = (event) => {
        let formInsertArticle = { ...this.state.insertArticle };
        let timestamp = new Date().getTime();
        formInsertArticle['uid'] = timestamp;
        formInsertArticle[event.target.name] = event.target.value;
        this.setState({ insertArticle: formInsertArticle, });
    };

    handleDeleteArticle = (idArticle) => {
        const {listArticle} = this.state;
        const newState = listArticle.filter(data => {
            return data.uid !== idArticle;
        });
        this.setState({listArticle: newState});
    };
    render(){
        return(
            <div className="post-article">
                <div className="form pb-2 border-bottom"><br></br>
                    <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" ref="titleArticle" id="title" name="title" rows="1" onChange={this.handleAddArticle}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Content</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" ref="contentArticle" id="body" name="body" rows="3" onChange={this.handleAddArticle}></textarea>
                        </div>
                    </div>
                    <input type="hidden" name="uid" ref="uid"/>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSaveButton}>Save</button>
                </div>
                <br></br>
                <h2>List of Article</h2><br></br>
                {
                    this.state.listArticle.map(article => {
                        return <Post 
                            key={article.uid} 
                            title={article.title} 
                            content={article.body} 
                            idArticle={article.uid} 
                            deleteArticle={(id) => this.handleDeleteArticle(id)}/>
                        
                    })
                }
            </div>
        );
    }
}
export default BlogPost;

// getDataFromServerAPI =() => {
//     fetch('http://localhost:3001/posts?_sort=id&_order=desc')
//     .then(response => response.json())
//     .then(jsonResultFromAPI => {
//         this.setState({
//             listArticle: jsonResultFromAPI
//         })
//     })
// }
// handleSaveButton = () => {
//     fetch('http://localhost:3001/posts', {
//         method: 'post',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }, 
//         body: JSON.stringify(this.state.insertArticle)
//     })
//         .then((Response) => {
//             this.getDataFromServerAPI();
//         });
// }
// handleDeleteArticle = (data) => {
//     fetch(`http://localhost:3001/posts/${data}`, {method: 'DELETE'})
//         .then(res => {
//             this.getDataFromServerAPI();
//         })
// }