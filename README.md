

# Project - Dogs

<p align="left">
  <img height="200" src="https://estaticos-cdn.elperiodico.com/clip/eb59684b-13cf-4cf7-aeeb-847f57536409_alta-libre-aspect-ratio_default_0.jpg" />
</p>

## Detalles

- Esta App se creo utlizando React, Redux, Node y Sequelize.

<p>Acá hay un <a href="https://www.linkedin.com/feed/update/urn:li:activity:6841481134178729984/" >video</a> de el proyecto totalmente funcional</p>

## Funcionalidad

La idea general es crear una aplicación en la cual se puedan ver distintas razas de perro junto con información relevante de las mismas utilizando la api externa [the dog api](https://thedogapi.com/) y a partir de ella poder, entre otras cosas:

  - Buscar perros
  - Filtrarlos / Ordenarlos
  - Agregar nuevos perros

 Para las funcionalidades de filtrado y ordenamiento NO se utilizaron los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados sino que los realize por mi cuenta. En particular alguno de los ordenamientos o filtrados debe si o si realizarse desde el frontend.

### Únicos Endpoints/Flags utilizados

  - GET https://api.thedogapi.com/v1/breeds
  - GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}


#### Tecnologías usadas:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

Contenido tecnico de las paginas.

__Pagina inicial__:
- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal contiene__: 
- [ ] Input de búsqueda para encontrar razas de perros por nombre
- [ ] Área donde se verá el listado de razas de perros. Muestra su:
  - Imagen
  - Nombre
  - Temperamento
- [ ] Botones/Opciones para filtrar por por temperamento y por raza existente o agregada por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por orden alfabético y por peso
- [ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas inicialmente en la página uno.

__IMPORTANTE__: Dentro de la Ruta Principal se muestran tanto las razas de perros traidas desde la API como así también las de la base de datos.

__Ruta de detalle de raza de perro__: 
- [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
- [ ] Altura
- [ ] Peso
- [ ] Años de vida

__Ruta de creación de raza de perro contiene__: 
- [ ] Un formulario __controlado__ con los siguientes campos
  - Nombre
  - Altura (Diferenciar entre altura mínima y máxima)
  - Peso (Diferenciar entre peso mínimo y máximo)
  - Años de vida
- [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
- [ ] Botón/Opción para crear una nueva raza de perro

#### Base de datos

El modelo de la base de datos tiene las siguientes entidades :

- [ ] Raza con las siguientes propiedades:
  - ID *
  - Nombre *
  - Altura *
  - Peso *
  - Años de vida
- [ ] Temperamento con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos ya que una raza de perro puede tener varios "temperamentos" en simultaneo y, a su vez, un "temperamento" puede corresponder a múltiples razas de perro distintas. Por ejemplo la raza `pug` es docil, inteligente y sociable (entre otras). Pero a su vez existen otras razas de perro que también son sociables o inteligentes.


#### Backend

Se desarrollo un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /dogs__:
  - Obtiene un listado de las razas de perro
  - Devuelve solo los datos necesarios para la ruta principal
- [ ] __GET /dogs?name="..."__:
  - Obtiene un listado de las razas de perro que contengan la palabra ingresada como query parameter
  - Si no existe ninguna raza de perro muestra un mensaje adecuado
- [ ] __GET /dogs/{idRaza}__:
  - Obtiene el detalle de una raza de perro en particular
  - Traer solo los datos pedidos en la ruta de detalle de raza de perro
  - Incluiye los temperamentos asociados
- [ ] __GET /temperament__:
  - Obtiene todos los temperamentos posibles
  - En una primera instancia se obtienen desde la API externa y se guardan en la base de datos y luego se utilizan desde allí
- [ ] __POST /dog__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  - Crea una raza de perro en la base de datos


