// Styles
import './Avatar.css';

// Here we create a custom avatar component which receives the source of the avatar as a parameter
export default function Avatar({ src }) {
  return (
    <div className='avatar'>
      <img src={src} alt='user avatar' />
    </div>
  );
}
