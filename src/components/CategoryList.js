import React from 'react';
import './CategoryList.css';
import { useNavigate } from 'react-router-dom';


import necklace from '../assets/Categories/necklace.jpg';
import earrings from '../assets/Categories/earrings.jpg';
import bangles from '../assets/Categories/bangles.jpeg';
import rings from '../assets/Categories/Rings.jpeg'; 
import anklet from '../assets/Categories/anklet.jpeg';
import bracelet from '../assets/Categories/bracelet.jpg';
import BridalCombo from '../assets/Categories/Bridal Combo.jpg';
import haram from '../assets/Categories/haram.jpeg';

const categories = [
  { name: 'Necklace', image: necklace, subcategories: ['Choker', 'Short Necklace'] },
  { name: 'Earrings', image: earrings, subcategories: ['Danglers', 'Jhumkas'] },
  { name: 'Bangles', image: bangles, subcategories: ['ScrewBangles','Combo Bangles'] },
  { name: 'Rings', image: rings, subcategories: [] },
  { name: 'Anklet', image: anklet, subcategories: [] },
  { name: 'Bracelet', image: bracelet, subcategories: ['Bracelet & Ring', 'Handcuff'] },
  { name: 'Bridal Combo', image:BridalCombo, subcategories: ['Turkish Combo', 'Kerala Combo'] },
  { name: 'Haram', image: haram, subcategories: ['Long Haar', 'Three Layer Haar'] }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate('/category-products', {
      state: {
        selectedCategory: category.name,
        subcategories: category.subcategories
      }
    });
  };

  return (
  
  <div className="container py-4 mt-5 mb-5 pt-5">
 <div className="d-flex justify-content-between flex-wrap gap-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="text-center category-item"
            onClick={() => handleClick(category)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="rounded-circle category-img mb-2"
            />
            <div className="fw-medium">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
   
    
  );
};

export default Categories;
