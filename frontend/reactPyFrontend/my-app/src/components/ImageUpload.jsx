import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ImageUpload.css';

export default class ImageUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: "",
            responseMsg: {
                status: "",
                message: "",
                error: "",
            },
        };
    }

    handleChange = (e) => {
        const imagesArray = [];
        for (let i = 0; i < e.target.files.length; i++) {
            this.fileValidate(e.target.files[i]);
            imagesArray.push(e.target.files[i]);
        }
        this.setState({
            image: imagesArray,
        });
    };

    submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let i = 0; i < this.state.image.length; i++) {
            data.append("files[]", this.state.image[i]);
        }

        axios.post("http://127.0.0.1:5000/upload", data).then((response) => {
            if (response.status === 201) {
                this.setState({
                    responseMsg: {
                        status: response.data.status,
                        message: response.data.message,
                    },
                });
                setTimeout(() => {
                    this.setState({
                        image: "",
                        responseMsg: "",
                    });
                }, 100);
                document.querySelector("#imageForm").reset();
            }
            alert("successfully Uploaded");
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            }
        });
    };

    fileValidate = (file) => {
        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg") {
            this.setState({
                responseMsg: {
                    error: "",
                },
            });
            return true;
        } else {
            this.setState({
                responseMsg: {
                    error: "File type allowed: png, jpg, jpeg",
                },
            });
            return false;
        }
    };

    render() {
        return (
            <div className="upload-page">
                <div className="navbar">
                    <Link to="/">
                        <div className="logo">Matching Models</div>
                    </Link>
                    <nav>
                        <ul>
                            <li><a href="#about">About</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="upload-container">
                    <div className="upload-card">
                        {this.state.responseMsg.status === "success" ? (
                            <div className="alert alert-success">
                                {this.state.responseMsg.message}
                            </div>
                        ) : this.state.responseMsg.status === "failed" ? (
                            <div className="alert alert-danger">
                                {this.state.responseMsg.message}
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="upload-header">
                            <h4>Upload Image</h4>
                        </div>

                        <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
                            <div className="upload-body">
                                <div className="form-group">
                                    <label htmlFor="images">Images</label>
                                    <input
                                        type="file"
                                        name="image"
                                        multiple
                                        onChange={this.handleChange}
                                        className="form-control"
                                    />
                                    <span className="text-danger">{this.state.responseMsg.error}</span>
                                </div>
                            </div>

                            <div className="upload-footer">
                                <button type="submit" className="btn btn-success">Upload</button>

                            </div>
                        </form>
                        <div>
                            <br />
                            <Link to="/prompt">
                                <button className="proceed">proceed</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <footer className="footer-section">
                    <p>&copy; 2024 Generative Tools | <a href="#contact">Contact Us</a></p>
                </footer>
            </div>
        );
    }
}


