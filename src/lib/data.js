export async function fetchProductData(id) {
    try {
        // Hacer la primera solicitud para obtener los datos del producto
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
        const data = await response.json();

        // Hacer la segunda solicitud para obtener la descripción del producto
        const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
        const descriptionData = await descriptionResponse.json();

        // Combinar los datos obtenidos de ambas solicitudes
        const newData = {
            id: data.id,
            title: data.title,
            price: data.price,
            base_price: data.base_price,
            original_price: data.original_price,
            initial_quantity: data.initial_quantity,
            pictures: data.pictures,
            attributes: data.attributes,
            description: descriptionData.plain_text // asumiendo que la respuesta de descripción tiene esta propiedad
        };

        return newData;
    } catch (error) {
        console.error(error);
        return null;
    }
}
