"use strict";

var gl;
var points;


var theta = 0.0;
var thetaLoc;

var direction = 1;
var speed = 50;

function changeDir1(){
	direction *= -1;
}

window.onload = function init(){
	var canvas = document.getElementById( "animation-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	//加载着色器并初始化属性缓冲区 Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	
	//Four Vertices
	var vertices = [
		-0.8, -0.5, //3，长，高
		 0.8, -0.5,//4
		 0.8,  0.6, //2
		-0.8,  0.6, //1
		
		0.6,0.6,
		0.2,0.8,
		0.6,0.6,
		1.0,0.8,
	];
	
	//将数据载入图形处理器 Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	//将外部着色器变量与数据缓冲区相关联 Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	thetaLoc = gl.getUniformLocation( program, "theta" );
	/* 
	document.getElementById( "Speed" ).onchange = function( event ){
		speed = 100 - event.target.value;
	} */
	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	theta += direction * 0.1;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	else if( theta < -2 * Math.PI )
		theta += (2 * Math.PI);
	
	gl.uniform1f( thetaLoc, theta );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.LINES, 4, 2 );
	gl.drawArrays( gl.LINES, 6, 2 );
	
	
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
	setTimeout( function(){ requestAnimFrame( render ); }, speed );
}