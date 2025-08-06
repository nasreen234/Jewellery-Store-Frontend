
import React from 'react';
import { Carousel } from 'react-bootstrap';

const BannerProduct = () => {
  const banners = [
    {
      image:
        'https://www.khazanajewellery.com/pub/media/wysiwyg/home/muhurthan_banner_hp.jpg',
         caption: 'Elegant Necklaces for Every Occasion',
    },
    {
      image:
        'https://d25xd2afqp2r8a.cloudfront.net/images/Banner2.webp',
         caption: 'Trendy Earrings to Make You Shine',
    },
    {
      image:
        'https://assets.indiaonline.in/businessimg/gallery/250/3109248_3ed05.webp',
        caption: 'Explore Our Exclusive Choker Sets',
    },
{
       image:
       'https://static.wixstatic.com/media/b69f5d_7d8f7451b8d84da9bfd9caefcacb93e4~mv2.jpg/v1/fill/w_980,h_603,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b69f5d_7d8f7451b8d84da9bfd9caefcacb93e4~mv2.jpg',
        caption: 'Stylish One Gram Gold Sets',
      }

];

   return (
    <Carousel fade className="mb-4">
      {banners.map((item, index) => (
        <Carousel.Item key={index} interval={3000} className="text-center">
          <img
            className="d-block w-100"
            src={item.image}
            alt={`Banner ${index}`}
            style={{
              height: '400px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          {item.caption && (
            <div
              className="mt-2"
              style={{
                backgroundColor: '#f8f9fa',
                padding: '10px',
                borderRadius: '6px',
                fontWeight: '500',
              }}
            >
              {item.caption}
            </div>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BannerProduct;
