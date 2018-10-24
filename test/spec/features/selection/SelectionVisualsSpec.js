import {
  bootstrapDiagram,
  inject
} from 'test/TestHelper';

import selectionModule from 'lib/features/selection';

import {
  matches
} from 'min-dom';


describe('features/selection/SelectionVisuals', function() {

  beforeEach(bootstrapDiagram({ modules: [ selectionModule ] }));

  describe('bootstrap', function() {

    beforeEach(bootstrapDiagram({ modules: [ selectionModule ] }));

    it('should bootstrap diagram with component', inject(function() {

    }));

  });


  describe('selection box', function() {

    var shape, shape2, connection, label;

    beforeEach(inject(function(elementFactory, canvas) {

      shape = elementFactory.createShape({
        id: 'child',
        x: 100, y: 100, width: 100, height: 100
      });

      canvas.addShape(shape);

      shape2 = elementFactory.createShape({
        id: 'child2',
        x: 300, y: 100, width: 100, height: 100
      });

      canvas.addShape(shape2);

      connection = elementFactory.createConnection({
        id: 'connection',
        waypoints: [ { x: 150, y: 150 }, { x: 150, y: 200 }, { x: 350, y: 150 } ],
        source: shape,
        target: shape2
      });

      canvas.addConnection(connection);

      label = elementFactory.createLabel({
        id: 'label',
        x: 250, y: 200, width: 20, height: 20,
        labelTarget: connection
      });

      canvas.addShape(label);
    }));


    it('should show box on select', inject(function(selection, canvas) {

      // when
      selection.select(connection);

      // then
      var gfx = canvas.getGraphics(connection),
          hasOutline = matches(gfx, '.selected');

      expect(hasOutline).to.be.true;
    }));


    it('should show box on connection-labels on select',
      inject(function(selection, canvas) {

        // when
        selection.select(connection);

        // then
        var gfx = canvas.getGraphics(label),
            hasOutline = matches(gfx, '.selected');

        expect(hasOutline).to.be.true;
      }));


    it('should show box on connection on selecting label',
      inject(function(selection, canvas) {

        // when
        selection.select(label);

        // then
        var gfx = canvas.getGraphics(connection),
            hasOutline = matches(gfx, '.selected');

        expect(hasOutline).to.be.true;
      }));

  });

});
