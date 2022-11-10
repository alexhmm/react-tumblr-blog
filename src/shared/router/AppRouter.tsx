import { Route, Routes } from 'react-router-dom';

// Pages
import About from '../../modules/info/pages/About/About';
import PostDetail from '../../modules/posts/pages/PostDetail/PostDetail';
import Posts from '../../modules/posts/pages/Posts/Posts';

// Components
import { Loader } from '../ui/Loader/Loader';

// Lazy-load pages

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="about" element={<About />} />
      <Route path="post/:id" element={<PostDetail />} />
      <Route path="post/:id/:title" element={<PostDetail />} />
      <Route path="tagged/:tagged" element={<Posts />} />
    </Routes>
  );
};
