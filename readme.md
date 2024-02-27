<h1 align="center" id="title">LiquidStore</h1>

<p align="center"><img src="https://raw.githubusercontent.com/juanPabloSarobe/react-47225/main/src/assets/img/liquidStoreLogo.png" alt="project-image"></p>

<h2 id="description">LiquidStore es un proyecto del curso de React Native dictado en CoderHouse comisión 53280</h2>

 <h3>  La aplicación LiquidStoreApp es un store de venta de bebidas, se utiliza los mismos recursos que cree para el curso de react js.
De esta forma implementó mis propias prácticas y me va a quedar el proyecto completo cuando lo termine para mi portfolio.
</h3>
<p ><strong> Pre-entrega clase 7:</strong> Como primera pantalla vemos la lista de categorías para seleccionar. Al seleccionar una lista cambia la pantalla a la lista de productos. Aquí se incluyó en la APPBar el botón de volver así como un botón para abrir el buscador.
Una vez abierto el buscador el botón cambia a una cruz para cerrarlo.
El buscador es minimalista, solo tiene el input para buscar, y va realizando la búsqueda a medida que se va escribiendo. Al cerrar el buscador se reinician los valores.

Al seleccionar un producto pasamos a la pantalla producto, donde cambia el título nuevamente, se oculta el botón del buscador y se ve una tarjeta con el detalle del producto.
Se trabajó en muchos detalles visuales, en el header para que todo quede alineado aunque ocultemos componentes, así como cuando el texto desborda y que tipo de iconos se debe mostrar en cada momento. También está todo listo para implementar el modo oscuro cuando veamos schemas.
Se agregaron las fuentes Roboto en varias de sus formas.</p>

<p><strong> Preentrega clase 9: </strong>Para esta preentrega se requeria la implementacion de la libreria Navigation, la cual se implemento exitosamente. Otro de los puntos claves era ajustar el Header, pero por cuestiones de estetica y de practicar, se implemento el Header original de la libreria en vez del personalizado que ya tenia desarrollado, de esta forma pude practicar con sus propios componentes y editar por ejemplo los iconos del header variandolos dependiendo del estado del componente, mediante el metodo navigation.setOptions().
Tambien se ajusto la barra de busqueda al nuevo componente.
Por ultimo se agrego el componente ActivityIndicator mientras se carga la fuente.

Para estos trabajos se fueron creando ramas, donde se dejaron copias de la version anterior.

</p>
<p><strong> Preentrega clase 11: </strong> Para esta preentrega se requiere la implementación de una Bottom Tab Bar y de manejo de Estados mediante Redux, las cuales se implementaron correctamente.

Respecto de la tab bar, se utilizaron métodos diferentes al profesor para darle estilos a los botones cuando están o no seleccionados. También se modificó el main navigator.js para que sea la TabBar la principal y el Stack Navigation la secundaria dentro de una Tab. Para la Tab Shop se utiliza el header de del Stack, para el resto se utiliza el header de la TabBar.
En la segunda Tab se implementa el carrito, el cual contiene en su header un botón para vaciarlo, previo verificarlo con el usuario mediante un Alert.
Luego contiene una lista de los productos que se van agregando.
La tercer TabBar se coloco a modo de reservar el espacio, no siendo aun trabajada.

Como valor agregado se desarrolló un componente que permite manipular la cantidad de unidades a agregar de un mismo producto, el mismo tiene controles para que no sea menor a cero, ni mayor al stock, así como también que en caso de no haber stock no habilita el botón comprar.Otro componente similar se agregó en las Card del carrito con la diferencia que al agregar o quitar productos se actualiza en tiempo real el carrito.

Mediante la implementación de Redux, se construyó un estado general para el carrito, se agregaron más datos como Cantidad Total, la cual también va actualizando el Badge del TabBar del carrito.
Se diseñaron funciones dentro del Slice que se reutilizan para actualizar el importe total y la cantidad total al momento de agregar o sacar unidades y eliminar un productoSe agregaron todos los controles y funcionalidades para agregar unidades o productos, eliminar unidades, eliminar productos previa confirmación y eliminar el carrito completo, así como su visualización cuando está vacío.

</p>
<br>

<h4>Librerias utilizadas </h4> 
<ul>Expo </ul>
<ul>Expo-fonts </ul>
<ul>Expo-status-bar </ul>
<ul>React Native Reanimated </ul>
<ul>Navigation </ul>
<ul>Vector Icons </ul>
<ul>Redux </ul>
