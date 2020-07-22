import React, {Component, Fragment} from "react"
import Link from 'next/link'

const Footer = () => (
    <footer>
        <div id="main">
            <Link href='/'>
                <button id="home-div">
                    <img src="/home.svg" />
                </button>
            </Link>

            <Link href='/map'>
                <button id="map-div">
                    <img src="/map.svg" />
                </button> 
            </Link>

            <Link href='/'>
                <button id="events-div">
                    <img src="/events.svg" />
                </button>
            </Link>  
        </div>
        <style jsx>{`
            footer #main {
                width: 100%;
                display: flex;
                align: center;
              }
              
            footer #main button {
                -ms-flex: 1;  /* IE 10 */  
                flex: 1;
                height: 50px;
                background-color: #003B8B;
                border: none;
              }

            footer img {
                display: block;
                margin-left: auto;
                margin-right: auto;
                width:40%;
                height: 80%;
              }
        `}</style>
    </footer>
);
  
export default Footer;