import React from 'react';
import { CardProps } from '../../../../common/interfaces/CardProps';

export function Card({ title }: CardProps): JSX.Element {
  return <div className="card">{title}</div>;
}
