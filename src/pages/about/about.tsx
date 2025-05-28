import React from 'react';

export const About = (): React.ReactElement => {
  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1>About</h1>
          <p>
            The goal of this project is to provide a React with TypeScript
            starter application, which comes pre-configured with the USWDS-based
            Comet Component Library as well as other tools to accelerate
            development.
          </p>
          <p>
            For more information about the Comet Component Library, please visit
            the Comet repo{' '}
            <a
              href="https://github.com/MetroStar/comet"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
