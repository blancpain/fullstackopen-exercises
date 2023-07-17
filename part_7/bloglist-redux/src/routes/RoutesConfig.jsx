import { Route } from 'react-router-dom';

// layouts
import RootLayout from '../layouts/RootLayout';

// components
import BlogList from '../components/BlogList';
import Blog from '../components/Blog';
import UserList from '../components/UserList';
import User from '../components/User';

export default function routesConfig() {
  return (
    <Route path="/" element={<RootLayout />}>
      <Route index path="/blogs" element={<BlogList />} />
      <Route path="/blogs/:id" element={<Blog />} />
      <Route path="users">
        <Route index element={<UserList />} />
        <Route path=":id" element={<User />} />
      </Route>
    </Route>
  );
}
