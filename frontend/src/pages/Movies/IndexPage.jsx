import React from 'react';
import '../Movies/IndexPage.css';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="main-content">
        <h2>CINEFLIX</h2>
        <p>
          Experience the magic of movies like never before. <strong>CineFlix</strong> lets you book tickets for the latest blockbusters, <em>share your reviews</em>, and explore award-winning films. Stay updated on trending titles, discover nominees for the biggest awards, and connect with a community of passionate movie enthusiasts. Your cinematic adventure begins here!
        </p>

        <button 
          className="button1" 
          onClick={() => navigate('/movie-library')}
        >
          Browse Movies
        </button>
        <button className="button2">Review</button>
      </section>

      <section className="explore-content">
        <h1>EXPLORE</h1>
        <div className="flexbox">
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </section>

      <section className="newsletter">
        <div className="insider-info">
          <h2>CINEFLIX</h2>
          <h4>INSIDER</h4>
          <p><strong>SIGN UP</strong> FOR UPDATES & NEWS</p>
        </div>
        <div className="insider-form">
          <form>
            <input placeholder="Email" type="email" />
            <input value="SUBSCRIBE" type="submit" />
          </form>
        </div>
      </section>

    <Footer />
    </div>
  );
};

export default IndexPage;
