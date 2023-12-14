import React from 'react';

export default ({ onDelete, children, cannotDelete }) => (
    
    <button 
        // className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined "
        className={cannotDelete
            ? "cursor-not-allowed inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest" : "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined"}
        tabIndex="-1"
        type="button"
        onClick={onDelete}
        disabled={cannotDelete}
    >
        {children}
    </button>
);