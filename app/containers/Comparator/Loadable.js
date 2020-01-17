/**
 *
 * Asynchronously loads the component for Comparator
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
