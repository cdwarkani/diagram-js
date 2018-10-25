import {
  assign
} from 'min-dash';


var DEFAULT_CONFIG = {
  keyboardMoveSpeed: 1,
  keyboardMoveSpeedModified: 10
};

var DEFAULT_PRIORITY = 1500;

var KEYS = {
  LEFT: ['ArrowLeft', 'Left'],
  UP: ['ArrowUp', 'Up'],
  RIGHT: ['ArrowRight', 'Right'],
  DOWN: ['ArrowDown', 'Down']
};

var GET_DELTA_FUNCTIONS = {
  LEFT: moveLeft,
  UP: moveUp,
  RIGHT: moveRight,
  DOWN: moveDown
};

/**
 * Enables to move selection with keyboard arrows.
 * Use with Shift for modified speed (default=1, with Shift=10).
 * Pressed Cmd/Ctrl turns the feature off.
 *
 * @param {Object} config
 * @param {Number} [config.keyboardMoveSpeed=1]
 * @param {Number} [config.keyboardMoveSpeedModified=10]
 * @param {Keyboard} keyboard
 * @param {Modeling} modeling
 * @param {Selection} selection
 */
export default function MoveSelection(config, keyboard, modeling, selection) {

  var self = this;

  this._config = assign({}, DEFAULT_CONFIG, config || {});

  keyboard.addListener(DEFAULT_PRIORITY, moveSelectionFactory(KEYS.LEFT, GET_DELTA_FUNCTIONS.LEFT));
  keyboard.addListener(DEFAULT_PRIORITY, moveSelectionFactory(KEYS.UP, GET_DELTA_FUNCTIONS.UP));
  keyboard.addListener(DEFAULT_PRIORITY, moveSelectionFactory(KEYS.RIGHT, GET_DELTA_FUNCTIONS.RIGHT));
  keyboard.addListener(DEFAULT_PRIORITY, moveSelectionFactory(KEYS.DOWN, GET_DELTA_FUNCTIONS.DOWN));

  /**
   * Returns `KeyboardEvent` listener which moves selection according to provided getDelta function.
   *
   * @param {string} keys - array of keys to listen for
   * @param {Function} getDelta - function which returns coordinates delta for provided speed
   */
  function moveSelectionFactory(keys, getDelta) {

    return function(context) {

      var event = context.event;

      if (!keyboard.isKey(keys, event)) {
        return;
      }

      if (keyboard.isCmd(event)) {
        return;
      }

      var selectedElements = selection.get();

      if (!selectedElements.length) {
        return;
      }

      var speed = getSpeed(event, self._config);

      var coordinatesDelta = getDelta(speed);

      modeling.moveElements(selectedElements, coordinatesDelta);

      return true;
    };
  }

  function getSpeed(event) {
    if (keyboard.isShift(event)) {
      return self._config.keyboardMoveSpeedModified;
    }

    return self._config.keyboardMoveSpeed;
  }
}

MoveSelection.$inject = [
  'config.moveSelection',
  'keyboard',
  'modeling',
  'selection'
];



// helpers /////////

function moveLeft(speed) {
  return {
    x: -speed,
    y: 0
  };
}

function moveUp(speed) {
  return {
    x: 0,
    y: -speed
  };
}

function moveRight(speed) {
  return {
    x: speed,
    y: 0
  };
}

function moveDown(speed) {
  return {
    x: 0,
    y: +speed
  };
}
