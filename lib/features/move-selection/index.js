import KeyboardModule from '../keyboard';
import SelectionModule from '../selection';

import MoveSelection from './MoveSelection';

export default {
  __depends__: [
    KeyboardModule,
    SelectionModule
  ],
  __init__: [ 'keyboard', 'moveSelection' ],
  moveSelection: [ 'type', MoveSelection ]
};
