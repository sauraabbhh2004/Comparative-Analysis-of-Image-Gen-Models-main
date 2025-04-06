import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    useEffect(() => {
        // Create the script for Tableau embed API
        const script = document.createElement('script');
        script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        script.async = true;

        // Add script to the document once component mounts
        const vizElement = document.getElementById('viz1729524602650').getElementsByTagName('object')[0];
        if (document.getElementById('viz1729524602650').offsetWidth > 800) {
            vizElement.style.minWidth = '420px';
            vizElement.style.maxWidth = '650px';
            vizElement.style.width = '100%';
            vizElement.style.minHeight = '587px';
            vizElement.style.maxHeight = '887px';
            vizElement.style.height = (document.getElementById('viz1729524602650').offsetWidth * 0.75) + 'px';
        } else if (document.getElementById('viz1729524602650').offsetWidth > 500) {
            vizElement.style.minWidth = '420px';
            vizElement.style.maxWidth = '650px';
            vizElement.style.width = '100%';
            vizElement.style.minHeight = '587px';
            vizElement.style.maxHeight = '887px';
            vizElement.style.height = (document.getElementById('viz1729524602650').offsetWidth * 0.75) + 'px';
        } else {
            vizElement.style.width = '100%';
            vizElement.style.height = '927px';
        }

        // Append the script to the DOM
        vizElement.parentNode.insertBefore(script, vizElement);

        // Cleanup the effect by removing the script when the component unmounts
        return () => {
            vizElement.parentNode.removeChild(script);
        };
    }, []);

    return (
        <div className="prompt-page">
            <div className="navbar">
                <Link to="/">
                    <div className="logo">Matching Models</div>
                </Link>
                <nav>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>

            <div className="prompt-section">
                <div className="tableauPlaceholder" id="viz1729524602650" style={{ position: 'relative' }}>
                    <noscript>
                        <a href='#'>
                            <img
                                alt='Tableau Visualization'
                                src='https://public.tableau.com/static/images/Bo/Book1_17295245693220/Dashboard1/1_rss.png'
                                style={{ border: 'none' }}
                            />
                        </a>
                    </noscript>
                    <object className="tableauViz" style={{ display: 'none' }}>
                        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
                        <param name="embed_code_version" value="3" />
                        <param name="site_root" value="" />
                        <param name="name" value="Book1_17295245693220/Dashboard1" />
                        <param name="tabs" value="no" />
                        <param name="toolbar" value="yes" />
                        <param name="static_image" value="https://public.tableau.com/static/images/Bo/Book1_17295245693220/Dashboard1/1.png" />
                        <param name="animate_transition" value="yes" />
                        <param name="display_static_image" value="yes" />
                        <param name="display_spinner" value="yes" />
                        <param name="display_overlay" value="yes" />
                        <param name="display_count" value="yes" />
                        <param name="language" value="en-US" />
                        <param name="filter" value="publish=yes" />
                    </object>
                </div>
            </div>

            <footer className="footer-section">
                <p>&copy; 2024 Prompt Generator | <a href="#contact">Contact Us</a></p>
            </footer>
        </div>
    );
};

export default Dashboard;
