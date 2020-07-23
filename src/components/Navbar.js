import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return(
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/allchats">All Chats</Link>
            </li>
          </ul>
        </nav>
    );
}