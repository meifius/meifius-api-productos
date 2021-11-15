const fs = require('fs');


module.exports = class Contenedor{
  constructor( nombreArchivo ){
    this.nombreArchivo = nombreArchivo;
    this.id = 0;
  }
  
  async save( objeto ){
    try{
      // TODO : No funciona si el archivo no existe.
      const objetosPrevios = await this.getAll( );
      const idAsignado = objetosPrevios.length || 0;
      const objetoNuevoAGuardar = {
        ...objeto,
        id: idAsignado,
      };
      const productosAGuardar = [ ...objetosPrevios, objetoNuevoAGuardar ];
      const ProductosAGuardarString = await JSON.stringify( productosAGuardar );
      await fs.promises.writeFile( this.nombreArchivo, ProductosAGuardarString );
      return idAsignado;
    } catch( error ){
      console.error( 'No se pudo guardar el archivo: ', error );
    }
  }

  async getById( id ){
    try{
      const contenido = await this.getAll( );
      const libro = contenido.find( libro => libro.id === id );
      return libro ? libro : null;
    }catch( error ){
      console.error( 'Error al obtener libro por ID.' )
    }
  }

  async getAll( ){
    try{
      let contenidoString = await fs.promises.readFile( this.nombreArchivo, 'utf-8' );
      contenidoString = contenidoString === '' ? '[]' : contenidoString; 
      return await JSON.parse( contenidoString );
    }catch( error ){
      console.error( 'Error al obtener todos los objetos' );
    }
  }

  async deleteById( id ){
    try{
      const productos = await this.getAll( );
      const productosFiltrados = productos.filter( producto => producto.id !== id );
      const productosFiltradosString = JSON.stringify( productosFiltrados );
      console.log( productosFiltrados);

      await fs.promises.writeFile( this.nombreArchivo, productosFiltradosString );
    }catch( error ){
      console.error( 'Error al borrar producto por ID.' );
    }
  }

  async deleteAll( ){
    try{
      await fs.promises.writeFile( this.nombreArchivo, '' );
    }catch( error ){
      console.error( 'No se pudo borrar correctamente el contenido del archivo.' );
    }
  }

}


// Ejecuacion del Programa
// ( async( ) => {
//   const contenedor = new Contenedor( 'productos.txt' );
  
//   // Guardado
//   // console.log( 'Guradar producto: ', await contenedor.save({
//   //   title: 'LORD',
//   //   price: 10,
//   //   thumbnail: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.eurogamer.es%2Farticles%2F2021-09-17-lord-of-the-rings-rise-to-war-nos-recuerda-su-lanzamiento-con-un-nuevo-trailer&psig=AOvVaw21bQJmHRj27tNiHjiTQ8pZ&ust=1636490165508000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCND_t4rPifQCFQAAAAAdAAAAABAD',
//   // }) );

//   // Obtener todos los productos
//   // console.log( 'Obtener todos los productos: ', await contenedor.getAll( ) );

//   // Buscar por ID
//   // console.log( 'Obtener prodcuto por ID: ', await contenedor.getById( 1 ) );

//   // Borrar todo el contenido del archivo
//   // await contenedor.deleteAll( );
//   // console.log( 'Obtener todos los productos: ', await contenedor.getAll( ) )
  
//   // Borrar archivo por ID
//   // await contenedor.deleteById( 0 );
//   // console.log( 'Obtener todos los productos despues del borrado: ', await contenedor.getAll( ) )
// })( );