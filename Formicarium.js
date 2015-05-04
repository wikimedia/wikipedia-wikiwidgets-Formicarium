( function ( mw, $ ) {

var Formicarium = window.Formicarium = $.extend({

	init: function () {
		// Create the GUI
		var wikiwidget = $( '#WikiWidget' );
		var wrapper = $( '<div/>' ).attr( 'id', 'Formicarium' );
		var canvas = $( '<canvas/>' ).attr( 'id', 'FormicariumCanvas' );
		var menu = $( '<div/>' ).attr( 'id', 'FormicariumMenu' );

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
		var zoomOutButton = $( '<img/>' )
			.addClass( 'button' )
			.attr( 'id', 'FormicariumZoomOutButton' )
			.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/6/63/WikiWidgetZoomOutButton.png' )
			.attr( 'title', 'Zoom out' )
			.attr( 'alt', 'Zoom out' );
		var zoomInButton = $( '<img/>' )
			.addClass( 'button' )
			.attr( 'id', 'FormicariumZoomInButton' )
			.attr( 'src', '//upload.wikimedia.org/wikipedia/commons/2/2e/WikiWidgetZoomInButton.png' )
			.attr( 'title', 'Zoom in' )
			.attr( 'alt', 'Zoom in' );
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
		menu.append( resetButton )
			.append( previousButton )
			.append( playButton )
			.append( pauseButton )
			.append( nextButton )
			.append( zoomOutButton )
			.append( zoomInButton )
			//.append( addAntButton )
			.append( generationCounter );
		wrapper.html( canvas ).append( menu );
		wikiwidget.html( wrapper );

		// Set the variables that must wait for the DOM to be loaded
		this.board.setCanvas( document.getElementById( 'FormicariumCanvas' ) );
		this.board.setContext( this.board.canvas.getContext( '2d' ) );
		this.board.setWidth( 400 ); // Make this adjustable from the template?
		this.board.setHeight( 300 );

		// Bind events
		canvas.click( function ( event ) {
			Formicarium.mouse.click( event );
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
		$( '#FormicariumMenu .button' ).mouseover( function ( event ) {
			Formicarium.menu.showTooltip( event );
		});
		$( '#FormicariumMenu .button' ).mouseout( function ( event ) {
			Formicarium.menu.hideTooltip( event );
		});

		// Create the initial ant in the center
		var x = Math.floor( this.board.xCells / 2 );
		var y = Math.floor( this.board.yCells / 2 );
		var ant = new this.Ant( x, y );
		ant.register().draw();
	},

	menu: {

		setGeneration: function ( value ) {
			$( '#FormicariumGenerationCounter' ).text( value );
			return this;
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

		ants: [],

		speed: 1000,

		generation: 0,

		playing: false,

		setGeneration: function ( value ) {
			this.generation = value;
			Formicarium.menu.setGeneration( value );
			return this;
		},

		setSpeed: function ( value ) {
			this.speed = value;
			return this;
		},

		getGeneration: function () {
			return this.generation;
		},

		getSpeed: function () {
			return this.speed;
		},

		previous: function () {
			var game = Formicarium.game; //The game cannot be referred to as this, because of the way the setInterval function works
			var generation = game.getGeneration();
			generation--;
			game.setGeneration( generation );
			for ( var i = 0; i < Formicarium.game.ants.length; i++ ) {
				Formicarium.game.ants[ i ].undoRoutine();
			}
			return this;
		},

		next: function () {
			var game = Formicarium.game; //The game cannot be referred to as this, because of the way the setInterval function works
			var generation = game.getGeneration();
			generation++;
			game.setGeneration( generation );
			for ( var i = 0; i < Formicarium.game.ants.length; i++ ) {
				Formicarium.game.ants[ i ].doRoutine();
			}
			return this;
		},

		play: function () {
			if ( this.playing ) {
				return this; //If the game is already playing, exit
			}
			var interval = 1000 / this.speed;
			this.playing = setInterval( this.next, interval ); //The interval's id is stored in the playing property
			$( '#FormicariumPlayButton' ).hide();
			$( '#FormicariumPauseButton' ).show();
			return this;
		},

		pause: function () {
			if ( !this.playing ) {
				return this; //If the game is already paused, exit
			}
			clearInterval( this.playing );
			this.playing = false;
			$( '#FormicariumPlayButton' ).show();
			$( '#FormicariumPauseButton' ).hide();
			return this;
		},

		reset: function () {
			// Reset the game
			this.setGeneration( 0 );
			this.ants = [];

			// Reset the board
			var board = Formicarium.board;
			board.topLeftX = 0;
			board.topLeftY = 0;
			board.cells = [];
			board.clear();

			// Create the initial ant
			var x = Math.floor( board.xCells / 2 );
			var y = Math.floor( board.yCells / 2 );
			var ant = new Formicarium.Ant( x, y );
			ant.register().draw();

			return this;
		}
	},

	mouse: {

		x: 0,

		y: 0,

		action: 'addCell',

		setX: function ( value ) {
			this.x = value;
			return this;
		},

		setY: function ( value ) {
			this.y = value;
			return this;
		},

		setAction: function ( value ) {
			this.action = value;
			return this;
		},

		setCursor: function ( value ) {
			this.cursor = value;
			board.canvas.style.cursor = value;
			return this;
		},

		click: function ( event ) {
			var board = Formicarium.board;
			var canvas = $( board.canvas );
			var x = board.topLeftX + Math.floor( ( event.pageX - canvas.offset().left ) / board.cellSize );
			var y = board.topLeftY + Math.floor( ( event.pageY - canvas.offset().top ) / board.cellSize );
			//console.log( event.screenX, event.clientX, board.canvas.offsetLeft, x );
			this.setX( x );
			this.setY( y );
			this[ this.action ]( event ); //Call the function stored in mouse.action, and pass the event
			return this;
		},

		addAnt: function () {
			var ant = new Formicarium.Ant( this.x, this.y );
			ant.register().draw();
			return this;
		},

		addCell: function () {
			var cell = new Formicarium.Cell( this.x, this.y );
			cell.register().draw();
			return this;
		}
	},

	board: {

		canvas: {},
		context: {},

		width: 400,
		height: 300,

		topLeftX: 0,
		topLeftY: 0,

		cellSize: 4,

		xCells: 100,
		yCells: 75,

		background: 'black',

		cells: [],

		getXcells: function () {
			return Math.floor( this.width / this.cellSize );
		},

		getYcells: function () {
			return Math.floor( this.height / this.cellSize );
		},

		setCanvas: function ( value ) {
			this.canvas = value;
			return this;
		},

		setContext: function ( value ) {
			this.context = value;
			return this;
		},

		setWidth: function ( value ) {
			this.width = value;
			this.canvas.setAttribute( 'width', value );
			this.xCells = this.getXcells();
			return this;
		},

		setHeight: function ( value ) {
			this.height = value;
			this.canvas.setAttribute( 'height', value );
			this.yCells = this.getYcells();
			return this;
		},

		setCellSize: function ( value ) {
			this.cellSize = parseInt( value );
			this.xCells = this.getXcells();
			this.yCells = this.getYcells();
			return this;
		},

		move: function ( x, y ) {
			var centerX = Math.floor( this.xCells / 2 )
			var centerY = Math.floor( this.yCells / 2 )
			var diffX = centerX - x
			var diffY = centerY - y
			for ( var i = 0; i < this.cells.length; i++ ) {
				this.cells[i].x += diffX, this.cells[i].y += diffY;
			}
			ant.x += diffX, ant.y += diffY;
			this.refill()
			return this
		},

		zoomIn: function () {
			if ( this.cellSize === 32 ) {
				return this;
			}
			this.setCellSize( this.cellSize * 2 );
			this.topLeftX += Math.floor( this.xCells / 2 );
			this.topLeftY += Math.floor( this.yCells / 2 );
			this.refill();
			return this;
		},

		zoomOut: function () {
			if ( this.cellSize === 1 ) {
				return this;
			}
			this.setCellSize( this.cellSize / 2 );
			this.topLeftX -= Math.floor( this.xCells / 4 );
			this.topLeftY -= Math.floor( this.yCells / 4 );
			this.refill();
			return this;
		},

		fill: function () {
			for ( i in this.cells ) {
				this.cells[ i ].draw();
			}
			for ( i in Formicarium.game.ants ) {
				Formicarium.game.ants[ i ].draw();
			}
			return this;
		},

		clear: function () {
			this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
			return this;
		},

		refill: function() {
			this.clear().fill();
			return this;
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
			if ( x < 0 || y < 0 || x > this.xCells || y > this.yCells ) {
				//return this //If the cell is outside the board, exit
			}
			var rectX = ( x - this.topLeftX ) * this.cellSize;
			var rectY = ( y - this.topLeftY ) * this.cellSize;
			var rectW = this.cellSize;
			var rectH = this.cellSize;
			this.context.fillStyle = color;
			this.context.fillRect( rectX, rectY, rectW, rectH );
			return this;
		},

		clearCell: function ( x, y ) {
			if ( x < 0 || y < 0 || x > this.xCells || y > this.yCells ) {
				//return this; //If the cell is outside the board, exit
			}
			var rectX = ( x - this.topLeftX ) * this.cellSize;
			var rectY = ( y - this.topLeftY ) * this.cellSize;
			var rectW = this.cellSize;
			var rectH = this.cellSize;
			this.context.clearRect( rectX, rectY, rectW, rectH );
			return this;
		},

/*		createCell: function ( x, y, color ) {
			var cell = new Formicarium.cell( x, y, color )
			cell.register().draw();
			return this;
		},
*/

		destroyCell: function ( x, y ) {
			var cell = this.getCell( x, y );
			var indexOfCell = this.cells.indexOf( cell );
			this.cells.splice( indexOfCell, 1 ); // Remove the cell from the array
			this.clearCell( x, y );
			return this;
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

		this.x = x;

		this.y = y;

		this.color = 'red';

		this.direction = 'N';

		this.speed = 1;

		this.register = function () {
			Formicarium.game.ants.push( this );
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
			return this;
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
			return this;
		};
	}
});

Formicarium.init();

}( mediaWiki, jQuery ) );
