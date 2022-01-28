import { useNavigate } from 'react-location';

export const Title = () => {
  const navigate = useNavigate();

  return <div onClick={() => navigate({ to: 'tagged/berlin' })}>Test</div>;
};

export default Title;
