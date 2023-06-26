export default function PersonForm({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  handleSubmit,
}) {
  return (
    <form>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => {
            setNewNumber(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          add
        </button>
      </div>
    </form>
  );
}
