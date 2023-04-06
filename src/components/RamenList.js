import React, { useState } from 'react';
import '../App.css';
import './RamenList.css';
import axios from 'axios';

const apiKey = process.env.REACT_APP_YELP_API_KEY;
const clientId = process.env.REACT_APP_YELP_CLIENT_ID;




const RamenList = () => {
  const [location, setLocation] = useState('');
  const [ramenRestaurants, setRamenRestaurants] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.yelp.com/v3/businesses/search?term=ramen&location=${location}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'X-Requested-With': 'XMLHttpRequest',
            'Client-ID': clientId,
          },
        }
      );
      setRamenRestaurants(response.data.businesses);
    } catch (error) {
      console.error(error);
    }
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

export default RamenList
