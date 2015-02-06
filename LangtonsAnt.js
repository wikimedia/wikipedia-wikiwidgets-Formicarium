( function ( mw, $ ) {

var LangtonsAnt = window.LangtonsAnt = $.extend({

	init: function () {
		// Create the GUI
		var wrapper = $( '#WikiWidget' );
		var canvas = $( '<canvas/>' ).attr( 'id', 'LangtonsAntCanvas' );
		var menu = $( '<div/>' ).attr( 'id', 'LangtonsAntMenu' );
		var playPauseButton = $( '<button/>' ).attr( 'id', 'LangtonsAntPlayPauseButton' ).text( 'Play' );
		var nextButton = $( '<button/>' ).attr( 'id', 'LangtonsAntNextButton' ).text( 'Next' );
		var resetButton = $( '<button/>' ).attr( 'id', 'LangtonsAntResetButton' ).text( 'Reset' );
		var zoomOutButton = $( '<button/>' ).attr( 'id', 'LangtonsAntZoomOutButton' ).text( 'Zoom out' );
		var zoomInButton = $( '<button/>' ).attr( 'id', 'LangtonsAntZoomInButton' ).text( 'Zoom in' );
		var generationCounter = $( '<span/>' ).attr( 'id', 'LangtonsAntGenerationCounter' ).text( 'Generation 0' );
		menu.append( playPauseButton )
			.append( nextButton )
			.append( resetButton )
			.append( zoomOutButton )
			.append( zoomInButton )
			.append( generationCounter );
		wrapper.html( canvas ).append( menu );

		// Set the variables that must wait for the DOM to be loaded
		this.board.setCanvas( document.getElementById( 'LangtonsAntCanvas' ) );
		this.board.setContext( this.board.canvas.getContext( '2d' ) );
		this.board.setWidth( 400 ); // Make this adjustable from the template?
		this.board.setHeight( 300 );

		// Bind events
		canvas.click( function ( event ) {
			//LangtonsAnt.mouse.click( event );
		});
		playPauseButton.click( function () {
			LangtonsAnt.game.playPause();
		});
		nextButton.click( function () {
			LangtonsAnt.game.next();
		});
		resetButton.click( function () {
			LangtonsAnt.game.reset();
		});
		zoomOutButton.click( function () {
			LangtonsAnt.board.zoomOut();
		});
		zoomInButton.click( function () {
			LangtonsAnt.board.zoomIn();
		});

		// Create the initial ant
		this.ant.x = Math.floor( this.board.xCells / 2 );
		this.ant.y = Math.floor( this.board.yCells / 2 );
		this.board.fillCell( this.ant.x, this.ant.y, this.ant.color );
	},

	menu: {

		setGeneration: function ( value ) {
			$( '#LangtonsAntGenerationCounter' ).text( 'Generation ' + value );
			return this;
		}
	},

	game: {

		speed: 100,

		generation: 0,

		playing: false,

		setGeneration: function ( value ) {
			this.generation = value;
			LangtonsAnt.menu.setGeneration( value );
			return this;
		},

		setSpeed: function ( value ) {
			this.speed = value;
			return this;
		},

		getGeneration: function () {
			return this.generation
		},

		getSpeed: function () {
			return this.speed
		},

		next: function () {
			var game = LangtonsAnt.game; //The game cannot be referred to as this, because of the way the setInterval function works
			var generation = game.getGeneration();
			generation++;
			game.setGeneration( generation );
			LangtonsAnt.ant.doRoutine();
			return this;
		},

		play: function () {
			if ( this.playing ) {
				return this; //If the game is already playing, exit
			}
			var interval = 1000 / this.speed;
			this.playing = setInterval( this.next, interval ); //The interval's id is stored in the playing property
			$( '#LangtonsAntPlayPauseButton' ).text( 'Pause' );
			return this;
		},

		pause: function () {
			clearInterval( this.playing );
			this.playing = false;
			$( '#LangtonsAntPlayPauseButton' ).text( 'Play' );
			return this;
		},

		playPause: function () {
			this.playing ? this.pause() : this.play();
			return this;
		},

		reset: function () {
			var ant = LangtonsAnt.ant;
			var board = LangtonsAnt.board;
			ant.x = Math.floor( board.xCells / 2 );
			ant.y = Math.floor( board.yCells / 2 );
			board.cells = [];
			board.clear();
			board.fillCell( ant.x, ant.y, ant.color );
			this.setGeneration( 0 );
			return this;
		}
	},

	mouse: {

		x: 0,

		y: 0,

		action: 'moveAnt',

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
			var board = LangtonsAnt.board;
			var x = Math.floor( ( event.pageX - board.canvas.parentElement.offsetLeft ) / board.cellSize );
			var y = Math.floor( ( event.pageY - board.canvas.parentElement.offsetTop ) / board.cellSize );
			this.setX( x );
			this.setY( y );
			this[ this.action ](); //Calls the function stored in 'action'
			return this;
		},

		moveAnt: function () {
			var ant = LangtonsAnt.ant;
			var board = LangtonsAnt.board;
			if ( ant.cell ) {
				board.fillCell( ant.cell.x, ant.cell.y, ant.cell.color );
			} else {
				board.clearCell( ant.x, ant.y );
			}
			ant.x = this.x;
			ant.y = this.y;
			board.fillCell( ant.x, ant.y, ant.color );
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

		color: 'black',

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
			for ( var i = 0; i < this.cells.length; i++ ) {
				this.fillCell( this.cells[ i ].x, this.cells[ i ].y, this.cells[ i ].color );
			}
			this.fillCell( LangtonsAnt.ant.x, LangtonsAnt.ant.y, LangtonsAnt.ant.color );
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

		createCell: function ( x, y, color ) {
			var cell = { 'x': x, 'y': y, 'color': color };
			this.cells.push( cell );
			this.fillCell( x, y, color );
			return this;
		},

		destroyCell: function ( x, y ) {
			var cell = this.getCell( x, y );
			var indexOfCell = this.cells.indexOf( cell );
			this.cells.splice( indexOfCell, 1 ); // Remove the cell from the array
			this.clearCell( x, y );
			return this;
		}
	},

	ant: {
		x: 0,

		y: 0,

		color: 'red',

		direction: 'N',

		speed: 1,

		cell: {},

		getCell: function () {
			return LangtonsAnt.board.getCell( this.x, this.y );
		},

		createCell: function ( color ) {
			LangtonsAnt.board.createCell( this.x, this.y, color );
			return this;
		},

		destroyCell: function () {
			LangtonsAnt.board.destroyCell( this.x, this.y );
			return this;
		},

		read: function () {
			this.cell = this.getCell();
			return this;
		},

		halt: function () {
			this.speed = 0;
			return this;
		},

		turnLeft: function () {
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
		},

		turnRight: function () {
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
		},

		move: function () {
			if ( this.direction === 'N' ) {
				this.y -= 1;
			}
			if ( this.direction === 'W' ) {
				this.x -= 1;
			}
			if ( this.direction === 'S' ) {
				this.y += 1;
			}
			if ( this.direction === 'E' ) {
				this.x += 1;
			}
			LangtonsAnt.board.fillCell( this.x, this.y, this.color );
			return this;
		},

		doRoutine: function() {
			this.read();
			if ( this.cell ) {
				this.turnRight().destroyCell();
			} else {
				this.turnLeft().createCell( 'white' );
			}
			this.move();
			return this;
		}
	}
});

LangtonsAnt.init();

}( mediaWiki, jQuery ) );
