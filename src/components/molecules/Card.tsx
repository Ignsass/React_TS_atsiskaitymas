import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  avatarUrl: string;
  createdAt: string;
  onDelete?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, avatarUrl, createdAt, onDelete }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" /> {}
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={avatarUrl} alt="avatar" className="avatar-image" />
      <p>{new Date(createdAt).toLocaleDateString()}</p>
      {onDelete && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};

export default Card;
