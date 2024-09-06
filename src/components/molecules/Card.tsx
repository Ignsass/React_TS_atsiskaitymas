import React from 'react';
import SaveButton from '../atoms/SaveButton';

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  avatarUrl: string;
  createdAt: string;
  saved: boolean;
  onDelete?: () => void;
}

const Card: React.FC<CardProps> = ({ id, title, description, imageUrl, avatarUrl, createdAt, saved, onDelete }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" /> {}
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={avatarUrl} alt="avatar" className="avatar-image" />
      <p>{new Date(createdAt).toLocaleDateString()}</p>
      <SaveButton cardId={id} initialSavedState={saved} />
      {onDelete && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};

export default Card;
