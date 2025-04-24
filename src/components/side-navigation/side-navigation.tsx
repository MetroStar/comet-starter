import React from 'react';

type SideNavigationProps = {
  ariaLabel: string;
  id: string;
  items: { label: string; onClick: () => void }[];
};

export const SideNavigation: React.FC<SideNavigationProps> = ({
  ariaLabel,
  id,
  items,
}) => {
  return (
    <nav
      className="usa-sidenav"
      aria-label={ariaLabel}
      id={id}
      style={{
        width: '250px',
        backgroundColor: '#f8f9fa',
        position: 'fixed',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <ul className="usa-sidenav__list" style={{ padding: '10px' }}>
        <li
          className="usa-sidenav__item"
          style={{ fontWeight: 'bold', marginBottom: '10px' }}
        >
          Navigation
        </li>
        {items.map((item, index) => (
          <li
            className="usa-sidenav__item"
            key={index}
            onClick={item.onClick}
            style={{ cursor: 'pointer', padding: '5px 0' }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;
