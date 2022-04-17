import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// Styles
import './Signup.css';

export default function Signup() {
  // We create state to store the signup required data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  // We destructure the different things that we want from this hook
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    // We prevent the default action of the page: reloading
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    // On submiting the form we fire the handleSubmit function
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
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
      <label>
        <span>Display name:</span>
        <input
          required
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input required type='file' onChange={handleFileChange} />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {/* If the signUp hook is not loading anything we display the normal submit button to submit the signUp form */}
      {!isPending && <button className='btn'>Sign up</button>}
      {/* If the signUp hook is loading we display a same styled button but that is disabled and with text "loading..." so the user cannot click it until we finish loading */}
      {isPending && (
        <button className='btn' disabled>
          Loading...
        </button>
      )}
      {/* If we get an error from the signUp hook we display this eror is a div with the styling we use for errors */}
      {error && <div className='error'>{error}</div>}
    </form>
  );
}
