import React, { ReactNode } from 'react';

interface SectionProps {
  children?: ReactNode;
  heading: string;
}

const Section = ({ children, heading }: SectionProps) => {
  return (
    <>
      <h2>{heading}</h2>
      {children}
    </>
  );
};

export default Section;
