import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
} from '@metrostar/comet-uswds';
import { getDisplayName } from '@src/utils/auth';
import React from 'react';
import useAuth from '../../hooks/use-auth';

export const Home = (): React.ReactElement => {
  const { isSignedIn, currentUserData } = useAuth();

  return (
    <div className="container">
      <div className="grid-row">
        <div className="card-grid">
          <h1>
            Welcome{' '}
            {currentUserData ? getDisplayName(currentUserData) : 'Guest'}
          </h1>
        </div>
      </div>
      {!isSignedIn && (
        <div className="grid-row">
          <div className="grid-col">
            <Alert id="sign-in-alert" type="info">
              You are not currently signed in. Please Sign In to access the
              Dashboard.
            </Alert>
          </div>
        </div>
      )}
      {/* <div className="grid-row">
        {[...Array(4)].map((_, rowIndex) => (
          <div className="grid-col" key={rowIndex}>
            {[...Array(4)].map((_, colIndex) => (
              <Card
                className="maxw-mobile"
                id={`card-${rowIndex}-${colIndex}`}
                layout="default"
                key={`card-${rowIndex}-${colIndex}`}
              >
                <CardMedia>
                  <img
                    alt="a placeholder image"
                    src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
                  />
                </CardMedia>
                <CardHeader>
                  Card with Media {rowIndex * 3 + colIndex + 1}
                </CardHeader>
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis earum tenetur quo cupiditate, eaque qui officia
                  recusandae.
                </CardBody>
                <CardFooter>
                  <Button
                    id={`card-button-${rowIndex}-${colIndex}`}
                    style={{ color: 'white' }}
                  >
                    Button
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ))}
      </div> */}
      <div className="card-grid">
        {[...Array(16)].map((_, index) => (
          <Card
            className="maxw-mobile"
            id={`card-${index}`}
            layout="default"
            key={`card-${index}`}
          >
            <CardMedia>
              <img
                alt="a placeholder image"
                src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
              />
            </CardMedia>
            <CardHeader>Card with Media {index + 1}</CardHeader>
            <CardBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              earum tenetur quo cupiditate, eaque qui officia recusandae.
            </CardBody>
            <CardFooter>
              <Button id={`card-button-${index}`} style={{ color: 'white' }}>
                Button
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
