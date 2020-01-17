/**
 *
 * Asynchronously loads the component for PlayerCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
