import { Banner, Icon, Search, useHeader } from '@metrostar/comet-uswds';
import {
  APP_TITLE,
  HEADER_LINKS_SIGNED_IN,
  HEADER_LINKS_SIGNED_OUT,
} from '@src/utils/constants';
import { lowercaseHyphenateString } from '@src/utils/helpers';
import React, { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';

type SearchFormElements = {
  search: { value: string };
};

export const Header = (): React.ReactElement => {
  const { on, off } = useHeader();
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, signOut } = useAuth();

  const handleMenuClick = (): void => {
    window.scrollTo({ top: 0 });
    setShowMenu(!showMenu);
  };

  // Ensure navigation JS is loaded
  useEffect(() => {
    const bodyElement = document.body;
    on(bodyElement);

    // Ensure cleanup after the effect
    return () => {
      off(bodyElement);
    };
  });

  useEffect(() => {
    const ref = document.body.style;
    ref.overflow = showMenu ? 'hidden' : 'visible';
  }, [showMenu]);

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const handleAuth = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (isSignedIn) {
      signOut();
      navigate('/');
    } else {
      navigate('/signin');
    }
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      elements: SearchFormElements;
    };
    navigate(`/results?q=${form.elements.search.value}`);
    form.reset();
  };

  return (
    <>
      <a className="usa-skipnav " href="#mainSection">
        Skip to main content
      </a>
      <Banner id="banner" />
      <div className="usa-overlay"></div>
      <header className="usa-header usa-header--basic">
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <div className="usa-logo" id="logo">
              <em className="usa-logo__text">
                <NavLink id="logo-link" to="/">
                  {APP_TITLE}
                </NavLink>
              </em>
            </div>
            <button
              type="button"
              className="usa-menu-btn"
              onClick={handleMenuClick}
            >
              Menu
            </button>
          </div>
          <nav className="usa-nav">
            <button type="button" className="usa-nav__close">
              <Icon id="menu-icon" type="close" />
            </button>
            <ul className="usa-nav__primary usa-accordion">
              {/* This will conditionally render our header links based on isSignedIn */}
              {isSignedIn
                ? HEADER_LINKS_SIGNED_IN.map((headerLink) => (
                    <li key={headerLink.url} className="usa-nav__primary-item">
                      <NavLink
                        id={`${lowercaseHyphenateString(headerLink.name)}-link`}
                        to={headerLink.url}
                        className={`usa-nav__link ${
                          location.pathname === headerLink.url
                            ? 'usa-current'
                            : ''
                        }`}
                      >
                        {headerLink.name}
                      </NavLink>
                    </li>
                  ))
                : HEADER_LINKS_SIGNED_OUT.map((headerLink) => (
                    <li key={headerLink.url} className="usa-nav__primary-item">
                      <NavLink
                        id={`${lowercaseHyphenateString(headerLink.name)}-link`}
                        to={headerLink.url}
                        className={`usa-nav__link ${
                          location.pathname === headerLink.url
                            ? 'usa-current'
                            : ''
                        }`}
                      >
                        {headerLink.name}
                      </NavLink>
                    </li>
                  ))}
              <li className="usa-nav__primary-item">
                <Link
                  id="auth-link"
                  to="/signin"
                  className={`usa-nav__link ${
                    location.pathname === '/signin' ? 'usa-current' : ''
                  }`}
                  onClick={handleAuth}
                >
                  {isSignedIn ? 'Sign Out' : 'Sign In'}
                </Link>
              </li>
            </ul>
            <section aria-label="Search component">
              <Search
                id="search"
                type="small"
                placeholder="Search our Site"
                onSearch={handleSearch}
              />
            </section>
          </nav>
        </div>
      </header>
    </>
  );
};
