import React from 'react';

export default function ProjectAc({ index, title, setModal, projects }) {
  const handleClick = () => {
    // Navigate to the project link when clicked
    window.open(projects[index].link, '_blank');
  };

  return (
    <div 
      onMouseEnter={() => { setModal({ active: true, index }) }} 
      onMouseLeave={() => { setModal({ active: false, index }) }}
      onClick={handleClick}
      className="flex w-full justify-between items-center py-12 px-6 md:px-16 lg:px-24 xl:px-24 border-t border-gray-500 cursor-pointer transition-all duration-200 hover:opacity-50 group"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl m-0 font-normal transition-all duration-400 group-hover:-translate-x-2">
        {title}
      </h2>
      <p className="font-light transition-all duration-400 group-hover:translate-x-2">
        {projects[index].field}
      </p>
    </div>
  );
}