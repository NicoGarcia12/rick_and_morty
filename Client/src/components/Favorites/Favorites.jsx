import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderCards, filterCards } from '../../redux/actions';
import Cards from '../Cards/Cards';

export default function Favorites({ onClose }) {
  const [filter, setFilter] = useState('All');
  const [order, setOrder] = useState('A');
  const allFavorites = useSelector((state) => state.allFavorites);
  const filteredFavorites = useSelector((state) => state.filteredFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCards(filter));
  }, [filter, dispatch]);

  useEffect(() => {
    dispatch(orderCards(order));
  }, [order, dispatch]);

  function handleOrder(event) {
    const selectedOrder = event.target.value;
    setOrder(selectedOrder);
  }

  function handleFilter(event) {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
  }

  return (
    <div className="favorites">
      <select value={order} onChange={handleOrder}>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <select value={filter} onChange={handleFilter}>
        <option value="All">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
      <Cards characters={filteredFavorites} onClose={onClose} />
    </div>
  );
}
