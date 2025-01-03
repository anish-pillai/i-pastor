import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace with the hardcoded user ID
        const hardcodedUserEmail = 'john.doe@mailsac.com';
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${hardcodedUserEmail}`
        );
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
