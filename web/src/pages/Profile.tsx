import { Box, Typography, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { userInfo } = useAuth();
  const { name, picture } = userInfo;

  if (!userInfo) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Avatar src={picture} alt={name} sx={{ width: 100, height: 100 }} />
      <Typography variant='h4'>{name}</Typography>
    </Box>
  );
};

export default Profile;
