( function ( mw, $ ) {

var Formicarium = window.Formicarium = $.extend({

	init: function () {
		// Build the GUI and bind events
		this.gui.buildAndBind()

		// Set the variables that must wait for the DOM to be loaded
		this.board.setCanvas( document.getElementById( 'FormicariumCanvas' ) );
		this.board.setContext( this.board.canvas.getContext( '2d' ) );
		this.board.setWidth( 400 ); // Make this adjustable from the template?
		this.board.setHeight( 300 );

		// Create the initial ant
		var ant = new this.Ant();
		ant.register().draw();

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
				.attr( 'title', 'Move' )
				.attr( 'alt', 'Move' );
			var zoomInButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumZoomInButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/2/2e/WikiWidgetZoomInButton.png' )
				.attr( 'title', 'Zoom in' )
				.attr( 'alt', 'Zoom in' );
			var zoomOutButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumZoomOutButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/6/63/WikiWidgetZoomOutButton.png' )
				.attr( 'title', 'Zoom out' )
				.attr( 'alt', 'Zoom out' );
			var resetButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumResetButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/0/0e/WikiWidgetResetButton.png' )
				.attr( 'title', 'Reset' )
				.attr( 'alt', 'Reset' );
			var previousButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumPreviousButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/c/c3/WikiWidgetPreviousFrameButton.png' )
				.attr( 'title', 'Previous generation' )
				.attr( 'alt', 'Previous generation' );
			var playButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumPlayButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/b/b8/WikiWidgetPlayButton.png' )
				.attr( 'title', 'Play' )
				.attr( 'alt', 'Play' );
			var pauseButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumPauseButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/6/6e/WikiWidgetPauseButton.png' )
				.attr( 'title', 'Pause' )
				.attr( 'alt', 'Pause' )
				.hide(); // The pause button starts hidden
			var nextButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumNextButton' )
				.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/b/bf/WikiWidgetNextFrameButton.png' )
				.attr( 'title', 'Next generation' )
				.attr( 'alt', 'Next generation' );
/*
			var addAntButton = $( '<img/>' )
				.addClass( 'button' )
				.attr( 'id', 'FormicariumAddButton' )
				.attr( 'src', '//localhost/Formicarium/images/FormicariumAddAntButton.png' )
				.attr( 'title', 'Add ant' )
				.attr( 'alt', 'Add ant' );
*/
			var generationCounter = $( '<span/>' )
				.attr( 'id', 'FormicariumGenerationCounter' )
				.text( '0' );

			// Put it all together
			menu.append( moveButton )
				.append( zoomInButton )
				.append( zoomOutButton )
				.append( resetButton )
				.append( previousButton )
				.append( playButton )
				.append( pauseButton )
				.append( nextButton )
				//.append( addAntButton )
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
			moveButton.click( function () {
				$( this ).addClass( 'active' ).siblings().removeClass( 'active' );
				Formicarium.mouse.downAction = null;
				Formicarium.mouse.dragAction = 'moveBoard';
				Formicarium.mouse.upAction = null;
			});
			$( '#FormicariumMenu .button' ).mouseover( function ( event ) {
				Formicarium.gui.showTooltip( event );
			}).mouseout( function ( event ) {
				Formicarium.gui.hideTooltip( event );
			});
		},

		/**
		 * Updates the state of all the GUI elements
		 */
		update: function () {
			$( '#FormicariumGenerationCounter' ).text( Formicarium.game.generation );
		},

		showTooltip: function ( event ) {
			var button = $( event.target );
			var title = button.attr( 'title' );
			var tooltip = $( '<span/>' ).addClass( 'tooltip' ).text( title );
			button.before( tooltip );
		},
	
		hideTooltip: function ( event ) {
			$( '.tooltip' ).remove();
		}
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
			for ( var i = 0; i < Formicarium.board.ants.length; i++ ) {
				Formicarium.board.ants[ i ].undoRoutine();
			}
		},

		next: function () {
			Formicarium.game.setGeneration( Formicarium.game.generation + 1 );
			for ( var i = 0; i < Formicarium.board.ants.length; i++ ) {
				Formicarium.board.ants[ i ].doRoutine();
			}
		},

		play: function () {
			if ( this.playing ) {
				return this; // If the game is already playing, exit
			}
			var interval = 1000 / this.speed;
			this.playing = setInterval( this.next, interval ); // The interval's id is stored in the playing property
			$( '#FormicariumPlayButton' ).hide();
			$( '#FormicariumPauseButton' ).show();
		},

		pause: function () {
			if ( !this.playing ) {
				return this; // If the game is already paused, exit
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
			board.cells = [];
			board.clear();

			// Create the initial ant
			var ant = new Formicarium.Ant();
			ant.register().draw();
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
			return board.centerX - Math.floor( board.xCells / 2 ) + Math.floor( event.offsetX / board.cellSize );
		},

		getCurrentY: function ( event ) {
			var board = Formicarium.board;
			return board.centerY - Math.floor( board.yCells / 2 ) + Math.floor( event.offsetY / board.cellSize );
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

		addAnt: function () {
			var ant = new Formicarium.Ant( this.x, this.y );
			ant.register().draw();
		},

		addCell: function () {
			var cell = new Formicarium.Cell( this.x, this.y );
			cell.register().draw();
		},

		moveBoard: function ( event ) {
			Formicarium.board.centerX += this.previousX - this.currentX;
			Formicarium.board.centerY += this.previousY - this.currentY;

			Formicarium.board.refill();

			// Bugfix: without the following, the board flickers when moving, not sure why
			this.currentX = this.getCurrentX( event );
			this.currentY = this.getCurrentY( event );
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

		background: 'black',

		ants: [],
		cells: [],

		/* Getters */

		getXcells: function () {
			return Math.floor( this.width / this.cellSize );
		},

		getYcells: function () {
			return Math.floor( this.height / this.cellSize );
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
				return this;
			}
			this.setCellSize( this.cellSize * 2 );
			this.refill();
		},

		zoomOut: function () {
			if ( this.cellSize === 1 ) {
				return this;
			}
			this.setCellSize( this.cellSize / 2 );
			this.refill();
		},

		fill: function () {
			for ( i in this.cells ) {
				this.cells[ i ].draw();
			}
			for ( i in this.ants ) {
				this.ants[ i ].draw();
			}
		},

		clear: function () {
			this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		},

		refill: function() {
			this.clear();
			this.fill();
		},

		getCell: function ( x, y ) {
			for ( var i = 0; i < this.cells.length; i++ ) {
				if ( this.cells[ i ].x === x && this.cells[ i ].y === y ) {
					return this.cells[ i ];
				}
			}
			return null;
		},

		fillCell: function ( x, y, color ) {
			var topLeftX = this.centerX - Math.floor( this.xCells / 2 ),
				topLeftY = this.centerY - Math.floor( this.yCells / 2 ),
				bottomRightX = topLeftX + this.xCells,
				bottomRightY = topLeftY + this.yCells;
			if ( x < topLeftX || y < topLeftY || x > bottomRightX || y > bottomRightY ) {
				return this; // If the cell is outside the board, don't draw it
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
				return this; // If the cell is outside the board, there's no need to clear it
			}
			var rectX = Math.abs( this.centerX - Math.floor( this.xCells / 2 ) - x ) * this.cellSize,
				rectY = Math.abs( this.centerY - Math.floor( this.yCells / 2 ) - y ) * this.cellSize,
				rectW = this.cellSize,
				rectH = this.cellSize;
			this.context.clearRect( rectX, rectY, rectW, rectH );
		},

		createCell: function ( x, y, color ) {
			var cell = new Formicarium.cell( x, y, color )
			cell.register().draw();
		},

		destroyCell: function ( x, y ) {
			var cell = this.getCell( x, y );
			var indexOfCell = this.cells.indexOf( cell );
			this.cells.splice( indexOfCell, 1 ); // Remove the cell from the array
			this.clearCell( x, y );
		}
	},

	Cell: function ( x, y, color ) {

		this.x = x;

		this.y = y;

		this.color = color === undefined ? 'white' : color;

		this.draw = function () {
			Formicarium.board.fillCell( this.x, this.y, this.color );
			return this;
		};

		this.register = function () {
			Formicarium.board.cells.push( this );
			return this;
		};
	},

	Ant: function ( x, y ) {

		this.x = x === undefined ? 0 : x;

		this.y = y === undefined ? 0 : y;

		this.color = 'red';

		this.direction = 'N';

		this.speed = 1;

		this.register = function () {
			Formicarium.board.ants.push( this );
			return this;
		};

		this.createCell = function ( color ) {
			var cell = new Formicarium.Cell( this.x, this.y, color )
			cell.register().draw();
			return this;
		};

		this.destroyCell = function () {
			Formicarium.board.destroyCell( this.x, this.y );
			return this;
		};

		this.readCell = function () {
			return Formicarium.board.getCell( this.x, this.y );
		};

		this.draw = function () {
			Formicarium.board.fillCell( this.x, this.y, this.color );
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

		this.doRoutine = function() {
			// First cover the tracks of the ant
			var cell = this.readCell();
			if ( cell ) {
				cell.draw();
			} else {
				Formicarium.board.clearCell( this.x, this.y );
			}

			// Perform the routine
			if ( cell ) {
				this.destroyCell().turnRight();
			} else {
				this.createCell().turnLeft();
			}
			this.moveForward();

			// Finally, draw the ant in the new position
			this.draw();
		};

		this.undoRoutine = function() {
			// First cover the tracks of the ant
			var cell = this.readCell();
			if ( cell ) {
				cell.draw();
			} else {
				Formicarium.board.clearCell( this.x, this.y );
			}

			// Perform the routine backwards
			this.moveBack();
			var cell = this.readCell();
			if ( cell ) {
				this.destroyCell().turnRight();
			} else {
				this.createCell().turnLeft();
			}

			// Finally, draw the ant in the new position
			this.draw();
		};
	}
});

Formicarium.init();

}( mediaWiki, jQuery ) );
