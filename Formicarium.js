/**
 * Formicarium is a widget part of the WikiWidgets project.
 * It's meant to be embedded in Wikipedia articles about Langton's ant
 * to aid the understanding of the topic
 *
 * Written by Luis Felipe Schenone in 2015-2016
 *
 * Formicarium is available under the GNU General Public License (http://www.gnu.org/licenses/gpl.html)
 */
var Formicarium = {

	messages: {
		'de': {
			'ant-button': 'Ameise',
			'ant-button-tooltip': 'Ameise hinzufügen oder entfernen',
			'cell-button': 'Zelle',
			'cell-button-tooltip': 'Zelle hinzufügen oder entfernen',
			'move-button': 'Bewegen',
			'move-button-tooltip': 'board bewegen',
			'zoom-in-button': 'Einzoomen',
			'zoom-in-button-tooltip': 'Einzoomen',
			'zoom-out-button': 'Auszoomen',
			'zoom-out-button-tooltip': 'Auszoomen',
			'grid-button': 'Raster',
			'grid-button-tooltip': 'Raster',
			'reset-button': 'Zurücksetzen',
			'reset-button-tooltip': 'Zurücksetzen',
			'previous-generation-button': 'Zurück',
			'previous-generation-button-tooltip': 'Vorherige Generation',
			'play-button': 'Abspielen',
			'play-button-tooltip': 'Abspielen',
			'pause-button': 'Pause',
			'pause-button-tooltip': 'Pause', 
			'next-generation-button': 'Weiter',
			'next-generation-button-tooltip': 'Nächste Generation',
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
			'previous-generation-button': 'Previous',
			'previous-generation-button-tooltip': 'Previous generation',
			'play-button': 'Play',
			'play-button-tooltip': 'Play',
			'pause-button': 'Pause',
			'pause-button-tooltip': 'Pause',
			'next-generation-button': 'Next',
			'next-generation-button-tooltip': 'Next generation',
			'generation-counter': 'Generation ',
			'cell-counter': 'Cells ',
			'ant-counter': 'Ants ',
		},
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
			'previous-generation-button': 'Anterior',
			'previous-generation-button-tooltip': 'Generación anterior',
			'play-button': 'Reproducir',
			'play-button-tooltip': 'Reproducir',
			'pause-button': 'Pausar',
			'pause-button-tooltip': 'Pausar',
			'next-generation-button': 'Siguiente',
			'next-generation-button-tooltip': 'Generación siguiente',
			'generation-counter': 'Generación ',
			'cell-counter': 'Celdas ',
			'ant-counter': 'Hormigas ',
		},
		'fr': {
			'ant-button': 'Fourmi',
			'ant-button-tooltip': 'Ajouter ou enlever des fourmis',
			'cell-button': 'Cellule',
			'cell-button-tooltip': 'Ajouter ou enlever des cellules',
			'move-button': 'Déplacer',
			'move-button-tooltip': 'Déplacer la carte',
			'zoom-in-button': 'Se rapprocher',
			'zoom-in-button-tooltip': 'Se rapprocher',
			'zoom-out-button': "S'éloigner",
			'zoom-out-button-tooltip': "S'éloigner",
			'grid-button': 'Grille',
			'grid-button-tooltip': 'Grille',
			'reset-button': 'Recommencer',
			'reset-button-tooltip': 'Recommencer',
			'previous-generation-button': 'Anterieur',
			'previous-generation-button-tooltip': 'Génération anterieure',
			'play-button': 'Reproduire',
			'play-button-tooltip': 'Reproduire',
			'pause-button': 'Mettre sur pause',
			'pause-button-tooltip': 'Mettre sur pause',
			'next-generation-button': 'Suivant',
			'next-generation-button-tooltip': 'Generation suivante',
		},
		'it': {
			'ant-button': 'Formica',
			'ant-button-tooltip': 'Aggiungere o rimuovere le formiche',
			'cell-button': 'Cellula',
			'cell-button-tooltip': 'Aggiungere o rimuovere le cellule',
			'move-button': 'Spostare',
			'move-button-tooltip': "Spostare l'asse",
			'zoom-in-button': 'Ingrandire',
			'zoom-in-button-tooltip': 'Ingrandire',
			'zoom-out-button': 'Rimpicciolire',
			'zoom-out-button-tooltip': 'Rimpicciolire',
			'grid-button': 'Griglia',
			'grid-button-tooltip': 'Griglia',
			'reset-button': 'Reset',
			'reset-button-tooltip': 'Reset',
			'previous-generation-button': 'Precedente',
			'previous-generation-button-tooltip': 'Generazione precedente',
			'play-button': 'Giocare',
			'play-button-tooltip': 'Giocare',
			'pause-button': 'Pausa',
			'pause-button-tooltip': 'Pausa',
			'next-generation-button': 'Il prossimo',
			'next-generation-button-tooltip': 'Generazione successiva',
		},
		'pl': {
			'ant-button': 'Mrówka',
			'ant-button-tooltip': 'Dodaj lub odejmij mrówki',
			'cell-button': 'Komórka',
			'cell-button-tooltip': 'Dodaj lub odejmij komórki',
			'move-button': 'Przejdź dalej',
			'move-button-tooltip': "Przestaw planszę",
			'zoom-in-button': 'Przybliż',
			'zoom-in-button-tooltip': 'Przybliż',
			'zoom-out-button': 'Oddal',
			'zoom-out-button-tooltip': 'Oddal',
			'grid-button': 'Siatka',
			'grid-button-tooltip': 'Siatka',
			'reset-button': 'Reset',
			'reset-button-tooltip': 'Reset',
			'previous-generation-button': 'Poprzedni',
			'previous-generation-button-tooltip': 'Poprzednie pokolenie',
			'play-button': 'Odtwórz',
			'play-button-tooltip': 'Odtwórz',
			'pause-button': 'Zatrzymaj',
			'pause-button-tooltip': 'Zatrzymaj',
			'next-generation-button': 'Dalej',
			'next-generation-button-tooltip': 'Następne pokolenie',
		},
	},

	/**
	 * Initialisation script
	 */
	init: function () {
		// Set the interface language
		var lang = mw.config.get( 'wgUserLanguage' );
		if ( ! ( lang in Formicarium.messages ) ) {
			lang = 'en'; // Fallback to English
		}
		mw.messages.set( Formicarium.messages[ lang ] );

		$( '.WikiWidget[data-wikiwidget="Formicarium"]' ).each( function () {
			var gui = new Formicarium.GUI( this ),
				board = new Formicarium.Board( gui ),
				game = new Formicarium.Game( board ),
				mouse = new Formicarium.Mouse( board );
				touch = new Formicarium.Touch( board );

			gui.bindEvents( board, game, mouse, touch );

			board.init();

			if ( $( this ).data( 'autoplay' ) ) {
				game.play();
			}
		});
	},

	/**
	 * Graphical User Interface
	 */
	GUI: function ( wrapper ) {

		this.wrapper = $( wrapper );

		this.container = $( '<div>' ).addClass( 'FormicariumContainer' );

		this.canvas = $( '<canvas>' ).addClass( 'FormicariumCanvas' );

		this.generationCounter = $( '<span>' ).addClass( 'FormicariumCounter FormicariumGenerationCounter' ).text( mw.message( 'generation-counter' ) + 0 );

		this.cellCounter = $( '<span>' ).addClass( 'FormicariumCounter FormicariumCellCounter' ).text( mw.message( 'cell-counter' ) + 0 );

		this.antCounter = $( '<span>' ).addClass( 'FormicariumCounter FormicariumAntCounter' ).text( mw.message( 'ant-counter' ) + 0 );

		this.menu = $( '<div>' ).addClass( 'FormicariumMenu' );

		this.zoomInButton = $( '<img>' ).attr({
			'class': 'FormicariumButton FormicariumZoomInButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/2/2e/WikiWidgetZoomInButton.png',
			'title': mw.message( 'zoom-in-button-tooltip' ),
			'alt': mw.message( 'zoom-in-button' )
		});

		this.zoomOutButton = $( '<img>' ).attr({
			'class': 'FormicariumButton FormicariumZoomOutButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/6/63/WikiWidgetZoomOutButton.png',
			'title': mw.message( 'zoom-out-button-tooltip' ),
			'alt': mw.message( 'zoom-out-button' )
		});

		this.gridButton = $( '<img>' ).attr({
			'class': 'FormicariumButton FormicariumGridButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/a/a9/WikiWidgetGridButton.png',
			'title': mw.message( 'grid-button-tooltip' ),
			'alt': mw.message( 'grid-button' )
		});

		this.resetButton = $( '<img>' ).attr({
			'class': 'FormicariumButton FormicariumResetButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/0/0e/WikiWidgetResetButton.png',
			'title': mw.message( 'reset-button-tooltip' ),
			'alt': mw.message( 'reset-button' )
		});

		this.previousGenerationButton = $( '<img>' ).attr({
			'class': 'FormicariumButton FormicariumPreviousGenerationButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/c/c3/WikiWidgetPreviousFrameButton.png',
			'title': mw.message( 'previous-generation-button-tooltip' ),
			'alt': mw.message( 'previous-generation-button' )
		});

		this.playButton = $( '<img>' ).attr({
			'class': 'FormicariumButton FormicariumPlayButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/b/b8/WikiWidgetPlayButton.png',
			'title': mw.message( 'play-button-tooltip' ),
			'alt': mw.message( 'play-button' )
		});

		this.pauseButton = $( '<img>' ).attr({
			'class': 'FormicariumButton FormicariumPauseButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/6/6e/WikiWidgetPauseButton.png',
			'title': mw.message( 'pause-button-tooltip' ),
			'alt': mw.message( 'pause-button' )
		}).hide(); // The pause button starts hidden

		this.nextGenerationButton = $( '<img>' ).attr({
			'class': 'FormicariumButton FormicariumNextGenerationButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/b/bf/WikiWidgetNextFrameButton.png',
			'title': mw.message( 'next-generation-button-tooltip' ),
			'alt': mw.message( 'next-generation-button' )
		});

		// Put it all together
		this.menu.append(
			this.zoomInButton,
			this.zoomOutButton,
			this.gridButton,
			this.resetButton,
			this.previousGenerationButton,
			this.playButton,
			this.pauseButton,
			this.nextGenerationButton
		);
		this.container.append(
			this.canvas,
			this.menu,
			this.generationCounter,
			this.cellCounter,
			this.antCounter
		);
		this.wrapper.html( this.container );

		this.bindEvents = function ( board, game, mouse, touch ) {

			// Board events
			this.zoomOutButton.click( function () { board.zoomOut(); } );
			this.zoomInButton.click( function () { board.zoomIn(); } );
			this.gridButton.click( function () { board.toggleGrid(); } );

			// Game events
			this.resetButton.click( function () { game.reset(); } );
			this.previousGenerationButton.click( function () { game.previousGeneration(); } );
			this.playButton.click( function () { game.play(); } );
			this.pauseButton.click( function () { game.pause(); } );
			this.nextGenerationButton.click( function () { game.nextGeneration(); } );

			// Mouse events
			this.canvas.mousedown( function ( event ) { mouse.down( event ) } );
			this.canvas.mousemove( function ( event ) { mouse.move( event ) } );
			this.canvas.mouseup( function ( event ) { mouse.up( event ) } );

			// Touch events
			this.canvas.bind( 'touchstart', function ( event ) { touch.start( event ) } );
			this.canvas.bind( 'touchmove', function ( event ) { touch.move( event ) } );
			this.canvas.bind( 'touchend', function ( event ) { touch.end( event ) } );
		};
	},

	Board: function ( gui ) {

		this.gui = gui;

		this.canvas = this.gui.canvas[0];
		this.context = this.canvas.getContext( '2d' );

		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.centerX = 0;
		this.centerY = 0;

		this.cellSize = 4;

		this.xCells = Math.floor( this.width / this.cellSize );
		this.yCells = Math.floor( this.height / this.cellSize );

		this.grid = false;

		this.cellCounter = 0;
		this.antCounter = 0;

		this.oldCells = [];
		this.cells = [];
		this.ants = [];

		/**
		 * Constructor
		 */
		this.init = function () {
			this.oldCells = [];
			this.cells = [];
			this.ants = [];
			this.centerX = 0;
			this.centerY = 0;
			this.setCellCounter( 0 );
			this.setAntCounter( 0 );

			var wrapper = this.gui.wrapper,
				width = wrapper.data( 'width' ),
				height = wrapper.data( 'height' ),
				cells = wrapper.data( 'cells' ),
				ants = wrapper.data( 'ants' ),
				zoom = wrapper.data( 'zoom' ),
				grid = wrapper.data( 'grid' );

			if ( width ) {
				this.setWidth( width );
			}

			if ( height ) {
				this.setHeight( height );
			}

			if ( cells ) {
				cells = cells.replace( /\s/g, '' ).split( ';' );
				for ( var i in cells ) {
					coords = cells[ i ].split( ',' );
					x = coords[0];
					y = coords[1];
					this.addCell( x, y );
				}
			}

			if ( ants ) {
				ants = ants.replace( /\s/g, '' ).split( ';' );
				for ( var i in ants ) {
					coords = ants[ i ].split( ',' );
					x = coords[0];
					y = coords[1];
					this.addAnt( x, y );
				}
			}

			if ( zoom ) {
				this.setCellSize( zoom );
			}

			if ( grid ) {
				this.grid = true;
			}

			this.refill();
		};

		/* Getters */

		this.getXcells = function () {
			return Math.floor( this.width / this.cellSize );
		};

		this.getYcells = function () {
			return Math.floor( this.height / this.cellSize );
		};

		this.getCell = function ( x, y ) {
			var i, cell;
			for ( i in this.cells ) {
				cell = this.cells[ i ];
				if ( cell.x === x && cell.y === y ) {
					return cell;
				}
			}
			return null;
		};

		this.getOldCell = function ( x, y ) {
			var i, cell;
			for ( i in this.oldCells ) {
				cell = this.oldCells[ i ];
				if ( cell.x === x && cell.y === y ) {
					return cell;
				}
			}
			return null;
		};

		this.getAnt = function ( x, y ) {
			var i, ant;
			for ( i in this.ants ) {
				ant = this.ants[ i ];
				if ( ant.x === x && ant.y === y ) {
					return ant;
				}
			}
			return null;
		};

		/* Setters */

		this.setCellCounter = function ( value ) {
			this.cellCounter = value;
			this.gui.cellCounter.text( mw.message( 'cell-counter' ) + value );
		};

		this.setAntCounter = function ( value ) {
			this.antCounter = value;
			this.gui.antCounter.text( mw.message( 'ant-counter' ) + value );
		};

		this.setWidth = function ( value ) {
			this.width = parseInt( value );
			this.canvas.setAttribute( 'width', value );
			this.xCells = this.getXcells();
		};

		this.setHeight = function ( value ) {
			this.height = parseInt( value );
			this.canvas.setAttribute( 'height', value );
			this.yCells = this.getYcells();
		};

		this.setCellSize = function ( value ) {
			this.cellSize = parseInt( value );
			this.xCells = this.getXcells();
			this.yCells = this.getYcells();
		};

		/* Actions */

		this.zoomIn = function () {
			if ( this.cellSize === 32 ) {
				return;
			}
			this.setCellSize( this.cellSize * 2 );
			this.refill();
		};

		this.zoomOut = function () {
			if ( this.cellSize === 1 ) {
				return;
			}
			this.setCellSize( this.cellSize / 2 );
			this.refill();
		};

		this.toggleGrid = function () {
			this.grid = this.grid ? false : true;
			this.refill();
		};

		this.drawGrid = function () {
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
		};

		this.fill = function () {
			var i, cell, ant;
			for ( i in this.cells ) {
				cell = this.cells[ i ];
				this.fillCell( cell.x, cell.y, cell.color );
			}
			for ( i in this.ants ) {
				ant = this.ants[ i ];
				this.fillCell( ant.x, ant.y, ant.color );
			}
			if ( this.grid ) {
				this.drawGrid();
			}
		};

		this.clear = function () {
			this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		};

		this.refill = function () {
			this.clear();
			this.fill();
		};

		this.fillCell = function ( x, y, color ) {
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
		};

		this.addCell = function ( x, y, color ) {
			var x = parseInt( x ),
				y = parseInt( y ),
				cell = this.getCell( x, y ),
				index = this.cells.indexOf( cell );
			if ( index === -1 ) {
				var color = color ? color : 'white';
				this.fillCell( x, y, color );
				this.cells.push({ 'x': x, 'y': y, 'color': color });
				this.setCellCounter( this.cellCounter + 1 );
			}
		};

		this.addOldCell = function ( x, y, color ) {
			var cell = this.getOldCell( x, y );
				index = this.oldCells.indexOf( cell );
			if ( index === -1 ) {
				var color = color ? color : 'white';
				this.fillCell( x, y, color );
				this.oldCells.push({ 'x': x, 'y': y, 'color': color });
			}
		};

		this.removeCell = function ( x, y ) {
			var cell = this.getCell( x, y ),
				index = this.cells.indexOf( cell );
			if ( index > -1 ) {
				this.cells.splice( index, 1 );
				this.setCellCounter( this.cellCounter - 1 );
			}
		};

		this.removeOldCell = function ( x, y ) {
			var cell = this.getOldCell( x, y ),
				index = this.oldCells.indexOf( cell );
			if ( index > -1 ) {
				this.oldCells.splice( index, 1 );
			}
		};

		this.addAnt = function ( x, y ) {
			var x = parseInt( x ),
				y = parseInt( y ),
				ant = new Formicarium.Ant( this, x, y );
			this.ants.push( ant );
			this.setAntCounter( this.antCounter + 1 );
		};

		this.removeAnt = function ( x, y ) {
			var x = parseInt( x ),
				y = parseInt( y ),
				ant = this.getAnt( x, y ),
				index = this.ants.indexOf( ant );
			this.ants.splice( index, 1 );
			this.setAntCounter( this.antCounter - 1 );
		};
	},

	Game: function ( board ) {

		this.board = board;

		this.playing = false;

		this.generationCounter = 0;

		/* Setters */

		this.setGenerationCounter = function ( value ) {
			this.generationCounter = value;
			this.board.gui.generationCounter.text( mw.message( 'generation-counter' ) + value );
		};

		/* Actions */

		this.previousGeneration = function () {
			this.board.oldCells = this.board.cells.slice(); // Clone the array
			for ( var i in this.board.ants ) {
				this.board.ants[ i ].undoRoutine();
			}
			this.board.refill();
			this.setGenerationCounter( this.generationCounter - 1 );
		};

		this.nextGeneration = function () {
			this.board.oldCells = this.board.cells.slice(); // Clone the array
			for ( var i in this.board.ants ) {
				this.board.ants[ i ].doRoutine();
			}
			this.board.refill();
			this.setGenerationCounter( this.generationCounter + 1 );
		};

		this.reset = function () {
			// Reset the board
			this.board.init();

			// Reset the game
			this.pause();
			this.setGenerationCounter( 0 );
		};

		this.play = function () {
			if ( this.playing ) {
				return; // The game is already playing
			}
			var game = this;
			this.playing = setInterval( function () { game.nextGeneration(); }, 1 ); // The interval id is stored in the playing property
			this.board.gui.playButton.hide();
			this.board.gui.pauseButton.show();
		};

		this.pause = function () {
			if ( !this.playing ) {
				return; // The game is already paused
			}
			clearInterval( this.playing );
			this.playing = false;
			this.board.gui.playButton.show();
			this.board.gui.pauseButton.hide();
		};
	},

	Mouse: function ( board ) {

		this.board = board;

		/**
		 * The position relative to the origin of the coordinate system of the board (in cells, not pixels)
		 */
		this.oldX = null;
		this.oldY = null;
		this.newX = null;
		this.newY = null;

		this.state = null; // up or down
		this.dragged = false;

		/* Getters */

		this.getX = function ( event ) {
			var offsetX = event.pageX - $( event.target ).offset().left - 1, // The -1 is to correct a minor displacement
				newX = this.board.centerX - Math.floor( this.board.xCells / 2 ) + Math.floor( offsetX / this.board.cellSize );
			return newX;
		};

		this.getY = function ( event ) {
			var offsetY = event.pageY - $( event.target ).offset().top - 2, // The -2 is to correct a minor displacement
				newY = this.board.centerY - Math.floor( this.board.yCells / 2 ) + Math.floor( offsetY / this.board.cellSize );
			return newY;
		};

		/* Event handlers */

		this.up = function ( event ) {
			this.state = 'up';

			if ( !this.dragged ) {
				var x = this.newX,
					y = this.newY,
					ant = this.board.getAnt( x, y );
				if ( ant ) {
					this.board.removeAnt( x, y );
				} else {
					this.board.addAnt( x, y );
				}
				this.board.refill();
			}
			this.dragged = false;
		};

		this.move = function ( event ) {
			if ( this.state === 'down' ) {

				this.oldX = this.newX;
				this.oldY = this.newY;
				this.newX = this.getX( event );
				this.newY = this.getY( event );

				if ( this.newX !== this.oldX || this.newY !== this.oldY ) {

					this.dragged = true;

					this.board.centerX += this.oldX - this.newX;
					this.board.centerY += this.oldY - this.newY;
					this.board.refill();

					// Bugfix: without the following, the board flickers when moving, not sure why
					this.newX = this.getX( event );
					this.newY = this.getY( event );
				}
			}
		};

		this.down = function ( event ) {
			this.state = 'down';
			this.newX = this.getX( event );
			this.newY = this.getY( event );
		};
	},

	Touch: function ( board ) {

		this.board = board;

		// The distance from the origin of the coordinate system in virtual pixels (not real ones)
		this.newX = null;
		this.newX = null;
		this.oldX = null;
		this.oldY = null;

		this.moved = false;

		/**
		 * Getters
		 */
		this.getX = function ( event ) {
			var offsetX = event.originalEvent.changedTouches[0].pageX - $( event.target ).offset().left,
				newX = this.board.centerX - Math.floor( this.board.xCells / 2 ) + Math.floor( offsetX / this.board.cellSize );
			return newX;
		};

		this.getY = function ( event ) {
			var offsetY = event.originalEvent.changedTouches[0].pageY - $( event.target ).offset().top,
				newY = this.board.centerY - Math.floor( this.board.yCells / 2 ) + Math.floor( offsetY / this.board.cellSize );
			return newY;
		};

		/**
		 * Event handlers
		 */
		this.start = function ( event ) {
			this.newX = this.getX( event );
			this.newY = this.getY( event );
		};

		this.move = function ( event ) {
			this.oldX = this.newX;
			this.oldY = this.newY;
			this.newX = this.getX( event );
			this.newY = this.getY( event );

			this.board.centerX += this.oldX - this.newX;
			this.board.centerY += this.oldY - this.newY;
			this.board.refill();

			// Bugfix: without the following, the board flickers when moving, not sure why
			this.newX = this.getX( event );
			this.newY = this.getY( event );

			this.moved = true;

			event.preventDefault();
		};

		this.end = function ( event ) {
			this.moved = false;
		};
	},

	Ant: function ( board, x, y, color, direction ) {

		this.board = board;

		this.x = x ? x : 0;

		this.y = y ? y : 0;

		this.color = color ? color : 'red';

		this.direction = direction ? direction : 'N';

		this.getCell = function () {
			return this.board.getCell( this.x, this.y );
		};

		this.getOldCell = function () {
			return this.board.getOldCell( this.x, this.y );
		};

		this.addCell = function ( color ) {
			this.board.addCell( this.x, this.y, color );
			return this;
		};

		this.removeCell = function () {
			this.board.removeCell( this.x, this.y );
			return this;
		};

		this.addOldCell = function ( color ) {
			this.board.addOldCell( this.x, this.y, color );
			return this;
		};

		this.removeOldCell = function () {
			this.board.removeOldCell( this.x, this.y );
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
				this.removeCell().turnRight();
			} else {
				this.addCell().turnLeft();
			}
			this.moveForward();
		};

		this.undoRoutine = function () {
			this.moveBack();
			var cell = this.getOldCell();
			if ( cell ) {
				this.removeCell().turnRight();
			} else {
				this.addCell().turnLeft();
			}
		};
	}
}

$( Formicarium.init );