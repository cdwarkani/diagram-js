import { assign } from 'min-dash';


var DEFAULT_CONFIG = {
  moveSpeed: 50,
  invertY: false
};


/**
 *
 * @param {Object} config
 * @param {Number} [config.keyboardMoveSpeed=50]
 * @param {Boolean} [config.keyboardInvertY=false]
 * @param {Keyboard} keyboard
 * @param {EditorActions} editorActions
 */
export default function KeyboardNavigation(
    config,
    keyboard,
    editorActions
) {

  var self = this;

  this._config = assign({}, DEFAULT_CONFIG, config || {});

  keyboard.addListener(arrowsListener);


  function arrowsListener(context) {

    var event = context.event;

    if (keyboard.isKey([
      'ArrowLeft', 'Left',
      'ArrowUp', 'Up',
      'ArrowDown', 'Down',
      'ArrowRight', 'Right'
    ], event)) {

      var opts = {
        invertY: self._config.invertY,
        speed: self._config.moveSpeed
      };

      switch (event.key) {
      case 'ArrowLeft':
      case 'Left':
        opts.direction = 'left';
        break;
      case 'ArrowUp':
      case 'Up':
        opts.direction = 'up';
        break;
      case 'ArrowRight':
      case 'Right':
        opts.direction = 'right';
        break;
      case 'ArrowDown':
      case 'Down':
        opts.direction = 'down';
        break;
      }

      editorActions.trigger('moveCanvas', opts);

      return true;
    }
  }
}


KeyboardNavigation.$inject = [
  'config.keyboardNavigation',
  'keyboard',
  'editorActions'
];
