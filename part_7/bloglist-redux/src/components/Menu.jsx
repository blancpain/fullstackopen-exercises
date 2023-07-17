import { Link } from 'react-router-dom';

export default function Menu({ loggedStatus }) {
  const status = loggedStatus();

  return (
    <div
      style={{
        backgroundColor: 'gray',
        display: 'flex',
        alignItems: 'center',
        height: '30px',
        gap: '1rem',
        marginBottom: '1rem',
      }}
    >
      <span>
        <Link to={'/blogs'}>blogs</Link>
      </span>
      <span>
        <Link to={'/users'}>users</Link>
      </span>
      <span>{status ? status : ''}</span>
    </div>
  );
}
