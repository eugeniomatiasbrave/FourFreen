
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
            - GET............................................................................OK
            * ADD productos desde otra pagina /productos/add_productos ......................ok
            * EDIT productos desde otra pagina /productos/add_productos .....................ok
            * DELETE productos desde otra pagina /productos/add_productos ...................ok
            * Filtrar x nombre   ............................................................ok
            * Sume x nombre&precio........................................................... ?
            * Ordenar por click en cabecera de columna:
                   * precio..................................................................ok
                   * Nombre..................................................................ok
                   * id .....................................................................ok
            * Paginacion ?...................................................................       
 
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
           * Filtrar clientes x nombre......................................................

  
GET {{baseUrl}}/clientes  // Recupera todos los productos
GET {{baseUrl}}/clientes?limit=5&offset=2  recupera todos los productos con la opción limit y offset
GET {{baseUrl}}/clientes/1  // recuperda los datos de un producto en particular con su :id en el path
POST {{baseUrl}}/clientes  // para dar de alta un producto, en el boy va el json y devuelve los datos enviados más el id del producto
PATCH {{baseUrl}}/clientes/2  // para actualizar nombre y/o precio del producto, va el :id en el path y los campos en el body
DELETE {{baseUrl}}/clientes/3 //para eliminar un producto, va el :id en el path
    


*********************************************************************************************

            
    * Tabla de Gestion de Pedidos: 
            - Accones: 
                 - Add pedidos:
                      Nota:Una Cabecera (hasta cliente) y detalle (a partir de Producto). 
                      * Mas de un item por pedido 
                 - Edita (modifica pedido en detalle):.....a espera de Api  
             - Detalle de pedido:
             - Estado de Pedido:    
            
   
  * A mejorar:
	        * Funcion que simplifiquen el selected
		    * TRY: En productos y clientes.
            * Success y message: Respuesta al CRUD en /clientes y /pedidos.
            * A mejorar, hacer un alert()...................................................ok

**** LOGO: ****
    *Colores de marca:



****16/11/23*********
1) Ver diseño que sea responsive
*  1.b - ver si vale la pena agregar una libreria UI  ...si
2) agregar o editar un registro en una página distinta (más allá de que sea modal)
3) Filtrar por nombre (Adrián me debe documentación)
4) Ordenar por click en cabecera de columna precio, nombre y id (Adrián me debe documentación)
******************




