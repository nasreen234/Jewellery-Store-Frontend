import React from 'react';

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={`full-${i}`} className="bi bi-star-fill mx-1"></i>);
  }

  if (halfStar) {
    stars.push(<i key="half" className="bi bi-star-half mx-1"></i>);
  }

  return stars;
};

const VideoHighlightSection = () => {
  const videoItems = [
    { src: 'https://res.cloudinary.com/diinbpxjm/videos/upload/jewelry-shine_g1qf6m/jewelry-shine.mp4', title: 'Shining Set', rating: 5 },
    { src: '/videos/Chain.mp4', title: 'Elegant Chains', rating: 4 },
    { src: '/videos/Earrings.mp4', title: 'Trendy Earrings', rating: 4.5 },
    { src: '/videos/NewBangles.mp4', title: 'New Bangles', rating: 4 },
    { src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Short Necklace', rating: 5 },
  ];

  return (
    <div className="container my-4">
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 video-row">
        {videoItems.map((item, idx) => (
          <div
            key={idx}
            className="position-relative text-white"
            style={{
              width: '200px',
              height: '300px',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid gold',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.4)',
            }}
          >
            <video
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              className="position-absolute bottom-0 w-100 text-center py-2"
              style={{
                background: 'rgba(0,0,0,0.5)',
                fontWeight: '600',
                fontSize: '14px',
                backdropFilter: 'blur(4px)',
              }}
            >
              {item.title}
              <div style={{ color: '#ffd700', fontSize: '14px', marginTop: '2px' }}>
                {renderStars(item.rating)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoHighlightSection;
