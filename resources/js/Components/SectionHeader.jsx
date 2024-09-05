import React from 'react';

const SectionHeader = ({ text, additionalClasses = '' }) => {
return (
    <h2 className={`text-sm sm:text-lg font-bold text-gray-800 mb-4 ${additionalClasses}`}>
    {text}
    </h2>
);
};

export default SectionHeader;
