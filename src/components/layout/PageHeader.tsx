import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
  return (
    <div className="mb-6 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold leading-7 text-dark-900 sm:truncate sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>}
      </div>
      {action && <div className="mt-4 flex md:mt-0 md:ml-4">{action}</div>}
    </div>
  );
};

export default PageHeader;