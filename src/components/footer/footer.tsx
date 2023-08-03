import { APP_TITLE } from '@src/utils/constants';
import facebookIcon from '@uswds/uswds/img/usa-icons/facebook.svg';
import instagramIcon from '@uswds/uswds/img/usa-icons/instagram.svg';
import rssIcon from '@uswds/uswds/img/usa-icons/rss_feed.svg';
import twitterIcon from '@uswds/uswds/img/usa-icons/twitter.svg';
import youtubeIcon from '@uswds/uswds/img/usa-icons/youtube.svg';
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
            <li
              className="
                mobile-lg:grid-col-4
                desktop:grid-col-auto
                usa-footer__primary-content
              "
            >
              <a className="usa-footer__primary-link" href="/#">
                &lt;Primary link&gt;
              </a>
            </li>

            <li
              className="
                mobile-lg:grid-col-4
                desktop:grid-col-auto
                usa-footer__primary-content
              "
            >
              <a className="usa-footer__primary-link" href="/#">
                &lt;Primary link&gt;
              </a>
            </li>

            <li
              className="
                mobile-lg:grid-col-4
                desktop:grid-col-auto
                usa-footer__primary-content
              "
            >
              <a className="usa-footer__primary-link" href="/#">
                &lt;Primary link&gt;
              </a>
            </li>

            <li
              className="
                mobile-lg:grid-col-4
                desktop:grid-col-auto
                usa-footer__primary-content
              "
            >
              <a className="usa-footer__primary-link" href="/#">
                &lt;Primary link&gt;
              </a>
            </li>

            <li
              className="
                mobile-lg:grid-col-4
                desktop:grid-col-auto
                usa-footer__primary-content
              "
            >
              <a className="usa-footer__primary-link" href="/#">
                &lt;Primary link&gt;
              </a>
            </li>
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
                <div className="grid-col-auto">
                  <a className="usa-social-link" href="/#">
                    <img
                      className="usa-social-link__icon"
                      src={facebookIcon}
                      alt="Facebook"
                    />
                  </a>
                </div>

                <div className="grid-col-auto">
                  <a className="usa-social-link" href="/#">
                    <img
                      className="usa-social-link__icon"
                      src={twitterIcon}
                      alt="Twitter"
                    />
                  </a>
                </div>

                <div className="grid-col-auto">
                  <a className="usa-social-link" href="/#">
                    <img
                      className="usa-social-link__icon"
                      src={youtubeIcon}
                      alt="YouTube"
                    />
                  </a>
                </div>

                <div className="grid-col-auto">
                  <a className="usa-social-link" href="/#">
                    <img
                      className="usa-social-link__icon"
                      src={instagramIcon}
                      alt="Instagram"
                    />
                  </a>
                </div>

                <div className="grid-col-auto">
                  <a className="usa-social-link" href="/#">
                    <img
                      className="usa-social-link__icon"
                      src={rssIcon}
                      alt="RSS"
                    />
                  </a>
                </div>
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
