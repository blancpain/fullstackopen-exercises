import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";

const CreateNew = (props) => {
  const { reset: contentReset, ...restOfContent } = useField("text");
  const { reset: authorReset, ...restOfAuthor } = useField("text");
  const { reset: infoReset, ...restOfInfo } = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: restOfContent.value,
      author: restOfAuthor.value,
      info: restOfInfo.value,
      votes: 0,
    });
    navigate("/anecdotes");
  };

  const clearForm = (e) => {
    e.preventDefault();
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...restOfContent} />
        </div>
        <div>
          author
          <input {...restOfAuthor} />
        </div>
        <div>
          url for more info
          <input {...restOfInfo} />
        </div>
        <button>create</button>
        <button onClick={clearForm}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
