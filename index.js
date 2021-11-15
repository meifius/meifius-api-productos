// IMPORTS
const express = require( 'express' );

const Contenedor = require( './MejiaAlan' );

// INICIALIZACIONES
const app = express( );
const PORT = 8080;

// Routes
app.get( '/productos', async( req, res ) =>  {
  const contenedor = new Contenedor( 'productos.txt' );
  const productos = await contenedor.getAll( );
  res.json( productos );
});

app.get( '/productoRandom', async( req, res ) => {
  const contenedor = new Contenedor( 'productos.txt' );
  const productos = await contenedor.getAll( );
  let productoRandom = productos[ Math.floor( Math.random( ) * productos.length ) ];
  res.json( productoRandom );
});

app.listen( PORT, ( ) => {
  console.log( `Server listening on PORT: ${ PORT }` );
});