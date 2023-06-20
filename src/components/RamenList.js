import React, { useState } from 'react';
import '../App.css';
import './RamenList.css';
import $ from 'jquery';

const RamenList = () => {
  const [location, setLocation] = useState('');
  const [ramenRestaurants, setRamenRestaurants] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = () => {
    $.ajax({
      url: 'http://localhost:3001/api/ramen',
      data: {
        location: location,
      },
      success: (data) => {
        setRamenRestaurants(data.businesses);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  };
  

  return (
    <div className="ramen-list">
      <div className="search">
        <form className='form' onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Enter Your Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="results">
        <h2>Ramen restaurants in {location}</h2>
        <ul>
          {ramenRestaurants.map((ramen) => (
            <li key={ramen.id}>
              <h3>{ramen.name}</h3>
              <img src={ramen.image_url} alt={ramen.name} />
              <p>{ramen.location.address1}</p>
              <p>
                {ramen.location.city}, {ramen.location.state}{' '}
                {ramen.location.zip_code}
              </p>
              <p>Rating: {ramen.rating}</p>
              <p>Price: {ramen.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RamenList;
