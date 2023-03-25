import React from 'react';
import './App.css';
import RamenList from './components/RamenList'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <RamenList />
      <Footer />
      
    </div>
  );
}

export default App;
