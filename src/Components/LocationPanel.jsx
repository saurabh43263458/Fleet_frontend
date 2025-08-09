import React from 'react'

const LocationPanel = ({ suggestions = [], onSuggestionClick }) => {
  return (
    <div className=''>
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, idx) =>
          suggestion && suggestion.description ? (
            <div
              key={idx}
              onClick={() => onSuggestionClick(suggestion.description)}
              className='flex items-center justify-start py-2 px-4 my-2 rounded-xl cursor-pointer border border-gray-200 hover:border-black transition'
            >
              <div className="bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full">
                <i className="ri-map-pin-line text-lg"></i>
              </div>
              <div className='ml-4'>
                <h5 className='font-semibold text-lg'>{suggestion.description}</h5>
              </div>
            </div>
          ) : null
        )
      ) : (
        <p className="text-center text-gray-400">No suggestions found</p>
      )}
    </div>
  )
}

export default LocationPanel
