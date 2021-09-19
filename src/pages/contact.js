import axios from 'axios';
import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';


const GETFORM_FORM_ENDPOINT = "https://getform.io/f/2a658a71-9d32-4339-88f5-b7d75a6eb05b";


function Form() {
    const [formStatus, setFormStatus] = useState(false);
    const [query, setQuery] = useState({
        name: "",
        email: "",
    });

    const handleFileChange = () => (e) => {
        setQuery((prevState) => ({
            ...prevState,
            files: e.target.files[0]
        }));
    };

    const handleChange = () => (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(query).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios
            .post(
                GETFORM_FORM_ENDPOINT,
                formData,
                {headers: {Accept: "application/json"}}
            )
            .then(function (response) {
                setFormStatus(true);
                setQuery({
                    name: "",
                    email: "",
                });
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div class="container-md">
            <h2>Gatsby File Upload Form using Getform.io</h2>
            <form
                acceptCharset="UTF-8"
                method="POST"
                enctype="multipart/form-data"
                id="gatsbyForm"
                onSubmit={handleSubmit}
            >
                <div className="form-group mb-2">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                        name="email"
                        value={query.email}
                        onChange={handleChange()}
                    />
                </div>
                <div className="form-group mb-2">
                    <label for="exampleInputName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        required
                        name="name"
                        value={query.name}
                        onChange={handleChange()}
                    />
                </div>
                <hr/>
                <div className="form-group mt-3">
                    <label className="mr-2">Upload your Resume:</label>
                    <input name="file" type="file" onChange={handleFileChange()}/>
                </div>
                <hr/>
                {formStatus ? (
                    <div className="text-success mb-2">
                        Your message has been sent.
                    </div>
                ) : (
                    ""
                )}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Form