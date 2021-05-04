import React, {Component} from "react";

const Post = (props) => {
    return(
        <div className="article">
            <div className="article-picture">
                <img src="http://placeimg.com/80/80/tech" alt="Article Thumbnail Picture"/>
            </div>
            <div className="article-content">
                <div className="article-title">{props.title}</div>
                <p className="contents-article">{props.content}</p>
                <button className="btn btn-sm btn-danger" 
                    onClick={() => { if (window.confirm('Are you sure to delete this article?')) props.deleteArticle(props.idArticle)}}>
                        Delete
                </button>
            </div>
        </div>
    )
}
export default Post;