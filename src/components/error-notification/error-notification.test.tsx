import { render } from '@testing-library/react';

import { ErrorNotification } from './error-notification';

describe('ErrorNotification', () => {
  test('should render successfully', () => {
    const { baseElement } = render(<ErrorNotification error="error" />);

    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('.usa-alert')).toBeDefined();
    expect(baseElement.querySelector('.usa-alert--error')).toBeDefined();
  });
});
