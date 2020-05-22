import React from "react";

// Higher order function, filters the items
/* const isSearched = searchTerm => item =>
   item.title.toLowerCase().includes(searchTerm.toLowerCase()); 
*/
// usage: items.filter(isSearched(searchPattern)).map(item => ())

const Result = ({ items, searchPattern }) => (
  <div>
    {items.map(item => (
      <div key={item.objectID}>{item.title}</div>
    ))}
  </div>
);

export default Result;
