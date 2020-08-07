import React, { Component } from 'react'
import styled from 'styled-components'
import {googleLogin, login, userAction} from "../../../actions/userAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";


import axios from 'axios'

import { graphql, withApollo } from '@apollo/client/react/hoc';

import { List, Modal, Button, Header,
    Form,
    Input,
    Select,} from 'semantic-ui-react'
import '../../styles/profile.css'
import {UPDATE_PROFILE} from '../../../graphql/mutations/user/update-profile';
import {QUERY_USER_ID} from '../../../graphql/queries/user/id';
import {compose} from "redux";

/*
TODO :
   - handleSubmit: PUT user info
   - fetch GET user info, update both profile and form placeholder.
   - handle Google OAth case: (ie: email cannot be changed)

   - bug: unable to show default value in select drop down
   - validate email on form submit?


*/
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                fullname: "none",
                email: "none",
                role: "none",
                school: "none",
                major: "none",
                year: 0,

            },
            google:false,
            errors: {},
            open: false
        };
        this.setOpen = this.setOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    setOpen(bool) {

        this.setState({
            ...this.state, open: bool
        });
    }
    // componentWillReceiveProps(nextProps, nextContext) {
    //     if (nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         });
    //     }
    // }

    handleChange(event) {
        const {name, value} = event.target;
        const some = this.state;
        const some2 = this.state.user;
        this.setState({ ...this.state,user: { ...this.state.user, [name]: value}});

    }

    async handleSubmit(event) {
        event.preventDefault();
        const user = this.state.user;
        if (this.props.auth.google) {
            const id = this.props.auth.user.id

            const {data} = await this.props.updateUser({
                variables: {
                    fullname: user.fullname,
                    roles: user.roles,
                    school: user.school,
                    year: user.year,
                    major: user.major,
                },
            })
        }else{
            const {data} = await this.props.updateUser({
                variables: {
                    fullname: user.fullname,
                    roles: user.roles,
                    school: user.school,
                    year: user.year,
                    major: user.major,
                },
            });
            console.log(data);
        }

    }

    async componentDidMount() {

        if (this.props.auth.google) {
            // // TODO
            // await axios.get(`/auth/google/${id}`).then(info => {
            //     console.log("Info:", info.data.role)
            //     if (info) {
            //         this.setState(... this.state,{
            //             user: {
            //                 role, fullname, school, major, year, email
            //             }
            //         })
            //     }
            // })
        } else {
            // // TODO
            // await this.props.getUser().then(info => {
            //
            //     if (info) {
            //         this.setState(... this.state,{
            //             user: {
            //                 role, fullname, school, major, year, email
            //             }
            //         })
            //     }
            // })
        }
    }

    render() {

        // const {user,errors} = this.state;
        // console.log("state:",this.state)
        // console.log("user:",user)

        return (
            <Content>
                <h2>Personal Profile</h2>
                <List relaxed id="profile-list">
                    <List.Item>
                        <List.Icon name='drivers license' size='big' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>Full Name</List.Header>
                            <List.Description as='a'>{this.state.user.fullname}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='mail outline' size='big' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>Email</List.Header>
                            <List.Description as='a'>{this.state.user.email}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='book' size='big' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>School</List.Header>
                            <List.Description as='a'>{this.state.user.school} (Year {this.state.user.year})</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='book' size='big' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>Major</List.Header>
                            <List.Description as='a'>{this.state.user.major}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='address book' size='big' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>Role</List.Header>
                            <List.Description as='a'>{this.state.user.role}</List.Description>
                        </List.Content>
                    </List.Item>
                </List>

                <Modal
                    centered = {true}
                    onClose={() => this.setOpen(false)}
                    onOpen={() => this.setOpen(true)}
                    open={this.state.open}
                    trigger={<Button>Edit</Button>}
                >
                    <Modal.Header>Edit Your Profile</Modal.Header>
                    <Modal.Content>
                        {/*<Modal.Description>*/}
                        {/*    <Header>Edit Your Profile</Header>*/}
                        {/*</Modal.Description>*/}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field required
                                        control={Input}
                                        label='Full Name'
                                        name = 'fullname'
                                        value={this.state.user.fullname}
                                        onChange= {this.handleChange}
                            />
                            {/*<Form.Field required*/}
                            {/*            control={Input}*/}
                            {/*            label='Email'*/}
                            {/*            name = 'email'*/}
                            {/*            value={this.state.user.email}*/}
                            {/*            onChange= {this.handleChange}*/}
                            {/*/>*/}
                            <Form.Field required
                                        control={Select}
                                        label='Role'
                                        name = 'role'
                                        options={generatelist(['Student', 'Tutor'])}
                                        // value={this.state.user.role}
                                        onChange= {this.handleChange}

                            />
                            <Form.Group widths='equal'>
                                <Form.Field required
                                            control={Input}
                                            label='School'
                                            name = 'school'
                                            value={this.state.user.school}
                                            onChange= {this.handleChange}
                                />

                                <Form.Field required
                                            control={Select}
                                            label='Year'
                                            name = 'year'
                                            options={generatelist([1,2,3,4])}
                                            // value={this.state.user.year}
                                            onChange= {this.handleChange}
                                />

                                <Form.Field required
                                            control={Input}
                                            label='Major'
                                            name = 'major'
                                            value={this.state.user.major}
                                            onChange= {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Field control={Button}>Submit</Form.Field>
                            {/*<Button type='submit'>Submit</Button>*/}
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => this.setOpen(false)}>
                            Close
                        </Button>
                        <Button
                            content="Save"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={() => this.setOpen(false)}
                            positive
                        />

                    </Modal.Actions>
                </Modal>

                {/*<form onSubmit={this.handleSubmit}>*/}

                {/*    <Label>Name: </Label>*/}
                {/*    <InputText*/}
                {/*        name="name"*/}
                {/*        type="text"*/}
                {/*        value={user.name}*/}
                {/*        onChange={this.handleChange}*/}
                {/*    />*/}
                {/*    <Label>Role: </Label>*/}
                {/*    <InputText*/}
                {/*        name="role"*/}
                {/*        type="text"*/}
                {/*        value={user.role}*/}
                {/*    />*/}
                {/*    <br></br>*/}
                {/*    <Button>Update</Button>*/}
                {/*</form>*/}
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

// const Button = styled.button.attrs({
//     className: `btn btn-primary`,
// })`
//     margin: 15px 15px 15px 5px;
// `
//
// const CancelButton = styled.a.attrs({
//     className: `btn btn-danger`,
// })`
//     margin: 15px 15px 15px 5px;
// `
Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    updateUser:  PropTypes.func,
    getUser: PropTypes.func
};

const mapStateToProps = state => ({
    auth: state.authentication,
    errors: state.errors
});

const actionCreators = {

};

// const connectedProfile = connect(mapStateToProps, actionCreators)(Profile);
const connectedProfile = compose(
    withApollo,
    connect(mapStateToProps, actionCreators),
    graphql(QUERY_USER_ID, { name: 'getUser'}),
    graphql(UPDATE_PROFILE, { name: 'updateUser'}),
)(Profile);
export {connectedProfile as Profile};

function generatelist(array) {
    return array.map(x=> {return {'text': x, 'value': x}});
}