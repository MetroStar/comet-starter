import facebookIcon from '~uswds/dist/img/usa-icons/facebook.svg';
import instagramIcon from '~uswds/dist/img/usa-icons/instagram.svg';
import rssIcon from '~uswds/dist/img/usa-icons/rss_feed.svg';
import twitterIcon from '~uswds/dist/img/usa-icons/twitter.svg';
import youtubeIcon from '~uswds/dist/img/usa-icons/youtube.svg';

export const APP_TITLE = 'Advana Market Place';
export const REQUIRED_FIELD_MESSAGE = 'This field is required.';
export const MIN_PASSWORD_LENGTH = 8;
export const PASSWORD_LENGTH_MESSAGE = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;

export const REQUIRED_FORM_FIELDS_RULES = {
  required: REQUIRED_FIELD_MESSAGE,
};

export const PASSWORD_RULES = {
  ...REQUIRED_FORM_FIELDS_RULES,
  minLength: { value: MIN_PASSWORD_LENGTH, message: PASSWORD_LENGTH_MESSAGE },
};

export const HEADER_LINKS_SIGNED_IN = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
  },
];

export const HEADER_LINKS_SIGNED_OUT = [
  {
    name: 'Home',
    url: '/',
  },
];

export const FOOTER_LINKS = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Contact Us',
    url: '/contact',
  },
  {
    name: 'About',
    url: '/about',
  },
];

export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    icon: facebookIcon,
    url: '/#',
  },
  {
    name: 'Twitter',
    icon: twitterIcon,
    url: '/#',
  },
  {
    name: 'YouTube',
    icon: youtubeIcon,
    url: '/#',
  },
  {
    name: 'Instagram',
    icon: instagramIcon,
    url: '/#',
  },
  {
    name: 'RSS Feed',
    icon: rssIcon,
    url: '/#',
  },
];
