import React, { useState } from 'react';
import { signIn, signUp, getUser } from './services/fetch-utils.js';

export default function AuthPage({ setEmail, setToken }) {
  // you'll need to track the form state of the email and password
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  async function handleSignIn(e) {
    e.preventDefault();

    // sign the user in using the form state
    await signIn(signInEmail, signInPassword);

    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
    const {
      access_token,
      user: { email },
    } = getUser();
    setEmail(email);
    setToken(access_token);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    // sign the user up using the form state
    await signUp(signUpEmail, signUpPassword);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list

    const {
      access_token,
      user: { email },
    } = getUser();
    setEmail(email);
    setToken(access_token);
  }

  return (
    <div className="auth">
      <h1>
        <em>Boardzo</em>
      </h1>
      {/* on submit, sign the user in using the function defined above */}
      <form onSubmit={handleSignUp}>
        <h3>Sign Up</h3>
        <label>
          Email
          {/* on change, update the form state for email */}
          <input onChange={(e) => setSignUpEmail(e.target.value)} />
        </label>
        <label>
          Password
          {/* on change, update the form state for password */}
          <input onChange={(e) => setSignUpPassword(e.target.value)} />
        </label>
        <button>Sign Up</button>
        {/* on clicking sign up, sign the user up using the function defined above */}
      </form>
      <form onSubmit={handleSignIn}>
        <h3>Sign In</h3>
        <label>
          Email
          {/* on change, update the form state for email */}
          <input onChange={(e) => setSignInEmail(e.target.value)} />
        </label>
        <label>
          Password
          {/* on change, update the form state for password */}
          <input onChange={(e) => setSignInPassword(e.target.value)} />
        </label>
        <button>Sign In</button>
        {/* on clicking sign up, sign the user up using the function defined above */}
      </form>
    </div>
  );
}
