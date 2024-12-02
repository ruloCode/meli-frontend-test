# Test Práctico - Frontend

Bienvenido al repositorio del test práctico para aspirantes al área de frontend de Mercado Libre. Este proyecto tiene como objetivo demostrar las habilidades de desarrollo frontend utilizando el stack tecnológico especificado.

### [Live Demo](https://meli-frontend-test-nu.vercel.app/)


## Descripción

La aplicación consta de tres componentes principales:

1. **Caja de búsqueda**: Permite al usuario ingresar un término de búsqueda.
2. **Visualización de resultados**: Muestra los resultados de la búsqueda.
3. **Detalle del producto**: Muestra información detallada sobre un producto seleccionado.


#### Tecnologías:

**Cliente:**
- Next.js
- HTML
- JavaScript, React
- SCSS, BEM

**Servidor:**
- Node.js >= 20


### Características

- **Responsive Design**: La aplicación es completamente adaptable a diferentes tamaños de pantalla.
- **SEO**: La aplicación está optimizada para motores de búsqueda.
- **Performance**: La aplicación es eficiente en términos de carga y renderizado.
- **Escalabilidad**: El código aplica una arquitectura de atomic design.
- **Navegación**:
  - Caja de búsqueda: `/`
  - Resultados de búsqueda: `/items?search=`
  - Detalle del producto: `/items/:id`

### Flujo de la aplicación
- Caja de Búsqueda: El usuario ingresa un término de búsqueda y se navega a la vista de resultados.
- Resultados de Búsqueda: Se muestran los productos relevantes con paginación.
- Detalle del Producto: Al hacer clic en un producto, se navega a la vista con la descripción y más detalles.

### Instalación

```bash
npm install
# 
npm run dev

```
La aplicación estará disponible en http://localhost:3000.

### Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
