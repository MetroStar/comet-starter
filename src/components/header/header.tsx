import { Banner, Icon, Search, useHeader } from '@metrostar/comet-uswds';
//import { CaseSearchFilters } from '@src/types/case';
import { SearchFormElements } from '@src/types/form';
import {
  APP_TITLE,
  HEADER_LINKS_SIGNED_IN,
  HEADER_LINKS_SIGNED_OUT,
} from '@src/utils/constants';
import { lowercaseHyphenateString } from '@src/utils/helpers';
import React, { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
//import { AdvancedSearchPanel } from '../../pages/search-results/advanced-search-panel';

export const Header = (): React.ReactElement => {
  const { on, off } = useHeader();
  const [showMenu, setShowMenu] = useState(false);
  // const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  // const [advancedFilters, setAdvancedFilters] = useState<CaseSearchFilters>({});

  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, signOut } = useAuth();

  const handleMenuClick = (): void => {
    window.scrollTo({ top: 0 });
    setShowMenu(!showMenu);
  };

  // const handleAdvancedSearchOpen = (): void => {
  //   setShowAdvancedSearch(true);
  // };

  // const handleAdvancedSearchClose = (): void => {
  //   setShowAdvancedSearch(false);
  // };

  // const handleAdvancedSearch = (filters: CaseSearchFilters): void => {
  //   // Build query string from filters
  //   const params = new URLSearchParams();
  //   if (filters.id) params.append('caseId', filters.id);
  //   if (filters.last_name) params.append('lastName', filters.last_name);
  //   if (filters.first_name) params.append('firstName', filters.first_name);
  //   if (filters.status) params.append('status', filters.status);
  //   if (filters.assigned_to) params.append('assignedTo', filters.assigned_to);
  //   if (filters.created_before)
  //     params.append('createdBefore', filters.created_before);
  //   if (filters.created_after)
  //     params.append('createdAfter', filters.created_after);

  //   setAdvancedFilters(filters);
  //   navigate(`/results?${params.toString()}`);
  //   setShowAdvancedSearch(false);
  // };

  // const handleAdvancedClear = (): void => {
  //   setAdvancedFilters({});
  // };

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
            {/* <section
              aria-label="Search component"
              className="usa-search-section"
            >
              <div className="grid-container">
                <div className="grid-row flex-justify-center">
                  <div className="display-flex flex-align-center">
                    <button
                      id="filter-btn"
                      type="button"
                      className="usa-button usa-button--unstyled margin-right-1"
                      aria-label="Show advanced search filters"
                      onClick={handleAdvancedSearchOpen}
                    >
                      <Icon id="filter-icon" type="filter_alt" />
                    </button>
                    <Search
                      id="search"
                      type="small"
                      placeholder="Search our Site"
                      onSearch={handleSearch}
                    />
                  </div>
                </div>
                {showAdvancedSearch && (
                  <div
                    className="advanced-search-panel-overlay"
                    role="dialog"
                    aria-modal="true"
                  >
                    <AdvancedSearchPanel
                      initialFilters={advancedFilters}
                      onSearch={handleAdvancedSearch}
                      onClear={handleAdvancedClear}
                      onClose={handleAdvancedSearchClose}
                    />
                  </div>
                )}
              </div>
            </section> */}
          </nav>
        </div>
      </header>
    </>
  );
};
