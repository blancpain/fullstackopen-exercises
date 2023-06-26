export default function Course({ name, parts }) {
  const allSubCourses = parts.map((part) => {
    return <Part key={part.id} name={part.name} exercises={part.exercises} />;
  });

  const sumOfExercises = parts.reduce((sum, obj) => {
    return sum + obj.exercises;
  }, 0);

  return (
    <>
      <Header courseName={name} />
      {allSubCourses}
      <h2>total of {sumOfExercises} exercises</h2>
    </>
  );
}

const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};
