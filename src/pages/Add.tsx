import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Add: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('You must be logged in to add a card');
      return;
    }

    try {
      const payload = {
        title,
        description,
        imageUrl: imageUrl || null,
        createdAt: new Date().toISOString(),
      };

      console.log('Payload:', payload);

      const response = await axios.post('http://localhost:3001/cards', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Card added:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error adding card:', error);
      setError('An error occurred while adding the card');
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <Input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL (optional)" />
        <input type="file" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
        <Button type="submit">Add Card</Button>
        {error && <div className="error">{error}</div>}
      </form>
      <Footer />
    </div>
  );
};

export default Add;
