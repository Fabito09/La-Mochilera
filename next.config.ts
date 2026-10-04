import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo en desarrollo: permite abrir `npm run dev` desde el celular en la
  // misma red Wi-Fi (http://192.168.x.x:3000). No afecta al sitio publicado.
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    // AVIF pesa ~20% menos que WebP; los navegadores que no lo soportan reciben WebP.
    formats: ["image/avif", "image/webp"],
    // Fotos subidas desde el panel (Vercel Blob).
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  experimental: {
    // El sitio y el panel tienen layouts raíz distintos: la 404 de direcciones
    // inexistentes vive en app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
