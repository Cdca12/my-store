// Creamos función que nos hará llegar a un middleware de tipo error:
function logErrors(err, req, res, next) {
  // Mostrar el error en servidor para poder monitorearlo
  console.error(err);
  // Importante para saber que se esta enviando a un middleware de tipo error,
  // si no tiene el error dentro entonces se esta mandando a uno normal
  next(err);
}

// Crear formato para devolverlo al cliente que se complementa con la función anterior:
// Aun no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
function errorHandler(err, req, res, next) {
  // Indicar que el error es estatus 500 Internal Server Error
  res.status(500).json({
    // Mostrar al cliente el mensaje de error y donde ocurrió
    message: err.message,
    stack: err.stack
  });
}

// Exportarlo como modulo
module.exports = { logErrors, errorHandler };
