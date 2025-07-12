'use client';

import React from 'react';
import styles from './PoemCards.module.css';

const teamMembers = [
  {
    id: 'card-1',
    nextId: 'card-2',
    name: 'Sonam Singh',
    position: 'Founder & Managing Director',
    imgSrc: '/SONAM.png',
    imgAlt: 'Sonam Singh',
    description: 'Sonam Singh is the founder and Managing Director of Delfyle and a qualified law graduate (LL.B.), bringing over a decade of expertise in sales, marketing, strategic planning, and legal consulting. With a strong foundation in law and business, Sonam envisioned Delfyle as a one-stop solution for legal, compliance, accounting, and regulatory needs. Her leadership has transformed Delfyle into a trusted name for startups, corporates, and public institutions, providing reliable support in accounting, taxation, civil and criminal law. Driven by the spirit of Atmanirbhar Bharat and Startup India, Sonam\'s mission is to eliminate business hurdles and make entrepreneurship seamless for India\'s innovators.',
  },
  {
    id: 'card-2',
    nextId: 'card-3',
    name: 'Adwitiya Mukherjee',
    position: 'Co-founder & Chief Executive Officer',
    imgSrc: '/SONAM.png',
    imgAlt: 'Adwitiya Mukherjee',
    description: 'As a qualified Company Secretary (CS), CA Finalist and the Co-founder & CEO of Delfyle, Adwitiya Mukherjee brings in-depth knowledge and years of experience in Corporate and Secretarial Laws. She has successfully handled clients of high repute and has assisted in numerous high-stakes NCLT cases. Adwitiya\'s analytical approach and compliance expertise make her an integral pillar of Delfyle\'s operations. Her work ensures that every client, from startups to large enterprises, receives precise, up-to-date, and compliant corporate governance solutions.',
  },
  {
    id: 'card-3',
    nextId: 'card-4',
    name: 'Abhinandan Das',
    position: 'Legal Associate',
    imgSrc: '/SONAM.png',
    imgAlt: 'Abhinandan Das',
    description: 'Abhinandan Das is a legal associate specializing in corporate and civil litigation, with hands-on experience representing clients in various courts and tribunals across India. A law graduate from Calcutta University, Abhinandan excels in contract management, corporate advisory, and dispute resolution. His sharp understanding of commercial laws and contractual risk management makes him an essential member of Delfyle\'s legal team, offering strategic counsel to businesses across sectors.',
  },
  {
    id: 'card-4',
    nextId: 'card-5',
    name: 'Sourav Mukherjee',
    position: 'Legal Associate',
    imgSrc: '/SONAM.png',
    imgAlt: 'Sourav Mukherjee',
    description: 'Sourav Mukherjee is a versatile legal associate at Delfyle with strong expertise in projects & infrastructure law, commercial law, and dispute resolution. A graduate of Calcutta University with a B.A. LL.B., Sourav brings a multidisciplinary approach to legal practice, handling a wide range of civil and criminal matters.',
    expertise: [
      'Civil litigation and cheque dishonor cases',
      'Debt Recovery Tribunal (DRT) proceedings',
      'Arbitration and contract enforcement',
      'Corporate and commercial contracts',
      'Insolvency and bankruptcy law',
      'Criminal law and family law',
      'Consumer protection disputes',
      'Labour and employment law',
      'Crimes against women and children',
      'Property disputes and administrative legal matters',
    ],
    additionalInfo: 'Sourav\'s broad spectrum of experience across sectors allows him to offer strategic legal solutions for both individuals and organizations. His deep understanding of procedural law and regulatory systems makes him a trusted advisor in complex legal matters requiring diligence and precision.',
  },
  {
    id: 'card-5',
    nextId: 'card-6',
    name: 'Avinash Roy',
    position: 'Senior Tax Associate',
    imgSrc: '/SONAM.png',
    imgAlt: 'Avinash Roy',
    description: 'Avinash Roy is a highly experienced Senior Tax Associate at Delfyle, specializing in both direct and indirect taxation. With over 6 years of in-depth experience, Avinash has successfully managed complex tax structures, assessments, and compliance strategies for startups, SMEs, corporates, and high-net-worth individuals.',
    expertise: [
      'Income Tax planning and advisory',
      'GST compliance and return filing',
      'Tax audit support and representation',
      'Corporate taxation for private and public companies',
      'Handling notices, scrutiny, and appeals before tax authorities',
      'Structuring tax-efficient business models',
      'TDS management and e-filing services',
    ],
    additionalInfo: 'Avinash is known for his strategic thinking and precision in tax planning, which helps clients minimize liabilities while ensuring full legal compliance. His practical knowledge and up-to-date understanding of changing tax laws make him a valuable asset for businesses navigating the complex Indian tax landscape.',
  },
  {
    id: 'card-6',
    nextId: 'card-1',
    name: 'Debangshu Auddy',
    position: 'Compliance Executive',
    imgSrc: '/SONAM.png',
    imgAlt: 'Debangshu Auddy',
    description: 'Debangshu Auddy is a Compliance Executive at Delfyle with over 3 years of experience in managing ROC compliances and legal documentation for both private and public companies. He specializes in end-to-end corporate compliance, ensuring seamless filings with the Ministry of Corporate Affairs (MCA) under the Companies Act, 2013.',
    expertise: [
      'Filing of ROC forms (AOC-4, MGT-7, DIR-3 KYC, etc.)',
      'Handling company incorporation, changes in directorship, shareholding, and registered office',
      'Drafting of Board Resolutions, Shareholder Agreements, NDAs, MOA/AOA, and compliance documents',
      'Legal vetting and contract management',
    ],
    additionalInfo: 'Debangshu plays a vital role in maintaining legal hygiene for Delfyle\'s clients, ensuring compliance, accuracy, and timely filings.',
  },
];

const PoemCards = () => {
  return (
    <div className={styles.component}>
      <header className={styles.header}>
        <h1>Our Leadership & Legal Experts</h1>
        <p>
          At Delfyle, we take pride in being more than just a legal and compliance consultancy—we're your extended team. 
          Backed by professionals with deep expertise in law, finance, and corporate governance, our core team leads with 
          precision, vision, and a shared passion for enabling entrepreneurial growth across India.
        </p>
      </header>

      <section className={styles.container}>
        {teamMembers.map((member, index) => (
          <input
            key={member.id}
            className={styles.srOnly}
            id={member.id}
            type="radio"
            name="panel"
            defaultChecked={index === 0}
          />
        ))}

        {teamMembers.map((member) => (
          <article key={member.id} className={styles.card}>
            <header className={styles.cardHeader}>
              <h2>{member.name}</h2>
              <label htmlFor={member.nextId}>Next</label>
            </header>
            <div className={styles.cardBody}>
              <div className={styles.imgContainer}>
                <img src={member.imgSrc} alt={member.imgAlt} />
              </div>
              <div className={styles.contentWrapper}>  
              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <div className={styles.headerImage}>
                    <img src={member.imgSrc} alt={member.imgAlt} />
                  </div>
                  <div className={styles.headerText}>
                    <h3>{member.name}</h3>
                    <h4>{member.position}</h4>
                  </div>
                </div>
                <p>{member.description}</p>
                {member.expertise && (
                  <ul>
                    {member.expertise.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {member.additionalInfo && <p>{member.additionalInfo}</p>}
              </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default PoemCards; 