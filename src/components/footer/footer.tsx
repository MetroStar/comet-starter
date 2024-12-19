import { APP_TITLE, FOOTER_LINKS, SOCIAL_LINKS } from '@src/utils/constants';
import React from 'react';
import logo from '/img/logo.png';

export const Footer = (): React.ReactElement => {
  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <footer className="usa-footer">
      <div className="grid-container usa-footer__return-to-top">
        <a
          href="/#"
          onClick={(event) => {
            scrollToTop(event);
          }}
        >
          Return to top
        </a>
      </div>
      <div className="usa-footer__primary-section">
        <nav className="usa-footer__nav" aria-label="Footer navigation">
          <ul className="grid-row grid-gap">
            {FOOTER_LINKS.map((footerLink) => (
              <li
                key={footerLink.url}
                className="
                mobile-lg:grid-col-4
                desktop:grid-col-auto
                usa-footer__primary-content
              "
              >
                <a className="usa-footer__primary-link" href={footerLink.url}>
                  {footerLink.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="usa-footer__secondary-section">
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div
              className="
                usa-footer__logo
                grid-row
                mobile-lg:grid-col-6 mobile-lg:grid-gap-2
              "
            >
              <div className="mobile-lg:grid-col-auto">
                <img
                  className="usa-footer__logo-img"
                  src={logo}
                  alt="US Flag"
                />
              </div>
              <div className="mobile-lg:grid-col-auto">
                <p className="usa-footer__logo-heading">{APP_TITLE}</p>
              </div>
            </div>
            <div className="usa-footer__contact-links mobile-lg:grid-col-6">
              <div className="usa-footer__social-links grid-row grid-gap-1">
                {SOCIAL_LINKS.map((socialLink) => (
                  <div key={socialLink.name} className="grid-col-auto">
                    <a
                      className="usa-social-link"
                      href={socialLink.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="usa-social-link__icon"
                        src={`${socialLink.icon}`}
                        alt={`${socialLink.name} icon'`}
                      />
                    </a>
                  </div>
                ))}
              </div>
              <h2 className="usa-footer__contact-heading">
                &lt;Agency Contact Center&gt;
              </h2>
              <address className="usa-footer__address">
                <div className="usa-footer__contact-info grid-row grid-gap">
                  <div className="grid-col-auto">
                    <a href="tel:1-800-555-5555"> &lt;(800) 555-GOVT&gt; </a>
                  </div>
                  <div className="grid-col-auto">
                    <a href="mailto:&lt;info@agency.gov&gt;">
                      &lt;info@agency.gov&gt;
                    </a>
                  </div>
                </div>
              </address>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
