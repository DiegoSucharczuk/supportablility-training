import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: string;
  children?: React.ReactNode;
}

export default function Card({ title, description, icon, children }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover glow-effect border border-gray-100">
      {icon && (
        <div className="text-5xl mb-4 floating inline-block">{icon}</div>
      )}
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      {children}
    </div>
  );
}
