import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div>
        <footer>
        <div className="info-container">
          <img src="./Images/Logos/1080x500logo.svg" alt="logo" />
          <ul>
            <li><a href="./about.html">ABOUT</a></li>
            <li><a href="#">PRIVACY POLICY</a></li>
            <li><a href="#">TERMS</a></li>
            <li><a href="./contact">CONTACT</a></li>
            <li><a href="./gallery.html">GALLERY</a></li>
            <li><a href="./subscription.html">SUBSCRIPTIONS</a></li>
            <li><a href="#">SUPPORT</a></li>
          </ul>
          <p>&copy; 2024, CINEFLIX</p>
        </div>

        <div className="link-container">
          <h2>Follow Us</h2>
          <ul>
            <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-tiktok"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-discord"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-twitch"></i></a></li>
            <li><a href="#"><i className="fa-solid fa-envelope"></i></a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer