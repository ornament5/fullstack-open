import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => (
  <form onSubmit={handleLogin} id='login-form'>
    <div>
          username:
      <input
        id='username'
        type='text'
        value={username}
        name='Username'
        onChange={handleUsernameChange}
      />
    </div>
    <div>
          password:
      <input
        id='password'
        type='password'
        value={password}
        name='Password'
        onChange={handlePasswordChange}
      />
    </div>
    <button type='submit'>login</button>
  </form>
)

export default LoginForm