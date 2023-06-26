export default function Filter({ search, handleSearch }) {
  return (
    <div>
      <span>filter shown with</span>
      <input value={search} onChange={handleSearch} />
    </div>
  );
}
