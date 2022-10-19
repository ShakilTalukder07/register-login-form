import React from 'react';
import { getAuth } from 'firebase/auth'
import app from './firebase/firebase.init';


const auth = getAuth(app)

const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);
}
const handleEmailBlur = event => {
    console.log(event.target.value);
}
const handlePasswordBlur = event => {
    console.log(event.target.value);
}

const Register = () => {
    return (
        <div>
            <form onSubmit={handleRegister}>
                <input onBlur={handleEmailBlur} type="email" name="email" id="" placeholder='Your email address' />
                <br />
                <input onBlur={handlePasswordBlur} type="password" name="password" id="" placeholder='Your password' />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;