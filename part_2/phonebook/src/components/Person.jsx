export default function Person({ name, number, personID, handleDelete }) {
  return (
    <li>
      {name} {number}
      <button name={personID} onClick={handleDelete}>
        delete
      </button>
    </li>
  );
}
