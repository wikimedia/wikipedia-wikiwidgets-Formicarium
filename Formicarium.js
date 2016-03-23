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
			'move-button-tooltip': 'Board bewegen',
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
			'previous-generation-button': 'Previous generation',
			'previous-generation-button-tooltip': 'Previous generation',
			'play-button': 'Play',
			'play-button-tooltip': 'Play',
			'pause-button': 'Pause',
			'pause-button-tooltip': 'Pause',
			'next-generation-button': 'Next generation',
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
			'next-generation-button': 'Próxima generación',
			'next-generation-button-tooltip': 'Próxima generación',
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

		// Build the GUI and bind the events
		Formicarium.gui.buildAndBind();

		// Load the first ant and start
		Formicarium.game.reset();
		Formicarium.game.play();
	},

	/**
	 * Graphical User Interface
	 */
	gui: {
		buildAndBind: function () {
			var wikiwidget = $( '.WikiWidget[data-wikiwidget="Formicarium"]' ),
				container = $( '<div>' ).addClass( 'FormicariumContainer' ),
				canvas = $( '<canvas>' ).addClass( 'FormicariumCanvas' ),
				generationCounter = $( '<span>' ).addClass( 'FormicariumGenerationCounter' ).text( mw.message( 'generation-counter' ) + 0 ),
				cellCounter = $( '<span>' ).addClass( 'FormicariumCellCounter' ).text( mw.message( 'cell-counter' ) + 0 ),
				antCounter = $( '<span>' ).addClass( 'FormicariumAntCounter' ).text( mw.message( 'ant-counter' ) + 0 ),
				menu = $( '<div>' ).addClass( 'FormicariumMenu' );

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
				'src': '',
				'title': mw.message( 'reset-button-tooltip' ),
				'alt': mw.message( 'reset-button' )
			});
			var previousGenerationButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumPreviousGenerationButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/c/c3/WikiWidgetPreviousFrameButton.png',
				'title': mw.message( 'previous-generation-button-tooltip' ),
				'alt': mw.message( 'previous-generation-button' )
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
			var nextGenerationButton = $( '<img>' ).attr({
				'class': 'FormicariumButton FormicariumNextGenerationButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/b/bf/WikiWidgetNextFrameButton.png',
				'title': mw.message( 'next-generation-button-tooltip' ),
				'alt': mw.message( 'next-generation-button' )
			});

			// Put it all together
			menu.append( zoomInButton )
				.append( zoomOutButton )
				.append( gridButton )
				.append( resetButton )
				.append( previousGenerationButton )
				.append( playButton )
				.append( pauseButton )
				.append( nextGenerationButton )
			container.append( canvas )
				.append( menu )
				.append( generationCounter )
				.append( cellCounter )
				.append( antCounter );
			wikiwidget.append( container );

			// Set the variables that must wait for the DOM to be loaded
			Formicarium.board.setCanvas( canvas[0] );
			Formicarium.board.setWidth( 400 );
			Formicarium.board.setHeight( 300 );

			// Bind events
			canvas.mousedown( Formicarium.mouse.down ).mousemove( Formicarium.mouse.move ).mouseup( Formicarium.mouse.up );
			resetButton.click( Formicarium.game.reset );
			previousGenerationButton.click( Formicarium.game.previousGeneration );
			playButton.click( Formicarium.game.play );
			pauseButton.click( Formicarium.game.pause );
			nextGenerationButton.click( Formicarium.game.nextGeneration );
			zoomOutButton.click( Formicarium.board.zoomOut );
			zoomInButton.click( Formicarium.board.zoomIn );
			gridButton.click( Formicarium.board.toggleGrid );
		}
	},

	game: {

		generationCounter: 0,
		cellCounter: 0,
		antCounter: 0,

		playing: false,

		/* Setters */

		setGenerationCounter: function ( value ) {
			Formicarium.game.generationCounter = value;
			$( '.FormicariumGenerationCounter' ).text( mw.message( 'generation-counter' ) + value );
		},

		setCellCounter: function ( value ) {
			Formicarium.game.cellCounter = value;
			$( '.FormicariumCellCounter' ).text( mw.message( 'cell-counter' ) + value );
		},

		setAntCounter: function ( value ) {
			Formicarium.game.antCounter = value;
			$( '.FormicariumAntCounter' ).text( mw.message( 'ant-counter' ) + value );
		},

		/* Actions */

		previousGeneration: function () {
			Formicarium.board.oldCells = Formicarium.board.newCells.slice(); // Clone the array
			for ( var i in Formicarium.board.ants ) {
				Formicarium.board.ants[ i ].undoRoutine();
			}
			Formicarium.board.refill();
			Formicarium.game.setGenerationCounter( Formicarium.game.generationCounter - 1 );
		},

		nextGeneration: function () {
			Formicarium.board.oldCells = Formicarium.board.newCells.slice(); // Clone the array
			for ( var i in Formicarium.board.ants ) {
				Formicarium.board.ants[ i ].doRoutine();
			}
			Formicarium.board.refill();
			Formicarium.game.setGenerationCounter( Formicarium.game.generationCounter + 1 );
		},

		reset: function () {
			Formicarium.game.pause();
			Formicarium.game.setGenerationCounter( 0 );
			Formicarium.game.setCellCounter( 0 );
			Formicarium.game.setAntCounter( 0 );
			Formicarium.board.oldCells = [];
			Formicarium.board.newCells = [];
			Formicarium.board.ants = [];
			Formicarium.board.addAnt( 0, 0 );
			Formicarium.board.refill();
		},

		play: function () {
			if ( !Formicarium.game.playing ) {
				Formicarium.game.playing = setInterval( Formicarium.game.nextGeneration, 1 ); // The interval id is stored in the playing property
			}
			$( '.FormicariumPlayButton' ).hide();
			$( '.FormicariumPauseButton' ).show();
		},

		pause: function () {
			if ( Formicarium.game.playing ) {
				clearInterval( Formicarium.game.playing );
				Formicarium.game.playing = false;
			}
			$( '.FormicariumPlayButton' ).show();
			$( '.FormicariumPauseButton' ).hide();
		}
	},

	mouse: {
		/**
		 * The position relative to the origin of the coordinate system of the board (in cells, not pixels)
		 */
		newX: null,
		newY: null,
		oldX: null,
		oldY: null,

		state: null, // up or down

		/* Getters */

		getX: function ( event ) {
			var board = Formicarium.board,
				offsetX = event.pageX - $( event.target ).offset().left - 1, // The -1 is to correct a minor displacement
				newX = board.centerX - Math.floor( board.xCells / 2 ) + Math.floor( offsetX / board.cellSize );
			return newX;
		},

		getY: function ( event ) {
			var board = Formicarium.board,
				offsetY = event.pageY - $( event.target ).offset().top - 2, // The -2 is to correct a minor displacement
				newY = board.centerY - Math.floor( board.yCells / 2 ) + Math.floor( offsetY / board.cellSize );
			return newY;
		},

		/* Events */

		up: function ( event ) {
			Formicarium.mouse.state = 'up';
			Formicarium.mouse.oldX = Formicarium.mouse.newX;
			Formicarium.mouse.oldY = Formicarium.mouse.newY;
			Formicarium.mouse.newX = Formicarium.mouse.getX( event );
			Formicarium.mouse.newY = Formicarium.mouse.getY( event );

			// If click, not drag
			if ( Formicarium.mouse.newX === Formicarium.mouse.oldX && Formicarium.mouse.newY === Formicarium.mouse.oldY ) {

				var x = Formicarium.mouse.newX,
					y = Formicarium.mouse.newY,
					ant = Formicarium.board.getAnt( x, y );
				if ( ant ) {
					Formicarium.board.removeAnt( x, y );
				} else {
					Formicarium.board.addAnt( x, y );
				}
				Formicarium.board.refill();
			}
		},

		move: function ( event ) {
			Formicarium.mouse.oldX = Formicarium.mouse.newX;
			Formicarium.mouse.oldY = Formicarium.mouse.newY;
			Formicarium.mouse.newX = Formicarium.mouse.getX( event );
			Formicarium.mouse.newY = Formicarium.mouse.getY( event );

			// If drag, not click
			if ( Formicarium.mouse.state === 'down' && ( Formicarium.mouse.newX !== Formicarium.mouse.oldX || Formicarium.mouse.newY !== Formicarium.mouse.oldY ) ) {

				Formicarium.board.centerX += Formicarium.mouse.oldX - Formicarium.mouse.newX;
				Formicarium.board.centerY += Formicarium.mouse.oldY - Formicarium.mouse.newY;
				Formicarium.board.refill();

				// Bugfix: without the following, the board flickers when moving, not sure why
				Formicarium.mouse.newX = Formicarium.mouse.getX( event );
				Formicarium.mouse.newY = Formicarium.mouse.getY( event );
			}
		},

		down: function ( event ) {
			Formicarium.mouse.state = 'down';
			Formicarium.mouse.newX = Formicarium.mouse.getX( event );
			Formicarium.mouse.newY = Formicarium.mouse.getY( event );
		}
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
			Formicarium.board.grid = Formicarium.board.grid ? false : true;
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
			Formicarium.game.setCellCounter( this.newCells.length );
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
				Formicarium.game.setCellCounter( Formicarium.game.population + 1 );
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
				Formicarium.game.setCellCounter( Formicarium.game.population - 1 );
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
			Formicarium.game.setAntCounter( Formicarium.game.antCounter + 1 );
		},

		removeAnt: function ( x, y ) {
			var ant = this.getAnt( x, y ),
				index = this.ants.indexOf( ant );
			this.ants.splice( index, 1 );
			Formicarium.game.setAntCounter( Formicarium.game.antCounter - 1 );
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