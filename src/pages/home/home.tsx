import { Alert, Modal } from '@metrostar/comet-uswds';
import { getDisplayName } from '@src/utils/auth';
import modal from '@uswds/uswds/js/usa-modal';
import React, { useEffect } from 'react';
import useAuth from '../../hooks/use-auth';

export const Home = (): React.ReactElement => {
  const { isSignedIn, currentUserData } = useAuth();

  const handleContinue = (): void => {
    console.log('Continue clicked...');
    // Do something

    /* eslint-disable-next-line */
    modal.toggleModal.call(modal, false); // Manually toggle modal after work complete
  };

  // Have to add event listeners after components load due to the way the modal works
  useEffect(() => {
    const button = document.querySelector('#continueBtn') as HTMLButtonElement;
    if (button) {
      button.onclick = handleContinue;
    }
  }, []);

  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
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
              <a
                href={`#modal-1`}
                className="usa-button"
                aria-controls="modal-1"
                data-open-modal
              >
                Sign In
              </a>
              <Modal
                id="modal-1"
                heading="Sign In Required"
                footer={
                  <button type="button" className="usa-button" id="continueBtn">
                    Continue
                  </button>
                }
              >
                Click Continue to sign in.
              </Modal>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};
