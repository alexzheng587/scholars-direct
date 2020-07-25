import React, { Component } from 'react'
import styled from 'styled-components'
import {userAction} from "../../../actions/userAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import axios from 'axios'



class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                birthday: null,
                role:""
            },
            submitted: false,
            google:false,
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true});
        const id = this.props.auth.user.id
        const {name, birthday, role} = this.state.user
        if (name && role) {
            if (this.props.auth.google) {
                const payload = {name, birthday, role}
                await axios.put(`/auth/google/${id}`, payload).then(res => {
                    this.setState({
                        user: {
                            name: name,
                            role: role
                        }
                    })
                })
            }else{
                const payload = {name, birthday, role}
                await axios.put(`/users/${id}`, payload).then(res => {
                    this.setState({
                        user: {
                            name: name,
                            role: role
                        }
                    })
                })
            }
        }
    }

    async componentDidMount() {
        const id = this.props.auth.user.id
        if (this.props.auth.google) {
            await axios.get(`/auth/google/${id}`).then(info => {
                console.log("Info:", info.data.role)
                if (info) {
                    this.setState({
                        user: {
                            name: info.data.name,
                            role: info.data.role
                        }
                    })
                }
            })
        } else {
            await axios.get(`/users/${id}`).then(info => {
                console.log("Info:", info.data.role)
                if (info) {
                    this.setState({
                        user: {
                            name: info.data.name,
                            role: info.data.role
                        }
                    })
                }
            })
        }
    }

    render() {

        const {user, submitted,errors} = this.state;
        console.log("state:",this.state)
        console.log("user:",user)

        return (
            <Content>
                <form onSubmit={this.handleSubmit}>

                    <Label>Name: </Label>
                    <InputText
                        name="name"
                        type="text"
                        value={user.name}
                        onChange={this.handleChange}
                    />
                    <Label>Role: </Label>
                    <InputText
                        name="role"
                        type="text"
                        value={user.role}
                    />
                    <br></br>
                    <Button>Update</Button>
                </form>
            </Content>
        )
    }
}

const Content = styled.div`
    margin: 0;
    display: flex;
    height: 1000px;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    div.header {
    margin: 0;
    font-size: 400%;
    text-align: center;
    }

    .field input{
    margin: 0;
    float:right;
    }
    .buttonHolder input{ 
    margin: 10px;
    text-align: center; 
    }
    .content_list button{ 
    margin: 5px;
    text-align: center; 
    }
`;

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.authentication,
    errors: state.errors
});

const actionCreators = {

};

const connectedProfile = connect(mapStateToProps, actionCreators)(Profile);
export {connectedProfile as Profile};