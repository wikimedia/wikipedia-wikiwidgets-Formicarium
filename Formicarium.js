/**
 * Formicarium is a widget meant to be embeded in articles about Langton's ant
 * in order to aid the understanding of the topic
 *
 * Written by Luis Felipe Schenone in 2015
 *
 * Formicarium is available under the GNU General Public License (http://www.gnu.org/licenses/gpl.html)
 */
var Formicarium = {

	/**
	 * Localisation to Spanish
	 */
	messages: {
		'ant-button': 'Hormiga',
		'ant-button-tooltip': 'Agregar o quitar hormigas',
		'cell-button': 'Celda',
		'cell-button-tooltip': 'Agregar o quitar celdas',
		'next-button': 'Siguiente',
		'next-button-tooltip': 'Generación siguiente',
		'move-button': 'Mover',
		'move-button-tooltip': 'Mover el tablero',
		'pause-button': 'Pausar',
		'pause-button-tooltip': 'Pausar',
		'play-button': 'Reproducir',
		'play-button-tooltip': 'Reproducir',
		'previous-button': 'Anterior',
		'previous-button-tooltip': 'Generación anterior',
		'reset-button': 'Reiniciar',
		'reset-button-tooltip': 'Reiniciar',
		'zoom-in-button': 'Acercar',
		'zoom-in-button-tooltip': 'Acercar',
		'zoom-out-button': 'Alejar',
		'zoom-out-button-tooltip': 'Alejar',
		'grid-button': 'Grilla',
		'grid-button-tooltip': 'Grilla'
	}, 

	/**
	 * Convenience method that returns a localised message for the given key
	 */
	getMessage: function( key ) {
		return this.messages[ key ];
	},

	/**
	 * Initialise Formicarium
	 */
	init: function () {
		// Build the GUI and bind events
		this.gui.buildAndBind()

		// Set the variables that must wait for the DOM to be loaded
		this.board.setCanvas( document.getElementById( 'FormicariumCanvas' ) );
		this.board.setContext( this.board.canvas.getContext( '2d' ) );
		this.board.setWidth( 400 ); // Make this adjustable from the template?
		this.board.setHeight( 300 );
		this.board.addAnt( 0, 0, 'red' );
		this.board.fill();

		// Set 'Move' as the default action 
		$( '#FormicariumMoveButton' ).click();
	},

	gui: {
		buildAndBind: function () {
			var wikiwidget = $( '#WikiWidget' );
			var wrapper = $( '<div/>' ).attr( 'id', 'Formicarium' );
			var canvas = $( '<canvas/>' ).attr( 'id', 'FormicariumCanvas' );
			var menu = $( '<div/>' ).attr( 'id', 'FormicariumMenu' );

			var moveButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumMoveButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/1/15/WikiWidgetMoveButton.png' )
				.attr( 'title', Formicarium.getMessage( 'move-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'move-button' ) );
			var cellButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumCellButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/f/ff/WikiWidgetCellButton.png' )
				.attr( 'title', Formicarium.getMessage( 'cell-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'cell-button' ) );
			var antButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumAntButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/a/a9/WikiWidgetAntButton.png' )
				.attr( 'title', Formicarium.getMessage( 'ant-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'ant-button' ) );
			var resetButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumResetButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/0/0e/WikiWidgetResetButton.png' )
				.attr( 'title', Formicarium.getMessage( 'reset-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'reset-button' ) );
			var previousButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumPreviousButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/c/c3/WikiWidgetPreviousFrameButton.png' )
				.attr( 'title', Formicarium.getMessage( 'previous-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'previous-button' ) );
			var playButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumPlayButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/b/b8/WikiWidgetPlayButton.png' )
				.attr( 'title', Formicarium.getMessage( 'play-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'play-button' ) );
			var pauseButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumPauseButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/6/6e/WikiWidgetPauseButton.png' )
				.attr( 'title', Formicarium.getMessage( 'pause-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'pause-button' ) )
				.hide(); // The pause button starts hidden
			var nextButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumNextButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/b/bf/WikiWidgetNextFrameButton.png' )
				.attr( 'title', Formicarium.getMessage( 'next-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'next-button' ) );
			var zoomInButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumZoomInButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/2/2e/WikiWidgetZoomInButton.png' )
				.attr( 'title', Formicarium.getMessage( 'zoom-in-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'zoom-in-button' ) );
			var zoomOutButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumZoomOutButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/6/63/WikiWidgetZoomOutButton.png' )
				.attr( 'title', Formicarium.getMessage( 'zoom-out-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'zoom-out-button' ) );
			var gridButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumGridButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/a/a9/WikiWidgetGridButton.png' )
				.attr( 'title', Formicarium.getMessage( 'grid-button-tooltip' ) )
				.attr( 'alt', Formicarium.getMessage( 'grid-button' ) );
			var generationCounter = $( '<span/>' )
				.attr( 'id', 'FormicariumGenerationCounter' )
				.text( '0' );

			// Put it all together
			menu.append( moveButton )
				.append( cellButton )
				.append( antButton )
				.append( resetButton )
				.append( previousButton )
				.append( playButton )
				.append( pauseButton )
				.append( nextButton )
				.append( zoomInButton )
				.append( zoomOutButton )
				.append( gridButton )
				.append( generationCounter );
			wrapper.html( canvas ).append( menu );
			wikiwidget.html( wrapper );

			// Bind events
			canvas.mousedown( function ( event ) {
				Formicarium.mouse.down( event );
			}).mousemove( function ( event ) {
				Formicarium.mouse.move( event );
			}).mouseup( function ( event ) {
				Formicarium.mouse.up( event );
			});
			moveButton.click( function () {
				Formicarium.mouse.downAction = null;
				Formicarium.mouse.dragAction = 'moveBoard';
				Formicarium.mouse.upAction = null;
			});
			cellButton.click( function () {
				Formicarium.mouse.downAction = null;
				Formicarium.mouse.dragAction = 'addRemoveCell';
				Formicarium.mouse.upAction = 'addRemoveCell';
			});
			antButton.click( function () {
				Formicarium.mouse.downAction = null;
				Formicarium.mouse.dragAction = 'addRemoveAnt';
				Formicarium.mouse.upAction = 'addRemoveAnt';
			});
			resetButton.click( function () {
				Formicarium.game.reset();
			});
			previousButton.click( function () {
				Formicarium.game.previous();
			});
			playButton.click( function () {
				Formicarium.game.play();
			});
			pauseButton.click( function () {
				Formicarium.game.pause();
			});
			nextButton.click( function () {
				Formicarium.game.next();
			});
			zoomOutButton.click( function () {
				Formicarium.board.zoomOut();
			});
			zoomInButton.click( function () {
				Formicarium.board.zoomIn();
			});
			gridButton.click( function () {
				Formicarium.board.grid = Formicarium.board.grid === true ? false : true;
				Formicarium.board.refill();
			});
			$( '.button', menu ).click( function () {
				Formicarium.gui.update();
			});
		},

		/**
		 * Updates the state of all the GUI elements
		 */
		update: function () {
			$( '#FormicariumGenerationCounter' ).text( Formicarium.game.generation );

			$( '#FormicariumMenu .button' ).removeClass( 'disabled active' );

			if ( Formicarium.mouse.dragAction === 'moveBoard' ) {
				$( '#FormicariumMoveButton' ).addClass( 'active' );
			}
			if ( Formicarium.mouse.dragAction === 'addRemoveAnt' ) {
				$( '#FormicariumAntButton' ).addClass( 'active' );
			}
			if ( Formicarium.mouse.dragAction === 'addRemoveCell' ) {
				$( '#FormicariumCellButton' ).addClass( 'active' );
			}
			if ( Formicarium.board.cellSize < 4 ) {
				$( '#FormicariumGridButton' ).addClass( 'disabled' );
			}
			if ( Formicarium.board.cellSize === 1 ) {
				$( '#FormicariumZoomOutButton' ).addClass( 'disabled' );
			}
			if ( Formicarium.board.cellSize === 32 ) {
				$( '#FormicariumZoomInButton' ).addClass( 'disabled' );
			}
		},
	},

	game: {

		speed: 1000,

		generation: 0,

		playing: false,

		/* Setters */

		setGeneration: function ( value ) {
			this.generation = value;
			Formicarium.gui.update();
		},

		/* Actions */

		previous: function () {
			Formicarium.game.setGeneration( Formicarium.game.generation - 1 );
			Formicarium.board.previousCells = Formicarium.board.currentCells.slice(); // Clone
			for ( var i = 0; i < Formicarium.board.ants.length; i++ ) {
				Formicarium.board.ants[ i ].undoRoutine();
			}
			Formicarium.board.refill();
		},

		next: function () {
			Formicarium.game.setGeneration( Formicarium.game.generation + 1 );
			Formicarium.board.previousCells = Formicarium.board.currentCells.slice(); // Clone
			for ( var i = 0; i < Formicarium.board.ants.length; i++ ) {
				Formicarium.board.ants[ i ].doRoutine();
			}
			Formicarium.board.refill();
		},

		play: function () {
			if ( this.playing ) {
				return; // If the game is already playing, exit
			}
			var interval = 1000 / this.speed;
			this.playing = setInterval( this.next, interval ); // The interval's id is stored in the playing property
			$( '#FormicariumPlayButton' ).hide();
			$( '#FormicariumPauseButton' ).show();
		},

		pause: function () {
			if ( !this.playing ) {
				return; // If the game is already paused, exit
			}
			clearInterval( this.playing );
			this.playing = false;
			$( '#FormicariumPlayButton' ).show();
			$( '#FormicariumPauseButton' ).hide();
		},

		reset: function () {
			// Reset the game
			this.setGeneration( 0 );

			// Reset the board
			var board = Formicarium.board;
			board.centerX = 0;
			board.centerY = 0;
			board.ants = [];
			board.currentCells = [];
			board.addAnt( 0, 0, 'red' );
			board.refill();
		}
	},

	mouse: {
		/**
		 * The distance from the origin of the coordinate system in cells (not pixels)
		 */
		currentX: null,
		currentY: null,
		previousX: null,
		previousY: null,

		state: 'up', // up, down or drag
		upAction: null,
		dragAction: null,
		downAction: null,

		/* Getters */

		getCurrentX: function ( event ) {
			var board = Formicarium.board;
			return board.centerX - Math.floor( board.xCells / 2 ) + Math.floor( ( event.offsetX - 1 /* bugfix */ ) / board.cellSize );
		},

		getCurrentY: function ( event ) {
			var board = Formicarium.board;
			return board.centerY - Math.floor( board.yCells / 2 ) + Math.floor( ( event.offsetY - 2 /* bugfix */ ) / board.cellSize );
		},

		/* Events */

		up: function ( event ) {
			this.state = 'up';
			if ( this.upAction ) {
				this[ this.upAction ]( event );
			}
		},

		move: function ( event ) {
			this.previousX = this.currentX;
			this.previousY = this.currentY;
			this.currentX = this.getCurrentX( event );
			this.currentY = this.getCurrentY( event );

			// If the mouse is being dragged, not just moved
			var moved = ( this.currentX - this.previousX ) || ( this.currentY - this.previousY );
			if ( this.state === 'down' && moved && this.dragAction ) {
				this[ this.dragAction ]( event );
			}
		},

		down: function ( event ) {
			this.state = 'down';
			if ( this.downAction ) {
				this[ this.downAction ]( event );
			}
		},

		/* Actions */

		moveBoard: function ( event ) {
			Formicarium.board.centerX += this.previousX - this.currentX;
			Formicarium.board.centerY += this.previousY - this.currentY;
			Formicarium.board.refill();

			// Bugfix: without the following, the board flickers when moving, not sure why
			this.currentX = this.getCurrentX( event );
			this.currentY = this.getCurrentY( event );
		},

		addRemoveCell: function ( event ) {
			var cell = Formicarium.board.getCell( this.currentX, this.currentY );
			if ( cell ) {
				Formicarium.board.removeCell( this.currentX, this.currentY );
			} else {
				Formicarium.board.addCell( this.currentX, this.currentY, 'white' );
			}
			Formicarium.board.refill();
		},

		addRemoveAnt: function () {
			var ant = Formicarium.board.getAnt( this.currentX, this.currentY );
			if ( ant ) {
				Formicarium.board.removeAnt( this.currentX, this.currentY );
			} else {
				Formicarium.board.addAnt( this.currentX, this.currentY, 'red' );
			}
			Formicarium.board.refill();
		}
	},

	board: {

		canvas: {},
		context: {},

		width: 400,
		height: 300,

		centerX: 0,
		centerY: 0,

		cellSize: 4,

		xCells: 100,
		yCells: 75,

		grid: false,

		ants: [],
		currentCells: [],
		previousCells: [],

		/* Getters */

		getXcells: function () {
			return Math.floor( this.width / this.cellSize );
		},

		getYcells: function () {
			return Math.floor( this.height / this.cellSize );
		},

		getCell: function ( x, y ) {
			for ( var i = 0; i < this.previousCells.length; i++ ) {
				if ( this.previousCells[ i ].x === x && this.previousCells[ i ].y === y ) {
					return this.previousCells[ i ];
				}
			}
			return null;
		},

		getAnt: function ( x, y ) {
			for ( var i = 0; i < this.ants.length; i++ ) {
				if ( this.ants[ i ].x === x && this.ants[ i ].y === y ) {
					return this.ants[ i ];
				}
			}
			return null;
		},

		/* Setters */

		setCanvas: function ( value ) {
			this.canvas = value;
		},

		setContext: function ( value ) {
			this.context = value;
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
			if ( this.cellSize === 32 ) {
				return;
			}
			this.setCellSize( this.cellSize * 2 );
			this.refill();
		},

		zoomOut: function () {
			if ( this.cellSize === 1 ) {
				return;
			}
			this.setCellSize( this.cellSize / 2 );
			this.refill();
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
			this.context.strokeStyle = '#555';
			this.context.stroke();
		},

		fill: function () {
			for ( i in this.currentCells ) {
				Formicarium.board.fillCell( this.currentCells[ i ].x, this.currentCells[ i ].y, this.currentCells[ i ].color );
			}
			for ( i in this.ants ) {
				Formicarium.board.fillCell( this.ants[ i ].x, this.ants[ i ].y, this.ants[ i ].color );
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
			var topLeftX = this.centerX - Math.floor( this.xCells / 2 ),
				topLeftY = this.centerY - Math.floor( this.yCells / 2 ),
				bottomRightX = topLeftX + this.xCells,
				bottomRightY = topLeftY + this.yCells;
			if ( x < topLeftX || y < topLeftY || x > bottomRightX || y > bottomRightY ) {
				return; // If the cell is outside the board, don't draw it
			}
			var rectX = Math.abs( this.centerX - Math.floor( this.xCells / 2 ) - x ) * this.cellSize,
				rectY = Math.abs( this.centerY - Math.floor( this.yCells / 2 ) - y ) * this.cellSize,
				rectW = this.cellSize,
				rectH = this.cellSize;
			this.context.fillStyle = color;
			this.context.fillRect( rectX, rectY, rectW, rectH );
		},

		clearCell: function ( x, y ) {
			var topLeftX = this.centerX - Math.floor( this.xCells / 2 ),
				topLeftY = this.centerY - Math.floor( this.yCells / 2 ),
				bottomRightX = topLeftX + this.xCells,
				bottomRightY = topLeftY + this.yCells;
			if ( x < topLeftX || y < topLeftY || x > bottomRightX || y > bottomRightY ) {
				return; // If the cell is outside the board, there's no need to clear it
			}
			var rectX = Math.abs( this.centerX - Math.floor( this.xCells / 2 ) - x ) * this.cellSize,
				rectY = Math.abs( this.centerY - Math.floor( this.yCells / 2 ) - y ) * this.cellSize,
				rectW = this.cellSize,
				rectH = this.cellSize;
			this.context.clearRect( rectX, rectY, rectW, rectH );
		},

		addCell: function ( x, y, color ) {
			var cell = { 'x': x, 'y': y, 'color': color };
			Formicarium.board.fillCell( cell.x, cell.y, cell.color );
			Formicarium.board.currentCells.push( cell );
		},

		removeCell: function ( x, y ) {
			var cell = this.getCell( x, y );
			var indexOfCell = this.currentCells.indexOf( cell );
			this.currentCells.splice( indexOfCell, 1 ); // Remove the cell from the array
		},

		addAnt: function ( x, y, color ) {
			var ant = new Formicarium.Ant( x, y, color )
			Formicarium.board.fillCell( ant.x, ant.y, ant.color );
			Formicarium.board.ants.push( ant );
		},

		removeAnt: function ( x, y ) {
			var ant = this.getAnt( x, y );
			var indexOfAnt = this.ants.indexOf( ant );
			this.ants.splice( indexOfAnt, 1 ); // Remove the ant from the array
		}
	},

	Ant: function ( x, y, color ) {

		this.x = x;

		this.y = y;

		this.color = color;

		this.direction = 'N';

		this.speed = 1;

		this.getCell = function () {
			return Formicarium.board.getCell( this.x, this.y );
		};

		this.addCell = function ( color ) {
			var cell = { 'x': this.x, 'y': this.y, 'color': color };
			Formicarium.board.fillCell( cell.x, cell.y, cell.color );
			Formicarium.board.currentCells.push( cell );
			return this;
		};

		this.removeCell = function () {
			Formicarium.board.removeCell( this.x, this.y );
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
			} else if ( this.direction === 'E' ) {
				this.direction = 'S';
			} else if ( this.direction === 'S' ) {
				this.direction = 'W';
			} else if ( this.direction === 'W' ) {
				this.direction = 'N';
			}
			return this;
		};

		this.moveBack = function () {
			if ( this.direction === 'N' ) {
				this.y--;
			} else if ( this.direction === 'W' ) {
				this.x--;
			} else if ( this.direction === 'S' ) {
				this.y++;
			} else if ( this.direction === 'E' ) {
				this.x++;
			}
			return this;
		};

		this.moveForward = function () {
			if ( this.direction === 'N' ) {
				this.y++;
			} else if ( this.direction === 'W' ) {
				this.x++;
			} else if ( this.direction === 'S' ) {
				this.y--;
			} else if ( this.direction === 'E' ) {
				this.x--;
			}
			return this;
		};

		this.doRoutine = function () {
			var cell = this.getCell();
			if ( cell ) {
				this.removeCell().turnRight();
			} else {
				this.addCell( 'white' ).turnLeft();
			}
			this.moveForward();
		};

		this.undoRoutine = function () {
			this.moveBack();
			var cell = this.getCell();
			if ( cell ) {
				this.removeCell().turnRight();
			} else {
				this.addCell( 'white' ).turnLeft();
			}
		};
	}
}

jQuery( function (){
	Formicarium.init();
});
