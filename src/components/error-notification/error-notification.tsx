import { Alert } from '@metrostar/comet-uswds';
import React from 'react';

interface ErrorNotificationProps {
  error: string;
}

export const ErrorNotification = (
  props: ErrorNotificationProps,
): React.ReactElement => {
  return (
    <Alert id="error-alert" type="error">
      An error has occurred: {props.error}
    </Alert>
  );
};

export default ErrorNotification;
