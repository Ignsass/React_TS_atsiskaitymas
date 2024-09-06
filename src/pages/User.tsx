import React, { useState, useEffect } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/molecules/Card';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import loadingGif from '../assets/kOnzy.gif'; 

const User: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [savedCards, setSavedCards] = useState<any[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:3001/cards?saved=true').then((response) => {
        setSavedCards(response.data);
        setLoading(false);
      });
    }
  }, [isLoggedIn]);

  const handleSave = (id: number) => {
    console.log('Save card with id:', id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/cards/${id}`);
      setSavedCards(savedCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div>
      <Header />
      {isLoggedIn ? (
        loading ? (
          <img src={loadingGif} alt="Loading..." />
        ) : savedCards.length ? (
          <div className="cards-container">
            {savedCards.map((card) => (
              <Card
                key={card.id}
                {...card}
                onSave={() => handleSave(card.id)}
                onDelete={() => handleDelete(card.id)}
              />
            ))}
          </div>
        ) : (
          <p>No saved posts found</p>
        )
      ) : (
        <p>Please login to view saved posts</p>
      )}
      <Footer />
    </div>
  );
};

export default User;