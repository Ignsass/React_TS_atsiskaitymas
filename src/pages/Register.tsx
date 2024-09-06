import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const usersResponse = await axios.get('http://localhost:3001/users');
      const userExists = usersResponse.data.some(
        (user: any) => user.email === email || user.username === username
      );

      if (userExists) {
        setError('Email or username already exists');
        return;
      }

      await axios.post('http://localhost:3001/users', {
        email,
        username,
        avatarUrl: avatarUrl || 'default-avatar.png',
        birthDate,
        password,
      });

      login();
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
      setError('An error occurred while registering');
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <Input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="Avatar URL (optional)" />
        <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="Birth Date" required />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
        <Button type="submit">Register</Button>
        {error && <div className="error">{error}</div>}
      </form>
      <Footer />
    </div>
  );
};

export default Register;
