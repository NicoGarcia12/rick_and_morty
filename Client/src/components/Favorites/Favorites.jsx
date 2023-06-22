import React from 'react';
import { useSelector } from 'react-redux';
import Cards from '../Cards/Cards';

export default function Favorites({ onClose }) {
  const filteredFavorites = useSelector((state) => state.filteredFavorites);

  return (
    <div>
      <div className="favorites">
        <Cards characters={filteredFavorites} onClose={onClose} />
      </div>
    </div>
  );
}
