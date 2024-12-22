'use client';

// components/ScrollToTop.js
import { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scrolling
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    return (
        <button
            onClick={scrollToTop}
            style={{
                display: visible ? 'block' : 'none',
                position: 'fixed',
                bottom: '20px',
                right: '30px',
                backgroundColor: '#dd761c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px',
                paddingLeft: '12px',
                paddingRight: '12px',
                cursor: 'pointer',
                fontSize: '18px',
                // mixBlendMode: 'difference',
            }}
            title="Go to top"
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTop;
