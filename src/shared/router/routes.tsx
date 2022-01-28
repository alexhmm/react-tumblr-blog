import { Navigate, Route } from 'react-location';
import { About } from '../../modules/info/pages/About/About';

// Components
import { Posts } from '../../modules/posts/pages/Posts/Posts';

export const routes: Route[] = [
  {
    path: '/',
    element: <Posts />
  },
  {
    path: 'about',
    element: <About />
  },
  {
    path: 'post',
    children: [
      {
        path: ':postId',
        children: [
          {
            path: ':title'
          }
        ]
      }
    ]
  },
  {
    path: 'tagged',
    children: [
      {
        element: <Posts />,
        path: ':tag'
      }
    ]
  },
  {
    element: <Navigate to="/" />
  }
];
