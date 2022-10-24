import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import { Loader } from '../ui/Loader/Loader';

// Lazy-load pages
const About = lazy(() => import('../../modules/info/pages/About/About'));
const Posts = lazy(() => import('../../modules/posts/pages/Posts/Posts'));
const PostDetail = lazy(
  () => import('../../modules/posts/pages/PostDetail/PostDetail')
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Posts />
          </Suspense>
        }
      />
      <Route
        path="about"
        element={
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        }
      />
      <Route
        path="post/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PostDetail />
          </Suspense>
        }
      />
      <Route
        path="post/:id/:title"
        element={
          <Suspense fallback={<Loader />}>
            <PostDetail />
          </Suspense>
        }
      />
      <Route
        path="tagged/:tagged"
        element={
          <Suspense fallback={<Loader />}>
            <Posts />
          </Suspense>
        }
      />
    </Routes>
  );
};
