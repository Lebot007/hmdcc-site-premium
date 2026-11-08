import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// Hospedagem estática (GitHub Pages)
//
// O GitHub Pages serve arquivos estáticos, sem servidor Node.js. Para gerar
// o site estático, rode com as variáveis de ambiente:
//
//   STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/hmdcc-site-premium next build
//
// - `output: "export"`       → gera o site 100% estático em ./out
// - `basePath`               → o Pages publica em /<repo>/, não na raiz do domínio
// - `loader: "custom"`       → image-loader.mjs prefixa o basePath nas imagens
//                               (com export o next/image não faz isso sozinho)
// ---------------------------------------------------------------------------

const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  basePath: basePath || undefined,
  images: isStaticExport
    ? {
        // Com export estático o next/image não aplica basePath sozinho —
        // o loader customizado (image-loader.mjs) faz o prefixo manualmente
        // e devolve o arquivo estático de public/ sem otimização.
        loader: "custom",
        loaderFile: "./image-loader.mjs",
      }
    : {},
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
