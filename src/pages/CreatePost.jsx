import React from 'react';
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required(),
    });
    const history = useNavigate()
    const onSubmit = (data) => {
        axios.post("http://localhost:5000/posts", data,{
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response)=>{
        console.log("Done")
        history("/")
        })
        console.log(data)
    }
    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit } validationSchema={validationSchema} >
                <Form className="formContainer">
                    <label>Title:</label>
                    <ErrorMessage name="title" component="span"/>
                    <Field id="inputCreatePost" name="title" placeholder="Some Title" />
                    <label>Post:</label>
                    <ErrorMessage name="postText" component="span"/>
                    <Field id="inputCreatePost" name="postText" //like in database
                        placeholder="Some Post Text" />
                    <label>Username:</label>
                    <ErrorMessage name="username" component="span"/>
                    <Field id="inputCreatePost" name="username" placeholder="Your Username" />
                    <button type='submit'>Create</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreatePost;