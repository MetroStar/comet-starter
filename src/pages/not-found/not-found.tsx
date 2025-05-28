import React from 'react';

export const NotFound = (): React.ReactElement => {
  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1>Page Not Found</h1>
          <p>
            The page you are looking for does not exist. It may have been moved
            or deleted.
          </p>
        </div>
      </div>
    </div>
  );
};
