import React, { useState } from "react";
import { useAuth } from "../components/auth_context";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useNavigate } from "react-router-dom";

const Authentication = () => {
    // const navigate = useNavigate();

    const { login } = useAuth();
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserCredentials({
            ...userCredentials,
            [name]: value
        });
    };

    const handleSignIn = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
        try {
            const response = await fetch('http://localhost:8000/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials)
            });
            const data = await response.json();
            alert(`Sign In response: ${data.message}`)
            if (data.message === 'User signed in successfully.') {
                login();
                // send user to the launch page
                history.push('/launch');
            }
            setUserCredentials({
                username: '',
                password: ''
            })
            // if (response.ok) {
            //     navigate('/launch'); // Redirect to the dashboard on success
            // } else {
            //     alert(data.message); // Or handle errors more gracefully
            // }


        } catch (error) {
            alert('Error during sign in:', error);
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
        try {
            const response = await fetch('http://localhost:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials)
            });
            const data = await response.json();
            alert(`Sign Up response: ${data.message}`)
            setUserCredentials({
                username: '',
                password: ''
            })

        } catch (error) {
            alert('Error during sign up:', error);
        }
    };

    return (
        <div>
            <h1>Authentication</h1>
            <form>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={userCredentials.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={userCredentials.password}
                    onChange={handleChange}
                />
                <button type="button" onClick={handleSignIn}>Sign In</button>
                <button type="button" onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    );
}

export default Authentication;
