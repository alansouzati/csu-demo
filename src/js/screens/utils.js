import { announcePageLoaded } from 'grommet/utils/Announcer';

const DEFAULT_TITLE = 'CSU';

export function pageLoaded(title) {
  if (document) {
    if (title && typeof title === 'string') {
      title = `${title} | ${DEFAULT_TITLE}`;
    } else {
      title = DEFAULT_TITLE;
    }
    announcePageLoaded(title);
    document.title = title;
  }
}

export function getTypeDisplayName(type) {
  if (type === 'closed') {
    return 'Closed';
  } else if (type === 'heliport') {
    return 'Heliport';
  } else if (type === 'small_airport') {
    return 'Small Airport';
  } else if (type === 'medium_airport') {
    return 'Medium Airport';
  } else if (type === 'large_airport') {
    return 'Large Airport';
  }
  return type;
}

export default { pageLoaded };
