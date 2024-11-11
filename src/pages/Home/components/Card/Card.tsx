import React from 'react';

interface CardProps {
  title: string;
}

export function Card({ title }: CardProps): JSX.Element {
  return <div className="card">{title}</div>;
}
