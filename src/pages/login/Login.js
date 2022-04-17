import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

// Styles
import './Login.css';

export default function Login() {
  // We create state to store the login required data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    // We prevent the default action of the page: reloading
    e.preventDefault();
    login(email, password);
  };

  return (
    // On submiting the form we fire the handleSubmit function
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          required
          type='email'
          // OnChange we set the state to be the input value
          onChange={(e) => setEmail(e.target.value)}
          // We also set the value to whatever the state is. Like this we have 2 way binding:
          // If we would change the state from outside of the input. Then the value inside the input would reflect that change (for example when we reset the form)
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && (
        <button className='btn' disabled>
          Loading...
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </form>
  );
}
