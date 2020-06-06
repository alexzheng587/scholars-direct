import React from "react";
import '../../styles/Form.css';

class LoginForm extends React.Component {
    render() {
        return (
            <div className="login-form">
                <h1>Login with your account</h1>
                <form>
                    <input type="text" name="field1" placeholder="Username"/>
                    <input type="email" name="field2" placeholder="Password"/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default LoginForm;