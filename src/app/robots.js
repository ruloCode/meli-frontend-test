
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/', // Permite el acceso completo a todo el contenido
        disallow: [
          '/_next/image*', // Excluye todas las URLs que comienzan con /_next/image
        ],
      },
    ],
    sitemap: 'https://vitau.mx/sitemap.xml', // Indica la ubicación del sitemap
    host: 'https://meli-frontend-test-nu.vercel.app/', // Define el host
  }
}
