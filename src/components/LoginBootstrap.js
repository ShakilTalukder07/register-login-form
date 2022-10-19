import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);


const LoginBootstrap = () => {

    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
            })
            .catch(error => {
                console.error('error', error);
            })
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
        // const password = event.target.value;
    }

    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Please enter your email address.');
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Password reset email send, please check your email.')
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Please Login!!</h3>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">

                    <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Please enter your email" required />
                </div>
                <div className="mb-3">

                    <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Please enter your password" required />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            {success && <p>Successfully login on the account </p>}
            <p><small>New on this website ? Please <Link to='/register'>Register</Link> </small></p>
            <p>Forget password ?
                <button type="button" onClick={handleForgetPassword} class="btn btn-link">Reset Password</button>
            </p>
        </div >
    );
};

export default LoginBootstrap;