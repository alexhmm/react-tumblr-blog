import { Route, Routes } from 'react-router-dom';
import { About } from '../../modules/info/pages/About/About';

// Pages
import { Posts } from '../../modules/posts/pages/Posts/Posts';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />}>
        {/* <Route path="post">
          <Route path=":id" element={<Post />}></Route>
        </Route> */}
        <Route path="tagged">
          <Route path=":tag" element={<Posts />} />
        </Route>
      </Route>
      <Route path="about" element={<About />} />
    </Routes>
  );
};
