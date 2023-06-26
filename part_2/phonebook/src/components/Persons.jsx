export default function Persons({
  filteredNumbers,
  search,
  allFilteredNumbers,
  allNumbers,
}) {
  return (
    <>
      {filteredNumbers.length > 0 || search.length > 0
        ? allFilteredNumbers
        : allNumbers}
    </>
  );
}
