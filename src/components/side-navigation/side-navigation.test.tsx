import { render, screen } from '@testing-library/react';
import SideNavigation from './side-navigation';

describe('SideNavigation', () => {
  it('renders the side navigation with items', () => {
    render(
      <SideNavigation
        ariaLabel="Secondary navigation"
        id="side-navigation-1"
        items={[
          {
            anchor: (
              <a className="usa-current" href="/">
                Navigation Link
              </a>
            ),
          },
          {
            anchor: (
              <a className="" href="/">
                Navigation Link
              </a>
            ),
          },
          {
            anchor: (
              <a className="" href="/">
                Navigation Link
              </a>
            ),
          },
          {
            anchor: (
              <a className="" href="/">
                Navigation Link
              </a>
            ),
          },
          {
            anchor: (
              <a className="" href="/">
                Navigation Link
              </a>
            ),
          },
        ]}
      />,
    );

    const nav = screen.getByLabelText('Secondary navigation');
    expect(nav).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });

  it('applies z-index to side-navigation', () => {
    render(
      <SideNavigation
        ariaLabel="Secondary navigation"
        id="side-navigation-1"
        items={[
          {
            anchor: (
              <a className="usa-current" href="/">
                Navigation Link
              </a>
            ),
          },
        ]}
      />,
    );

    const sideNav = screen.getByLabelText('Secondary navigation');
    expect(sideNav).toHaveStyle('z-index: 2000');
  });
});
