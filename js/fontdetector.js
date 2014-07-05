/**
 *	Canvas Font Detector
 * 
 *	Uses the fillText method of canvas elements to detect installed fonts. 
 *
 *	Usage:
 *		// Normal startup
 *		fontdetector.run();
 *
 *		// Test only font Impact
 *		fontdetector.run(['Impact'])
 * 
 *
 */
fontdetector = (function() {

	var defaultfonts = [
		'Droid Sans',
		'cursive',
		'Arial',
		'Arial Black',
		'Arial Narrow',
		'Arial Rounded MT Bold',
		'Bookman Old Style',
		'Bradley Hand ITC',
		'Century',
		'Century Gothic',
		'Comic Sans MS',
		'Courier',
		'Courier New',
		'Georgia',
		'Gentium',
		'Impact',
		'Lucida Console',
		'Monotype Corsiva',
		'Times',
		'Times New Roman',
		'Verdana',
		];

	var w = 100,
		h = 20,
		testresult = false,
		testcanvas = {};

	/**
	 * Runs the font checks
	 * @param  {array} fonts  (Optional) list of fonts - overwrites the default fonts
	 * @return {object}       Object with font list and results
	 */
	this.run = function(fonts) {
		var fonts = fonts || defaultfonts;

		var nofont_pixel = getFontImage('NotAInstalledFont');
		var results = {};

		for(var f = 0; f < fonts.length; f++) {
			testcanvas = getFontImage(fonts[f]);
			testresult = compareImages(testcanvas, nofont_pixel);
			results[fonts[f]] = testresult;
		}

		return results;
	}

	/**
	* Internal function to render the font image
	* @param  {string} font The font to render
	* @return {Uint8ClampedArray}  Imagedata
	*/
	function getFontImage(font) {
		var canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		var ctx = canvas.getContext('2d');
		var pixel = {};

		ctx.font = "20pt "+font; // Falls back to serif
		ctx.fillText("_.ABCDEFabcdef", 0, 20);
		pixel = ctx.getImageData(0, 0, w, h);

		return pixel.data;
	}

	/**
	* Internal function to compare image data
	* @param  {Uint8ClampedArray} source [description]
	* @param  {Uint8ClampedArray} target [description]
	* @return {bool}  Returns true if the images are different
	*/
	function compareImages(source,target) {
		for(var s = 0; s < source.length; s++) {
			if(source[s]!==target[s]) {
				return true;
			}
		}
		return false;
	}

	return this;
}).call({});