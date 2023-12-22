
************************************* APP FOUR GREEN *******************************************************

App en Versel  https://four-green-p9ha6v7dw-eugeniomatiasbrave.vercel.app/

**** LOGIN ****** 
     * Menu: segun perfil. Menu dinamico......................................................OK

**** LOGOUT *****
**** API REST ***
    * usuarios.rest
	* productos.rest   
	* clientes.rest
    * Pedidos.rest.....
    * Pedidos_estado.rest
                
**** LIBRERIA CSS ************
    * Libreria CSS: Flowbite svelte

  
************** CRUD: *****************

     
***** TABLA DE PRODUCTOS:  (cerrar todo productos) ********************************************
       * /productos : 
            - Responsive.....................................................................Ok
            * GET captura para tabala........................................................OK
            * PATCH y DELETE desde /productos/[producto_id] .................................ok
            * POST productos desde otra pagina /productos/[0]/agregar .......................ok
            * Filtrar x nombre   ............................................................ok
            * Ordenar por click en cabecera de columna:
                   * precio..................................................................ok
                   * Nombre..................................................................ok
                   * id (inicia ordenado por Id).............................................ok
                     
            * Alert si la respuesta es 200...................................................ok      
            * Alert en input en caso de excistir el producto Nombre desde Api rest...........ok
            * Alert si la peticion no es 200.................................................ok

 
GET {{baseUrl}}/productos 
GET {{baseUrl}}/productos?sort=precio:-1    
GET {{baseUrl}}/productos?search=ELO  
GET {{baseUrl}}/productos?search=ELO&sort=precio:-1 
GET {{baseUrl}}/productos?offset=5&limit=5&sort=producto_id:1     
GET {{baseUrl}}/productos/10
POST {{baseUrl}}/productos 
PATCH {{baseUrl}}/productos/110
DELETE {{baseUrl}}/productos/104 

      
**************************** TABLA DE CLIENTES:************************************************
       
          * /clientes :
           * Responsive.....................................................................ok
           * GET............................................................................ok
           * ADD clientes ..................................................................ok
           * EDIT clientes .................................................................ok
           * DELETE clientes ...............................................................ok
           * Ordenar por click en cabecera de columna:
                  * Nombre..................................................................ok ?? Adrian. Cree un endpoint se puede?
           * Filtrar clientes x nombre......................................................ok

  
GET {{baseUrl}}/clientes  // Recupera todos los productos
GET {{baseUrl}}/clientes?limit=5&offset=2  recupera todos los productos con la opción limit y offset
GET {{baseUrl}}/clientes/1  // recuperda los datos de un producto en particular con su :id en el path
POST {{baseUrl}}/clientes  // para dar de alta un producto, en el boy va el json y devuelve los datos enviados más el id del producto
PATCH {{baseUrl}}/clientes/2  // para actualizar nombre y/o precio del producto, va el :id en el path y los campos en el body
DELETE {{baseUrl}}/clientes/3 //para eliminar un producto, va el :id en el path
GET {{baseUrl}}/clientes?sort=razon_social:-1 HTTP/1.1.......euge
GET {{baseUrl}}/clientes?search=ELO HTTP/1.1 ................euge
    

**************************** TABLA DE PEDIDOS:************************************************
            
    * Tabla de Gestion de Pedidos:
           * Responsive..................................................................... 
           * Detalle de pedido.............................................................ok
           * Agregar pedidos...............................................................ok
                Nota:Una Cabecera (hasta cliente) y detalle (a partir de Producto). 
           * Mas de un item por pedido.....................................................ok 
           * Editar (modifica pedido en detalle):.......................................... 
           * Eliminar pedido (modifica pedido en detalle):.................................
           * Estado de Pedido.............................................................. 
           * Filtrar pedidos x nombre ..................................................... 
           * Ordenar por click en cabecera de columna......................................?

**** Api pedidos *****
GET {{baseUrl}}/pedidos 
GET {{baseUrl}}/pedidos?limit=2 //recup. todos los estados de los ped. con la opción limit y offset para realizar paginado 
                                   (en princ por la cant. de items no hace falta)
GET {{baseUrl}}/pedidos/38/detalle // Recupera el detalle del pedidos id
POST {{baseUrl}}/pedidos  

**** Api estados pedido ******* 

GET {{baseUrl}}/pedidos_estado HTTP/1.1 // Recupera todos los estados de los pedidos
GET {{baseUrl}}/pedidos_estado?limit=5&offset=2  // recupera todos los estados de los pedidos con la opción limit y offset para realizar paginado (en principio por la cantidad de items no hace falta)
GET {{baseUrl}}/pedidos_estado/20  // recuperda los datos de un estado de pedido en particular con su :id en el path


 *******************************************************************************************************  
  



**** LOGO: ****
    *Colores de marca:



****16/11/23*********
1) Ver diseño que sea responsive
*  1.b - ver si vale la pena agregar una libreria UI  ...si
2) agregar o editar un registro en una página distinta (más allá de que sea modal)
3) Filtrar por nombre (Adrián me debe documentación)
4) Ordenar por click en cabecera de columna precio, nombre y id (Adrián me debe documentación)
******************




