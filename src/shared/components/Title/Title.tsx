import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

// Styles
import './Title.scss';

export const Title = () => {
  const navigate = useNavigate();

  return (
    <Box className="title">
      <Box onClick={() => navigate(-1)}>Back</Box>
      <Box onClick={() => navigate('/')}>Home</Box>
      <Button onClick={() => navigate('/tagged/berlin')}>Tagged</Button>
    </Box>
  );
};

export default Title;
