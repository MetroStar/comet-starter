import { Alert } from "@metrostar/comet-uswds";
import { ReactElement } from "react";

interface ErrorNotificationProps {
  error: string;
}

export const ErrorNotification = (
  props: ErrorNotificationProps,
): ReactElement => {
  return (
    <Alert id="error-alert" type="error">
      An error has occurred: {props.error}
    </Alert>
  );
};

export default ErrorNotification;
