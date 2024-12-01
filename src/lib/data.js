export async function fetchProductData(id) {
    try {
        // Hacer la primera solicitud para obtener los datos del producto
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
        const data = await response.json();

        // Hacer la segunda solicitud para obtener la descripción del producto
        const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
        const descriptionData = await descriptionResponse.json();

        // Hacer una solicitud adicional para obtener el nombre de la categoría
        const categoryResponse = await fetch(`https://api.mercadolibre.com/categories/${data.category_id}`);
        const categoryData = await categoryResponse.json();

        // Buscar el objeto de color dentro de los atributos
        const colorAttribute = data.attributes.find(attribute => attribute.id === "COLOR");

        // Obtener el valor del color, si existe
        const colorValue = colorAttribute ? colorAttribute.value_name : null;

        // Extraer el camino de categorías para el breadcrumb
        const categoryPath = categoryData.path_from_root.map(cat => cat.name);

        // Estructurar la información del precio
    

        // Construir el objeto con la estructura solicitada
        const newData = {
            id: data.id,
            title: data.title,
            price: data.price,
            pictures: data.pictures.map(pic => pic.url), // solo los URLs de las imágenes
            condition: data.condition, // "new", "used", "refurbished"
            free_shipping: data.shipping.free_shipping,
            categorys: categoryPath,
            // sold_quantity: data.sold_quantity,
            // installments: data.installments ? data.installments.quantity : null, // cantidad de cuotas, si existe
            description: descriptionData.plain_text,
            attributes: data.attributes.map(attr => ({
                id: attr.id,
                name: attr.name,
                value_name: attr.value_name
            })),
            color: colorValue,
            category_path_from_root: categoryPath
        }

        return newData;
    } catch (error) {
        console.error(error);
        return null;
    }
}
