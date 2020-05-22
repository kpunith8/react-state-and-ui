import React from "react";

const withLoading = Component => ({ isLoading, ...otherProps }) => {
  return isLoading ? <p>Loading...</p> : <Component {...otherProps} />;
};

export default withLoading;
