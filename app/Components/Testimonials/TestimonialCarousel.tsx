'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Mousewheel, Navigation, Pagination } from 'swiper/modules';

import styles from './TestimonialCarousel.module.scss';

const testimonialsData = [
  {
    name: 'Angana Roy',
    text: '“I had gotten in touch with them through a friend. Adwitiya was extremely helpful and prompt with all of my queries. They provided legal advice in a way which was easy to understand for a layman like me. All love and wishes to them. Would definitely recommend further.”',
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/zzor.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Shyam Gupta',
    text: '“I had gotten in touch with them through a friend. Adwitiya was extremely helpful and prompt with all of my queries. They provided legal advice in a way which was easy to understand for a layman like me. All love and wishes to them. Would definitely recommend further.”',
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Mechtrobo Private Limited',
    text: '“Thank you Team Delfyle for on time delivering you commitment. Recommended by one of my friend when I&#39;m struggling with my ITR & license related work, you people&#39;s really help us in a great manner.”',
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/zzor.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Shantanu Samaddar',
    text: '“The team is vey friendly in communication, yet professional in execution. Makes best and correct use of information provided and usually comes up with the best solution possible. There is usually no back and forth with information and documents to reach a conclusion or solution. In short, friendly, quick, confident and fair priced.”',
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Shashank Shekhar Singh ',
    text: '“We’ve had an outstanding experience working with Delfyle. Their team has been absolutely helpful at every step—whether it was company registration, trademark filings, GST, ITR, tax audits, or accounting and other matters. They were always available, responsive, and proactive in finding the right solutions for our compliance needs. What sets Delfyle apart is their deep understanding of regulatory requirements and their commitment to making the process seamless and stress-free. Their support has been instrumental in helping our organization stay compliant and grow with confidence.”',
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/zzor.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Trishila Roy',
    text: '“I have approached Delfyle for Trademark few months back. Loved their energy towards their work!! The team is highly professional and enthusiastic! Got my services delivered on time with minimal fees! Thank you Team Delfyle! You guys are amazing. Period.”',
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Subhanil Basu',
    text: '“Great service provided by the team. The professionals are highly talented and does the work seamlessly and efficiently! Highly recommend.”',
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/zzor.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Shreyash Subudhi',
    text: '“The team has been very helpful in delivering my needful requirements. The team have been able to provide services beyond their area of presence. A professional and humble team at the same time.”',
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg',
    googleReviewUrl: '#',
  },
];

function useIsMobileOrTablet() {
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsMobileOrTablet(window.innerWidth <= 992);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobileOrTablet;
}

export default function TestimonialCarousel() {
  const isMobileOrTablet = useIsMobileOrTablet();
  const [expandedIndexes, setExpandedIndexes] = useState<{ [key: number]: boolean }>({});
  const swiperRef = useRef<any>(null);

  const handleReadMore = (index: number) => {
    setExpandedIndexes((prev) => ({ ...prev, [index]: true }));
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Testimonials Swiper JS</h1>
      <div className={styles.cTestimonials}>
        <Swiper
          modules={[EffectFade, Mousewheel, Navigation, Pagination]}
          effect={'fade'}
          loop={true}
          spaceBetween={30}
          mousewheel={{
            invert: false,
          }}
          pagination={{
            el: '.c-testimonials__pagination',
            clickable: true,
          }}
          navigation={{
            nextEl: '.c-testimonials__arrow-next',
            prevEl: '.c-testimonials__arrow-prev',
          }}
          className="mySwiper"
          ref={swiperRef}
        >
          {testimonialsData.map((testimonial, index) => {
            let excerpt = testimonial.text;
            let showReadMore = false;
            if (isMobileOrTablet && !expandedIndexes[index]) {
              const words = testimonial.text.split(' ');
              if (words.length > 20) {
                excerpt = words.slice(0, 20).join(' ') + '...';
                showReadMore = true;
              }
            }
            return (
              <SwiperSlide key={index} className={styles.swiperWrapper}>
                <div className={styles.cCardTestimonial}>
                  <div className={styles.cCardTestimonialProfile}>
                    <Image
                      src={testimonial.imageUrl}
                      alt={`${testimonial.name}'s profile picture`}
                      width={300}
                      height={300}
                      objectFit="cover"
                    />
                  </div>
                  <div className={styles.cCardTestimonialDescription}>
                    <div className={styles.cCardTestimonialAuthor}>{testimonial.name}</div>
                    <a href={testimonial.googleReviewUrl} className={styles.googleReview} target="_blank" rel="noopener noreferrer">
                      <div className={styles.stars}>★★★★★</div>
                      <Image src="/google.svg" alt="Google" width={20} height={20} />
                      <span>Google Review</span>
                    </a>
                    <div className={styles.cCardTestimonialExcerpt}>
                      {excerpt}
                      {showReadMore && (
                        <>
                          {' '}
                          <button style={{ color: '#0070f3', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => handleReadMore(index)}>
                            read more
                          </button>
                        </>
                      )}
                    </div>
                    {/* Navigation controls inside card */}
                    <div className={styles.cardNavContainer}>
                      <button className={styles.cardNavButton} onClick={handlePrev} aria-label="Previous testimonial">
                        <svg viewBox="0 0 24 24"><polyline points="15 6 9 12 15 18" /></svg>
                      </button>
                      <button className={styles.cardNavButton} onClick={handleNext} aria-label="Next testimonial">
                        <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="c-testimonials__pagination"></div>
        <div className={styles.cTestimonialsArrows}>
          <button className="c-testimonials__arrow-prev">Prev</button>
          <button className="c-testimonials__arrow-next">Next</button>
        </div>
      </div>
    </div>
  );
} 