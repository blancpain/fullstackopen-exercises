import { NavLink, Outlet } from "react-router-dom";

export default function Layout({ children }) {
  const Menu = () => {
    const padding = {
      paddingRight: 5,
    };
    return (
      <div>
        <NavLink to="/anecdotes" style={padding}>
          anecdotes
        </NavLink>
        <NavLink to="/create" style={padding}>
          create new
        </NavLink>
        <NavLink to="/about" style={padding}>
          about
        </NavLink>
      </div>
    );
  };

  const Footer = () => (
    <div>
      Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
      See{" "}
      <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
        https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
      </a>{" "}
      for the source code.
    </div>
  );

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
}
