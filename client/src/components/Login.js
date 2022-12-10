import React, { useState } from 'react';
import { login } from '../utils/api';
import Auth from '../utils/auth';

const Login = () => {
    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const [validated] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const response = await login(userFormData);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { token, user } = await response.json();
            console.log(user);
            Auth.login(token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };
    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center w-100">
                <div className="col-6">
                    <div className="card shadow">
                        <div className="card-header">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <form noValidate validated={validated} onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label className="form-label w-100">Username
                                        <input
                                            className="form-control"
                                            type='text'
                                            placeholder='Username'
                                            name='username'
                                            onChange={handleInputChange}
                                            value={userFormData.username}
                                            required
                                        />
                                    </label>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label w-100">Password
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder='Your password'
                                            name='password'
                                            onChange={handleInputChange}
                                            value={userFormData.password}
                                            required />
                                    </label>
                                </div>
                                <button 
                                className="btn btn-primary"
                                disabled={
                                    !(
                                        userFormData.username &&
                                        userFormData.password 
                                    )
                                }
                                type="submit"
                                variant="success"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;