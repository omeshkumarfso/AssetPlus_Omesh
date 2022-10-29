import React, { useEffect, useState } from 'react'
import axios from 'axios';
import classes from './ShowPost.module.css'

function ShowPost() {

    const [allPost, setAllPost] = useState([])
    const[showPost,setShowPost] = useState([])

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    var base64Flag = 'data:image/jpeg;base64,';

    const getPostHandler = () => {
        var config = {
            method: 'get',
            url: 'http://localhost:8000/post',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data[0].title));
                console.log(JSON.stringify(response.data));
                setAllPost(response.data)
                setShowPost(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    useEffect(() => {
        getPostHandler()

    }, [])


    const searchHandle = (e ) => {
       var searchText = e.target.value
       if(searchText){
        var findSearch=  allPost.map((post) => {
            if(post.title.search(searchText)){
               return post
            }
            return {}
        })
        setShowPost(findSearch)
       }
       else{
        setShowPost(allPost)
       }
       
    }

    return (
        <div className={classes.mainContainer}>
            <input onChange={(e) => searchHandle(e)} />
            {
                showPost?.map((post,id) => {
                    return (
                        <div key={id} className={classes.mainContainer}>
                            <div><span>Title:</span>
                                <span>{post?.title}</span>
                            </div>
                            <div><span>Description:</span>
                                <span>{post?.description}</span>
                            </div>
                            <div>
                              <img src={`data:${post.photo.contentType};base64,` + arrayBufferToBase64(post.photo.data.data)}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ShowPost