import React, { useState } from 'react'
import { FormControl, InputLabel, Input,  } from '@mui/material'
import classes from './ShowPost.module.css'
import axios from 'axios'

function CreatePost() {


    const[title , setTitle] = useState('')
    const[description,setDescription] = useState('')
    const[image, setImage] = useState(null)


   const SubmitForm = () => {
    var data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('photo', image);

    var config = {
        method: 'post',
        url: 'http://localhost:8000/post/add',
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

   }

    return (
        <div className={classes.mainContainer}>
            <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input onChange={(e) => setTitle(e.target.value)} id="my-input" aria-describedby="my-helper-text" />

            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={(e) => setDescription(e.target.value)} id="my-input" aria-describedby="my-helper-text" />

            </FormControl>
            <FormControl style={{ marginTop: '20px' }}>

                <input onChange={(e)=> setImage(e.target.files[0])} type='file' />

            </FormControl>

            <button onClick={ SubmitForm }>Submit form</button>
        </div>
    )

}

export default CreatePost