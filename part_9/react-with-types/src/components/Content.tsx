import Part from "./Part";
import CoursePart from "../types";
import { nanoid } from "nanoid";

type Props = {
  input: CoursePart[];
};

const Content = (props: Props) => {
  const courseParts = props.input;

  return (
    <>
      {courseParts.map((item) => {
        return <Part key={nanoid()} coursePart={item} />;
      })}
    </>
  );
};

export default Content;
