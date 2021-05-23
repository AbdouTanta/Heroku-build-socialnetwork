import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Input, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import { getUser, updateUser } from "../../actions/itemActions";

import { ImagePicker } from "react-file-picker";
import axios from "axios";

class Aboutme extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);

        this.props.getUser(this.props.id);
        const { user } = this.props.users;

        var birth;

        if (typeof user[0].birthDay !== "undefined")
            birth = new Date(user[0].birthDay);
        else {
            setTimeout(250);
        }

        this.state = {
            Firstname: user[0].firstName,
            Lastname: user[0].lastName,
            Birthday: birth,
            Email: user[0].email,
            isToggle: true,
            file: null,
        };

        console.log("birthday" + user[0].birthDay);
    }

    /*componentDidMount() {
    const {user} = this.props.users;
      this.setState({
       Firstname: user[0].firstName ,
       Lastname: user[0].lastName ,
       Email : user[0].email ,
     });
  }*/

    onChangeFirstname(e) {
        this.setState({
            Firstname: e.target.value,
        });
    }

    onChangeLastname(e) {
        this.setState({
            Lastname: e.target.value,
        });
    }

    onChangeBirthday(date) {
        this.setState({
            Birthday: date,
        });
    }

    onChangeEmail(e) {
        this.setState({
            Email: e.target.value,
        });
    }

    handleClick(e) {
        this.setState({ isToggle: !this.state.isToggle });
    }

    onSubmit(e) {
        e.preventDefault();

        const userupdated = {
            firstName: this.state.Firstname,
            lastName: this.state.Lastname,
            birthDay: this.state.Birthday,
            email: this.state.Email,
        };
        this.props.updateUser(this.props.id, userupdated);
        this.setState({ isToggle: !this.state.isToggle });
        if (this.state.file !== null) {
            this.uploadHandler();
        } else {
            window.location.reload();
        }
    }

    //added by lkhadir
    uploadHandler() {
        const formData = new FormData();
        formData.append("myImage", this.state.file);
        axios
            .put(`/api/user/${this.props.id}/updateImage`, formData, {
                withCredentials: true,
            })
            .then((response) => {
                //alert("The file is successfully uploaded:");
                window.location.reload();
            })
            .catch((error) => {
                alert(error);
            });
    }

    onChangeImage(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        const { user } = this.props.users;

        const { id } = this.props.id;

        var brirth, month, day, year;

        if (typeof user[0].birthDay !== "undefined") {
            brirth = new Date(user[0].birthDay);
            month = brirth.getUTCMonth() + 1; //months from 1-12
            day = brirth.getUTCDate();
            year = brirth.getUTCFullYear();
        } else {
            setTimeout(250);
        }

        var newdate = day + "-" + month + "-" + year;

        return (
            <div>
                <Form
                    onSubmit={this.handleClick}
                    style={{ display: this.state.isToggle ? "block" : "none" }}
                >
                    <Form.Group widths="equal">
                        <Form.Field
                            id="first-name"
                            control={Input}
                            label="First name"
                            placeholder="First name"
                            value={user[0].firstName}
                            onChange={this.onChangeFirstname}
                        />
                        <Form.Field
                            id="last-name"
                            control={Input}
                            label="Last name"
                            placeholder="Last name"
                            value={user[0].lastName}
                            onChange={this.onChangeLastname}
                        />
                    </Form.Group>

                    <Form.Group widths="equal">
                        <Form.Field
                            id="email"
                            control={Input}
                            label="Email"
                            placeholder="joe@gmail.com"
                            value={user[0].email}
                            onChange={this.onChangeEmail}
                        />

                        <Form.Field
                            id="form-input-control-Birthday-Date"
                            control={Input}
                            label="Birthday Date"
                            placeholder="Birthday Date"
                            value={newdate}
                        ></Form.Field>
                    </Form.Group>

                    <Form.Field
                        id="form-button-control-public"
                        control={Button}
                        content="Edit profil"
                        style={{
                            marginLeft: "1%",
                            color: "white",
                            backgroundColor: "#F05945",
                        }}
                    />
                </Form>

                <Form
                    onSubmit={this.onSubmit}
                    style={{ display: this.state.isToggle ? "none" : "block" }}
                >
                    <Form.Group widths="equal">
                        <Form.Field
                            id="first-name2"
                            control={Input}
                            label="First name"
                            placeholder="First name"
                            value={this.state.Firstname}
                            onChange={this.onChangeFirstname}
                        />
                        <Form.Field
                            id="last-name2"
                            control={Input}
                            focus="true"
                            label="Last name"
                            placeholder="Last name"
                            value={this.state.Lastname}
                            onChange={this.onChangeLastname}
                        />
                    </Form.Group>

                    <Form.Group widths="equal">
                        <Form.Field
                            id="Birthday-Date"
                            control={Input}
                            label="Birthday Date"
                            placeholder="Birthday Date"
                        >
                            <DatePicker
                                selected={this.state.Birthday}
                                onChange={this.onChangeBirthday}
                            />
                        </Form.Field>

                        <Form.Input
                            label="Profil image"
                            type="file"
                            onChange={this.onChangeImage}
                        />
                    </Form.Group>

                    <Form.Field
                        id="form-button-control-public"
                        control={Button}
                        content="Update"
                        style={{
                            marginLeft: "1%",
                            color: "white",
                            backgroundColor: "#F05945",
                        }}
                    />
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
});

export default connect(mapStateToProps, { getUser, updateUser })(Aboutme);
