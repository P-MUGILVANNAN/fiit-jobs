import React from 'react';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
}

function CategoryCard({ title, icon }: CategoryCardProps): React.JSX.Element {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center">
      <div className="text-primary-600 mx-auto mb-4 w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
  );
}

export default CategoryCard;