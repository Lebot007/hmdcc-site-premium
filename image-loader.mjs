/**
 * Image loader para export estático (GitHub Pages).
 *
 * Com `output: "export"` o Next.js exige imagens não otimizadas, porém nesse
 * modo o `basePath` NÃO é aplicado automaticamente ao atributo src do
 * next/image. Este loader resolve isso prefixando o basePath manualmente.
 *
 * As imagens de public/ já são otimizadas offline (pipeline PIL) e servidas
 * como arquivos estáticos, então apenas repassamos o caminho com o prefixo.
 */
export default function imageLoader({ src }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${basePath}${src}`
}
