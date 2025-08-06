
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import CategoryList from '../components/CategoryList.js';
  import BannerProduct from '../components/BannerProduct';
  import Header from '../components/Header';
  import HorizontalCardProduct from '../components/HorizontalCardProduct.js';
  import VerticalCardProduct from '../components/VerticalCardProduct.js';
  import VideoHighlightSection from '../components/VideoHighlightSection';
  import Footer from '../components/Footer';
  const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchAllProducts = async () => {
        try {
          const res = await axios.get('https://jewellery-store-one.vercel.app/api/products');
          setProducts(res.data);
        } catch (err) {
          console.error('Error fetching products:', err);
        }
      };

      fetchAllProducts();
    }, []);


    return (
      <>
        <Header />
        <div className="container py-3">
          <CategoryList />
          <BannerProduct />
           <VideoHighlightSection />
       

       <HorizontalCardProduct category="bangles" heading="Stylish Bangles" /> 
      <HorizontalCardProduct category="earrings" heading="Trendy Earrings" />
       <HorizontalCardProduct category="bridal Combo" heading="Bridal Combo" />

        <VerticalCardProduct title="Mang-Tikka Collection" items={products.filter(p => p.category?.toLowerCase() === 'mang tikka')} />
        <VerticalCardProduct title="Necklace Collection" items={products.filter(p => p.category?.toLowerCase() === 'necklace')} />
        <VerticalCardProduct title="Chain Collection" items={products.filter(p => p.category?.toLowerCase() === 'chain & pendant')} />
        <VerticalCardProduct title="Rings Collection" items={products.filter(p => p.category?.toLowerCase() === 'rings')} />
        <VerticalCardProduct title="Bracelets Collection" items={products.filter(p => p.category?.toLowerCase() === 'bracelet')} />
        <VerticalCardProduct title="Anklets Collection" items={products.filter(p => p.category?.toLowerCase() === 'anklet')} />
      </div>
      <Footer />
      </>
    );
  };

  export default Home;
