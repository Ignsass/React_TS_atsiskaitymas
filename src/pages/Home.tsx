import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/molecules/Card';
import { useAuth } from '../context/AuthContext';

interface Card {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  saved: boolean;
}

const Home: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const { isLoggedIn } = useAuth(); 

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/cards/${id}`);
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="card-container">
        {cards.length === 0 ? (
          <p>No cards available</p>
        ) : (
          cards.map(card => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              avatarUrl={card.avatarUrl}
              createdAt={card.createdAt}
              onDelete={isLoggedIn ? () => handleDelete(card.id) : undefined} id={0} saved={false}            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
