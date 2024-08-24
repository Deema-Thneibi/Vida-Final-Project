
import React from 'react'
import logo from './img/logo (1).png'
import message from './img/contact/message.svg'
import phone from './img/contact/phone.svg'
import location from './img/contact/location.svg'
import facebook from './img/social/facebook.svg'
import linkedin from './img/social/linkedin.svg'
import twitter from './img/social/twitter.svg'


import { Link } from 'react-router-dom'
import './footer.css'
export default function Footer() {
  return (
    <>
<footer id='footer'>
  <div className="container">
    <div className="row">
      <div className="logo">
      <div className="logo-1">
            <div className="logoImg">
              <Link to='/'><img src={logo} alt="shopping logo" /></Link>
            </div>
            <Link to="/">Vida</Link>
          </div>
        <div className="contact">
          <ul>
            <li>
              <img src={message} alt="email" />
              <Link to="mailto: hello@skillbridge.com">hello@skillbridge.com</Link>
            </li>
            <li>
              <img src={phone} alt="phone" />
              <Link to="tel:+91 91813 23 2309">+91 91813 23 2309</Link>
            </li>
            <li>
              <img src={location} alt="location" />
              <Link to="#">Somewhere in the World</Link>
            </li>
          </ul>
        </div>
      </div>


      <div className="item">

        <div className="about">
          <h3>About Us</h3>
          <ul>
            <li>Company</li>
            <li>Achievements</li>
            <li>Our Testimonials</li>
            <li>Our Goals</li>
          </ul>
        </div>

        <div className="social">
          <h3>Social Profiles</h3>
          <div className="link">
            <Link to="#">
              <img src={facebook} />
            </Link>
            <Link to="#">
              <img src={linkedin} />
            </Link>
            <Link to="#">
              <img src={twitter} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  </div>
</footer>

</>
  )
}
