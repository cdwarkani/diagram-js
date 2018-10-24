import EditorActions from 'lib/features/editor-actions';
import KeyboardModule from 'lib/features/keyboard';

import KeyboardNavigation from './KeyboardNavigation';


export default {
  __depends__: [
    EditorActions,
    KeyboardModule
  ],
  __init__: [ 'keyboardNavigation' ],
  keyboardNavigation: [ 'type', KeyboardNavigation ]
};