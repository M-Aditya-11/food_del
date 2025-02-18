import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, odio nisi? Exercitationem ab molestiae facere, nostrum eveniet labore aspernatur nulla possimus quam nam porro laboriosam non sapiente quia repudiandae, aperiam eius? Eveniet pariatur earum a sequi quis provident veniam quas praesentium est, tenetur dolorem tempore, maxime quisquam quae incidunt nobis exercitationem, molestias deleniti totam beatae! Ipsam quibusdam quas at, vero error vel atque quidem expedita distinctio ullam sequi perspiciatis sint est harum recusandae qui blanditiis officia magnam, quod dolor magni.</p>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-345-67890</li>
                    <li>contact@tmt.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 @ Tomato.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer