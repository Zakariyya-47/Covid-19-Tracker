import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faWhatsapp,
    faGithub,
  } from "@fortawesome/free-brands-svg-icons"; 
export default function SocialFollow() {
  return (
    <div class="social-container">
      <a href="https://www.instagram.com/zakariyya47"
        className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a href="https://wa.link/b46hxu"
        className="whatsapp social">
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>
      <a href="https://github.com/Zakariyya-47/Covid-19-Tracker"
        className="fab fa-github-square">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
    </div>
  );
}