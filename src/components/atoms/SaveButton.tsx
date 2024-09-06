import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 


interface SaveButtonProps {
  cardId: number;
  initialSavedState: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ cardId, initialSavedState }) => {
  const { isLoggedIn } = useAuth(); // Check if user is logged in
  const [saved, setSaved] = useState<boolean>(initialSavedState); // State to track if the card is saved

  const handleSave = async () => {
    if (!isLoggedIn) {
      console.log('User not logged in');
      return;
    }

    try {
      // Toggle the saved state
      const newSavedState = !saved;

      // Update the saved state in the backend (your JSON file or DB)
      const response = await axios.patch(`http://localhost:3001/cards/${cardId}`, {
        saved: newSavedState
      });

      console.log('Server response:', response.data); // Log response

      // Update the frontend state
      setSaved(newSavedState);
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  return (
    <div>
      {isLoggedIn && (
        <button onClick={handleSave} className="save-button">
          {saved ? 'Unsave' : 'Save'}
        </button>
      )}
    </div>
  );
};

export default SaveButton;