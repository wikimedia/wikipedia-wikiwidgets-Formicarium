/**
 * Formicarium is a simple widget meant to be embedded in Wikipedia articles about Langton's ant
 * to aid the understanding of the topic
 *
 * Written by Luis Felipe Schenone in 2015
 *
 * Formicarium is available under the GNU General Public License (http://www.gnu.org/licenses/gpl.html)
 */
var Formicarium = {

	messages: {
		'es': {
			'ant-button': 'Hormiga',
			'ant-button-tooltip': 'Agregar o quitar hormigas',
			'cell-button': 'Celda',
			'cell-button-tooltip': 'Agregar o quitar celdas',
			'move-button': 'Mover',
			'move-button-tooltip': 'Mover el tablero',
			'zoom-in-button': 'Acercar',
			'zoom-in-button-tooltip': 'Acercar',
			'zoom-out-button': 'Alejar',
			'zoom-out-button-tooltip': 'Alejar',
			'grid-button': 'Grilla',
			'grid-button-tooltip': 'Grilla',
			'reset-button': 'Reiniciar',
			'reset-button-tooltip': 'Reiniciar',
			'previous-button': 'Anterior',
			'previous-button-tooltip': 'Generación anterior',
			'play-button': 'Reproducir',
			'play-button-tooltip': 'Reproducir',
			'pause-button': 'Pausar',
			'pause-button-tooltip': 'Pausar',
			'next-button': 'Siguiente',
			'next-button-tooltip': 'Generación siguiente',
		},
		'en': {
			'ant-button': 'Ant',
			'ant-button-tooltip': 'Add or remove ants',
			'cell-button': 'Cell',
			'cell-button-tooltip': 'Add or remove cells',
			'move-button': 'Move',
			'move-button-tooltip': 'Move the board',
			'zoom-in-button': 'Zoom in',
			'zoom-in-button-tooltip': 'Zoom in',
			'zoom-out-button': 'Zoom out',
			'zoom-out-button-tooltip': 'Zoom out',
			'grid-button': 'Grid',
			'grid-button-tooltip': 'Grid',
			'reset-button': 'Reset',
			'reset-button-tooltip': 'Reset',
			'previous-button': 'Previous',
			'previous-button-tooltip': 'Previous generation',
			'play-button': 'Play',
			'play-button-tooltip': 'Play',
			'pause-button': 'Pause',
			'pause-button-tooltip': 'Pause',
			'next-button': 'Next',
			'next-button-tooltip': 'Next generation',
		},
	}, 

	/**
	 * Initialisation script
	 */
	init: function () {
		// Set the interface messages
		mw.messages.set( Formicarium.messages[ mw.config.get( 'wgUserLanguage' ) ] );

		// Build the GUI and bind the events
		Formicarium.gui.init();

		// Set the default action 
		Formicarium.gui.clickAntButton();

		// Add a single ant in the center
		Formicarium.board.addAnt();
		Formicarium.board.fill();
	},

	/**
	 * Graphical User Interface
	 */
	gui: {
		init: function () {
			var container = $( '.WikiWidget[data-wikiwidget="Formicarium"]' ),
				canvas = $( '<canvas>' ).attr( 'class', 'FormicariumCanvas' ),
				menu = $( '<div>' ).attr( 'class', 'FormicariumMenu' );

			var antButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumAntButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/a/a9/WikiWidgetAntButton.png',
				'title': mw.message( 'ant-button-tooltip' ),
				'alt': mw.message( 'ant-button' ),
			});
			var cellButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumCellButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/f/ff/WikiWidgetCellButton.png',
				'title': mw.message( 'cell-button-tooltip' ),
				'alt': mw.message( 'cell-button' )
			});
			var moveButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumMoveButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/1/15/WikiWidgetMoveButton.png',
				'title': mw.message( 'move-button-tooltip' ),
				'alt': mw.message( 'move-button' )
			});
			var zoomInButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumZoomInButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/2/2e/WikiWidgetZoomInButton.png',
				'title': mw.message( 'zoom-in-button-tooltip' ),
				'alt': mw.message( 'zoom-in-button' )
			});
			var zoomOutButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumZoomOutButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/6/63/WikiWidgetZoomOutButton.png',
				'title': mw.message( 'zoom-out-button-tooltip' ),
				'alt': mw.message( 'zoom-out-button' )
			});
			var gridButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumGridButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/a/a9/WikiWidgetGridButton.png',
				'title': mw.message( 'grid-button-tooltip' ),
				'alt': mw.message( 'grid-button' )
			});
			var resetButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumResetButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/0/0e/WikiWidgetResetButton.png',
				'title': mw.message( 'reset-button-tooltip' ),
				'alt': mw.message( 'reset-button' )
			});
			var previousButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumPreviousButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/c/c3/WikiWidgetPreviousFrameButton.png',
				'title': mw.message( 'previous-button-tooltip' ),
				'alt': mw.message( 'previous-button' )
			});
			var playButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumPlayButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/b/b8/WikiWidgetPlayButton.png',
				'title': mw.message( 'play-button-tooltip' ),
				'alt': mw.message( 'play-button' )
			});
			var pauseButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumPauseButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/6/6e/WikiWidgetPauseButton.png',
				'title': mw.message( 'pause-button-tooltip' ),
				'alt': mw.message( 'pause-button' )
			}).hide(); // The pause button starts hidden
			var nextButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumNextButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/b/bf/WikiWidgetNextFrameButton.png',
				'title': mw.message( 'next-button-tooltip' ),
				'alt': mw.message( 'next-button' )
			});
			var generationCounter = $( '<span>' ).addClass( 'FormicariumGenerationCounter' ).text( 0 );

			// Put it all together
			menu.append( antButton )
				.append( cellButton )
				.append( moveButton )
				.append( zoomInButton )
				.append( zoomOutButton )
				.append( gridButton )
				.append( resetButton )
				.append( previousButton )
				.append( playButton )
				.append( pauseButton )
				.append( nextButton )
				.append( generationCounter );
			container.html( canvas ).append( menu );

			// Set the variables that must wait for the DOM to be loaded
			Formicarium.board.setCanvas( canvas[0] );
			Formicarium.board.setWidth( 400 );
			Formicarium.board.setHeight( 300 );
			container.width( Formicarium.board.width );

			// Bind events
			canvas.mousedown( Formicarium.mouse.down ).mousemove( Formicarium.mouse.move ).mouseup( Formicarium.mouse.up );
			moveButton.click( Formicarium.gui.clickMoveButton );
			cellButton.click( Formicarium.gui.clickCellButton );
			antButton.click( Formicarium.gui.clickAntButton );
			resetButton.click( Formicarium.game.reset );
			previousButton.click( Formicarium.game.previous );
			playButton.click( Formicarium.game.play );
			pauseButton.click( Formicarium.game.pause );
			nextButton.click( Formicarium.game.next );
			zoomOutButton.click( Formicarium.board.zoomOut );
			zoomInButton.click( Formicarium.board.zoomIn );
			gridButton.click( Formicarium.board.toggleGrid );
		},

		clickMoveButton: function () {
			Formicarium.mouse.onDown = null;
			Formicarium.mouse.onDrag = Formicarium.moveBoard;
			Formicarium.mouse.onUp = null;
			$( '.FormicariumMoveButton' ).addClass( 'active' ).siblings().removeClass( 'active' );
		},

		clickCellButton: function () {
			Formicarium.mouse.onDown = null;
			Formicarium.mouse.onDrag = Formicarium.addRemoveCell;
			Formicarium.mouse.onUp = Formicarium.addRemoveCell;
			$( '.FormicariumCellButton' ).addClass( 'active' ).siblings().removeClass( 'active' );
		},

		clickAntButton: function () {
			Formicarium.mouse.onDown = null;
			Formicarium.mouse.onDrag = Formicarium.addRemoveAnt;
			Formicarium.mouse.onUp = Formicarium.addRemoveAnt;
			$( '.FormicariumAntButton' ).addClass( 'active' ).siblings().removeClass( 'active' );
		}
	},

	game: {

		generation: 0,

		playing: false,

		/* Setters */

		setGeneration: function ( value ) {
			Formicarium.game.generation = value;
			$( '.FormicariumGenerationCounter' ).text( value );
		},

		/* Actions */

		previous: function () {
			Formicarium.game.setGeneration( Formicarium.game.generation - 1 );
			Formicarium.board.oldCells = Formicarium.board.newCells.slice(); // Clone the array
			for ( var i in Formicarium.board.ants ) {
				Formicarium.board.ants[ i ].undoRoutine();
			}
			Formicarium.board.refill();
		},

		next: function () {
			Formicarium.game.setGeneration( Formicarium.game.generation + 1 );
			Formicarium.board.oldCells = Formicarium.board.newCells.slice(); // Clone the array
			for ( var i in Formicarium.board.ants ) {
				Formicarium.board.ants[ i ].doRoutine();
			}
			Formicarium.board.refill();
		},

		play: function () {
			if ( Formicarium.game.playing ) {
				return; // If the game is already playing
			}
			Formicarium.game.playing = setInterval( Formicarium.game.next, 1 ); // The interval id is stored in the playing property
			$( '.FormicariumPlayButton' ).hide();
			$( '.FormicariumPauseButton' ).show();
		},

		pause: function () {
			if ( !Formicarium.game.playing ) {
				return; // If the game is already paused
			}
			clearInterval( Formicarium.game.playing );
			Formicarium.game.playing = false;
			$( '.FormicariumPlayButton' ).show();
			$( '.FormicariumPauseButton' ).hide();
		},

		reset: function () {
			// Reset the game
			Formicarium.game.setGeneration( 0 );

			// Reset the board
			Formicarium.board.centerX = 0;
			Formicarium.board.centerY = 0;
			Formicarium.board.ants = [];
			Formicarium.board.newCells = [];
			Formicarium.board.oldCells = [];
			Formicarium.board.refill();
		}
	},

	mouse: {
		/**
		 * The distance to the origin of the coordinate system (in cells, not pixels)
		 */
		newX: null,
		newY: null,
		oldX: null,
		oldY: null,

		state: 'up', // up, down or drag
		onUp: null,
		onDown: null,
		onDrag: null,

		/* Getters */

		getNewX: function ( event ) {
			var board = Formicarium.board,
				offsetX = event.pageX - $( event.target ).offset().left - 1, // The -1 is to correct a minor displacement
				newX = board.centerX - Math.floor( board.xCells / 2 ) + Math.floor( offsetX / board.cellSize );
			return newX;
		},

		getNewY: function ( event ) {
			var board = Formicarium.board,
				offsetY = event.pageY - $( event.target ).offset().top - 2, // The -2 is to correct a minor displacement
				newY = board.centerY - Math.floor( board.yCells / 2 ) + Math.floor( offsetY / board.cellSize );
			return newY;
		},

		/* Events */

		up: function ( event ) {
			Formicarium.mouse.state = 'up';
			if ( Formicarium.mouse.onUp ) {
				Formicarium.mouse.onUp( event );
			}
		},

		move: function ( event ) {
			Formicarium.mouse.oldX = Formicarium.mouse.newX;
			Formicarium.mouse.oldY = Formicarium.mouse.newY;
			Formicarium.mouse.newX = Formicarium.mouse.getNewX( event );
			Formicarium.mouse.newY = Formicarium.mouse.getNewY( event );

			// If the mouse is being dragged, not just moved
			var moved = ( Formicarium.mouse.newX - Formicarium.mouse.oldX ) || ( Formicarium.mouse.newY - Formicarium.mouse.oldY );
			if ( Formicarium.mouse.state === 'down' && moved && Formicarium.mouse.onDrag ) {
				Formicarium.mouse.onDrag( event );
			}
		},

		down: function ( event ) {
			Formicarium.mouse.state = 'down';
			if ( Formicarium.mouse.onDown ) {
				Formicarium.mouse.onDown( event );
			}
		}
	},

	moveBoard: function ( event ) {
		Formicarium.board.centerX += Formicarium.mouse.oldX - Formicarium.mouse.newX;
		Formicarium.board.centerY += Formicarium.mouse.oldY - Formicarium.mouse.newY;
		Formicarium.board.refill();

		// Bugfix: without the following, the board flickers when moving, not sure why
		Formicarium.mouse.newX = Formicarium.mouse.getNewX( event );
		Formicarium.mouse.newY = Formicarium.mouse.getNewY( event );
	},

	addRemoveCell: function ( event ) {
		var x = Formicarium.mouse.newX,
			y = Formicarium.mouse.newY,
			cell = Formicarium.board.getNewCell( x, y );
		if ( cell ) {
			Formicarium.board.removeNewCell( x, y );
		} else {
			Formicarium.board.addNewCell( x, y, 'white' );
		}
		Formicarium.board.refill();
	},

	addRemoveAnt: function ( event ) {
		var x = Formicarium.mouse.newX,
			y = Formicarium.mouse.newY,
			ant = Formicarium.board.getAnt( x, y );
		if ( ant ) {
			Formicarium.board.removeAnt( x, y );
		} else {
			Formicarium.board.addAnt( x, y );
		}
		Formicarium.board.refill();
	},

	board: {

		canvas: null,
		context: null,

		width: null,
		height: null,

		centerX: 0,
		centerY: 0,

		cellSize: 4,

		xCells: null,
		yCells: null,

		grid: false,

		ants: [],
		oldCells: [],
		newCells: [],

		/* Getters */

		getXcells: function () {
			return Math.floor( this.width / this.cellSize );
		},

		getYcells: function () {
			return Math.floor( this.height / this.cellSize );
		},

		getNewCell: function ( x, y ) {
			var i, cell;
			for ( i in this.newCells ) {
				cell = this.newCells[ i ];
				if ( cell.x === x && cell.y === y ) {
					return cell;
				}
			}
			return null;
		},

		getOldCell: function ( x, y ) {
			var i, cell;
			for ( i in this.oldCells ) {
				cell = this.oldCells[ i ];
				if ( cell.x === x && cell.y === y ) {
					return cell;
				}
			}
			return null;
		},

		getAnt: function ( x, y ) {
			var i, ant;
			for ( i in this.ants ) {
				ant = this.ants[ i ];
				if ( ant.x === x && ant.y === y ) {
					return ant;
				}
			}
			return null;
		},

		/* Setters */

		setCanvas: function ( value ) {
			this.canvas = value;
			this.context = value.getContext( '2d' );
		},

		setWidth: function ( value ) {
			this.width = value;
			this.canvas.setAttribute( 'width', value );
			this.xCells = this.getXcells();
		},

		setHeight: function ( value ) {
			this.height = value;
			this.canvas.setAttribute( 'height', value );
			this.yCells = this.getYcells();
		},

		setCellSize: function ( value ) {
			this.cellSize = parseInt( value );
			this.xCells = this.getXcells();
			this.yCells = this.getYcells();
		},

		/* Actions */

		zoomIn: function () {
			if ( Formicarium.board.cellSize === 32 ) {
				return;
			}
			Formicarium.board.setCellSize( Formicarium.board.cellSize * 2 );
			Formicarium.board.refill();
		},

		zoomOut: function () {
			if ( Formicarium.board.cellSize === 1 ) {
				return;
			}
			Formicarium.board.setCellSize( Formicarium.board.cellSize / 2 );
			Formicarium.board.refill();
		},

		toggleGrid: function () {
			Formicarium.board.grid = Formicarium.board.grid === true ? false : true;
			Formicarium.board.refill();
		},

		drawGrid: function () {
			if ( this.cellSize < 4 ) {
				return; // Cells are too small for the grid
			}
			this.context.beginPath();
			for ( var x = 0; x <= this.xCells; x++ ) {
				this.context.moveTo( x * this.cellSize - 0.5, 0 ); // The 0.5 avoids getting blury lines
				this.context.lineTo( x * this.cellSize - 0.5, this.height );
			}
			for ( var y = 0; y <= this.yCells; y++ ) {
				this.context.moveTo( 0, y * this.cellSize - 0.5 );
				this.context.lineTo( this.width, y * this.cellSize - 0.5 );
			}
			this.context.strokeStyle = '#333';
			this.context.stroke();
		},

		fill: function () {
			var i, cell, ant;
			for ( i in this.newCells ) {
				cell = this.newCells[ i ];
				Formicarium.board.fillCell( cell.x, cell.y, cell.color );
			}
			for ( i in this.ants ) {
				ant = this.ants[ i ];
				Formicarium.board.fillCell( ant.x, ant.y, ant.color );
			}
			if ( this.grid ) {
				this.drawGrid();
			}
		},

		clear: function () {
			this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		},

		refill: function () {
			this.clear();
			this.fill();
		},

		fillCell: function ( x, y, color ) {
			var minX = this.centerX - Math.floor( this.xCells / 2 ),
				minY = this.centerY - Math.floor( this.yCells / 2 ),
				maxX = minX + this.xCells,
				maxY = minY + this.yCells;
			if ( x < minX || y < minY || x > maxX || y > maxY ) {
				return; // If the cell is beyond view, don't draw it
			}
			var rectX = Math.abs( this.centerX - Math.floor( this.xCells / 2 ) - x ) * this.cellSize,
				rectY = Math.abs( this.centerY - Math.floor( this.yCells / 2 ) - y ) * this.cellSize,
				rectW = this.cellSize,
				rectH = this.cellSize;
			this.context.fillStyle = color;
			this.context.fillRect( rectX, rectY, rectW, rectH );
		},

		addNewCell: function ( x, y, color ) {
			var cell = this.getNewCell( x, y );
				index = this.newCells.indexOf( cell );
			if ( index === -1 ) {
				this.fillCell( x, y, color );
				this.newCells.push({ 'x': x, 'y': y, 'color': color });
			}
		},

		addOldCell: function ( x, y, color ) {
			var cell = this.getOldCell( x, y );
				index = this.oldCells.indexOf( cell );
			if ( index === -1 ) {
				this.fillCell( x, y, color );
				this.oldCells.push({ 'x': x, 'y': y, 'color': color });
			}
		},

		removeNewCell: function ( x, y ) {
			var cell = this.getNewCell( x, y ),
				index = this.newCells.indexOf( cell );
			if ( index > -1 ) {
				this.newCells.splice( index, 1 );
			}
		},

		removeOldCell: function ( x, y ) {
			var cell = this.getOldCell( x, y ),
				index = this.oldCells.indexOf( cell );
			if ( index > -1 ) {
				this.oldCells.splice( index, 1 );
			}
		},

		addAnt: function ( x, y ) {
			Formicarium.board.fillCell( x, y );
			var ant = new Formicarium.Ant( x, y )
			this.ants.push( ant );
		},

		removeAnt: function ( x, y ) {
			var ant = this.getAnt( x, y ),
				index = this.ants.indexOf( ant );
			this.ants.splice( index, 1 );
		}
	},

	Ant: function ( x, y, color, direction ) {

		this.x = x ? x : 0;

		this.y = y ? y : 0;

		this.color = color ? color : 'red';

		this.direction = direction ? direction : 'N';

		this.getNewCell = function () {
			return Formicarium.board.getNewCell( this.x, this.y );
		};

		this.getOldCell = function () {
			return Formicarium.board.getOldCell( this.x, this.y );
		};

		this.addNewCell = function ( color ) {
			Formicarium.board.addNewCell( this.x, this.y, color );
			return this;
		};

		this.removeNewCell = function () {
			Formicarium.board.removeNewCell( this.x, this.y );
			return this;
		};

		this.addOldCell = function ( color ) {
			Formicarium.board.addOldCell( this.x, this.y, color );
			return this;
		};

		this.removeOldCell = function () {
			Formicarium.board.removeOldCell( this.x, this.y );
			return this;
		};

		this.turnLeft = function () {
			if ( this.direction === 'N' ) {
				this.direction = 'W';
			} else if ( this.direction === 'W' ) {
				this.direction = 'S';
			} else if ( this.direction === 'S' ) {
				this.direction = 'E';
			} else if ( this.direction === 'E' ) {
				this.direction = 'N';
			}
			return this;
		};

		this.turnRight = function () {
			if ( this.direction === 'N' ) {
				this.direction = 'E';
			} else if ( this.direction === 'W' ) {
				this.direction = 'N';
			} else if ( this.direction === 'S' ) {
				this.direction = 'W';
			} else if ( this.direction === 'E' ) {
				this.direction = 'S';
			}
			return this;
		};

		this.moveBack = function () {
			if ( this.direction === 'N' ) {
				this.y--;
			} else if ( this.direction === 'W' ) {
				this.x++;
			} else if ( this.direction === 'S' ) {
				this.y++;
			} else if ( this.direction === 'E' ) {
				this.x--;
			}
			return this;
		};

		this.moveForward = function () {
			if ( this.direction === 'N' ) {
				this.y++;
			} else if ( this.direction === 'W' ) {
				this.x--;
			} else if ( this.direction === 'S' ) {
				this.y--;
			} else if ( this.direction === 'E' ) {
				this.x++;
			}
			return this;
		};

		this.doRoutine = function () {
			var cell = this.getOldCell();
			if ( cell ) {
				this.removeNewCell().turnRight();
			} else {
				this.addNewCell( 'white' ).turnLeft();
			}
			this.moveForward();
		};

		this.undoRoutine = function () {
			this.moveBack();
			var cell = this.getOldCell();
			if ( cell ) {
				this.removeNewCell().turnRight();
			} else {
				this.addNewCell( 'white' ).turnLeft();
			}
		};
	}
}

$( Formicarium.init );