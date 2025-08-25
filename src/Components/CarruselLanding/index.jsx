import React, { useState, useEffect } from 'react';
import Img1 from '../../Images/img-landing-1.jpg';
import Img2 from '../../Images/img-landing-2.jpg';
import Img3 from '../../Images/img-landing-3.jpg';
import './styles.css';

function CarruselLanding() {
    const images = [Img1, Img2, Img3];
    const [currentIndex, setCurrentIndex] = useState(0);

    //efecto para el intervalo de las imgs
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <img 
            src={images[currentIndex]} 
            alt="not found" 
            className="imgCarruselLanding"
        />
    );
}

export default CarruselLanding;
