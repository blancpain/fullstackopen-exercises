import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

// routes
import routesConfig from './routes/RoutesConfig';

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(routesConfig()));

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
