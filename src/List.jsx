import React, { useState } from "react";

export default function List({ item, handleChange, isDragging }) {
  console.log(isDragging, item.id);

  return (
    <div
      className={`
        bg-gray-700/60 
        text-white 
        shadow-md 
        p-4 
        rounded-xl 
        mb-4 
        cursor-grab 
        transition-all 
        duration-300 
        ease-in-out 
        border border-gray-600 
        backdrop-blur-sm
        ${isDragging ? "scale-105 ring-2 ring-blue-500" : "hover:shadow-lg hover:bg-gray-700/80"}
      `}
      draggable="true"
      onDragStart={(e) => handleChange(e, item.id)}
    >
      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
      <p className="text-gray-300 text-sm">{item.description}</p>
    </div>
  );
}
