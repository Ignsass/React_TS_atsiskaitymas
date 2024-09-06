import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/users');
      const user = response.data.find(
        (user: any) => user.email === email && user.password === password
      );
      if (user) {
        login();
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {}
        <Button type="submit">Login</Button>
        {error && <div className="error">{error}</div>}
      </form>
      <Footer />
    </div>
  );
};

export default Login;
