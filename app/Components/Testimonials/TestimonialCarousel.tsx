'use client';

import React from 'react';
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
    name: 'Zzor',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aliquid ut, explicabo sit fugiat recusandae dolore omnis minus sequi incidunt aut doloribus minima soluta velit, nobis, est eos iste at! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/zzor.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Amón Lopez',
    text: 'Asperiores tempora id corporis ab reiciendis enim odio expedita dolorum recusandae! Perspiciatis ullam commodi expedita veritatis, architecto molestiae tempora magni voluptas voluptatem. Facilis consequuntur vitae magnam magni? Corrupti, aperiam excepturi! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Jane Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aliquid ut, explicabo sit fugiat recusandae dolore omnis minus sequi incidunt aut doloribus minima soluta velit, nobis, est eos iste at! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/zzor.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'John Smith',
    text: 'Asperiores tempora id corporis ab reiciendis enim odio expedita dolorum recusandae! Perspiciatis ullam commodi expedita veritatis, architecto molestiae tempora magni voluptas voluptatem. Facilis consequuntur vitae magnam magni? Corrupti, aperiam excepturi! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Emily White',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aliquid ut, explicabo sit fugiat recusandae dolore omnis minus sequi incidunt aut doloribus minima soluta velit, nobis, est eos iste at! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/zzor.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Chris Green',
    text: 'Asperiores tempora id corporis ab reiciendis enim odio expedita dolorum recusandae! Perspiciatis ullam commodi expedita veritatis, architecto molestiae tempora magni voluptas voluptatem. Facilis consequuntur vitae magnam magni? Corrupti, aperiam excepturi! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Sarah Brown',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aliquid ut, explicabo sit fugiat recusandae dolore omnis minus sequi incidunt aut doloribus minima soluta velit, nobis, est eos iste at! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/zzor.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Michael Black',
    text: 'Asperiores tempora id corporis ab reiciendis enim odio expedita dolorum recusandae! Perspiciatis ullam commodi expedita veritatis, architecto molestiae tempora magni voluptas voluptatem. Facilis consequuntur vitae magnam magni? Corrupti, aperiam excepturi! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'Laura Grey',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aliquid ut, explicabo sit fugiat recusandae dolore omnis minus sequi incidunt aut doloribus minima soluta velit, nobis, est eos iste at! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/zzor.jpeg',
    googleReviewUrl: '#',
  },
  {
    name: 'David Purple',
    text: 'Asperiores tempora id corporis ab reiciendis enim odio expedita dolorum recusandae! Perspiciatis ullam commodi expedita veritatis, architecto molestiae tempora magni voluptas voluptatem. Facilis consequuntur vitae magnam magni? Corrupti, aperiam excepturi! '.repeat(3),
    linkedinUrl: 'https://www.linkedin.com/in/hugo-salazar/',
    imageUrl: 'https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg',
    googleReviewUrl: '#',
  },
];

export default function TestimonialCarousel() {
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
        >
          {testimonialsData.map((testimonial, index) => (
            <SwiperSlide key={index}>
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
                  <div className={styles.cCardTestimonialExcerpt}>{testimonial.text}</div>
                  <a
                    href={testimonial.linkedinUrl}
                    className={styles.cCardTestimonialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More on Linkedin
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
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