"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		0.0,0.0,
		-0.5,-1.0,
		0.5,-1.0,
		
		-0.25,0.0,
		0.25,0.0,
		0.5,0.25,
		
		-0.25,0.0,
		0.5,0.25,
		0.5,0.7,
		
		-0.25,0.0,
		0.5,0.7,
		0.25,0.9,
		
		-0.25,0.0,
		0.25,0.9,
		-0.25,0.9,
		
		-0.25,0.0,
		-0.25,0.9,
		-0.5,0.7,
		
		-0.25,0.0,
		-0.5,0.7,
		-0.5,0.25,
		
		-0.25,0.9,
		-0.30,0.95,
		-0.25,1.0,
		
		-0.25,0.9,
		-0.25,1.0,
		-0.20,1.0,
		
		-0.25,0.9,
		-0.20,1.0,
		-0.20,0.9,
		
		-0.20,0.9,
		-0.15,0.95,
		-0.20,1.0,
		
		-0.55,0.55,
		-0.53,0.40,
		-0.50,0.55,
		
		-0.53,0.40,
		-0.50,0.55,
		-0.50,0.40,
		
		0.55,0.55,
		0.53,0.40,
		0.50,0.55,
		
		0.53,0.40,
		0.50,0.55,
		0.50,0.40,
		
		-0.15,0.0,
		-0.5,-1.0,
		0.0,0.0,
		
		0.15,0.0,
		0.5,-1.0,
		0.0,0.0
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var a_Position = gl.getAttribLocation( program, "a_Position" );
	gl.vertexAttribPointer( a_Position, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( a_Position );

	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 0, 51 );
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}