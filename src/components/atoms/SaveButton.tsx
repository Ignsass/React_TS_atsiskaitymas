import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 

interface SaveButtonProps {
  cardId: number;
  initialSavedState: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ cardId, initialSavedState }) => {
  const { isLoggedIn } = useAuth(); 
  const [saved, setSaved] = useState(initialSavedState); // 
  const handleSave = async () => {
    if (!isLoggedIn) return;

    try {
      const newSavedState = !saved;

      const response = await axios.patch(`http://localhost:3001/cards/${cardId}`, {
        saved: newSavedState
      });

      console.log('Server response:', response.data); 
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
