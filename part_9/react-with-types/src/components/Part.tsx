import CoursePart from "../types";
import { assertNever } from "../utils";
import { nanoid } from "nanoid";

type Props = {
  coursePart: CoursePart;
};

const Part = (props: Props) => {
  const coursePart = () => {
    switch (props.coursePart.kind) {
      case "basic":
        return (
          <>
            <h3>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </h3>
            <p>{props.coursePart.description}</p>
          </>
        );
      case "background":
        return (
          <>
            <h3>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </h3>
            <p>{props.coursePart.description}</p>
            <p>
              read more <a href={props.coursePart.backgroundMaterial}>here</a>
            </p>
          </>
        );
      case "group":
        return (
          <>
            <h3>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </h3>
            <p>project exercises {props.coursePart.groupProjectCount}</p>
          </>
        );
      case "special":
        return (
          <>
            <h3>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </h3>
            <p>{props.coursePart.description}</p>
            <p>
              required skills:{" "}
              {props.coursePart.requirements.map((req, index, arr) => {
                return (
                  <span key={nanoid()}>
                    {req}
                    {index !== arr.length - 1 ? ", " : " "}
                  </span>
                );
              })}
            </p>
          </>
        );
      default:
        return assertNever(props.coursePart);
    }
  };
  return <div>{coursePart()}</div>;
};

export default Part;
