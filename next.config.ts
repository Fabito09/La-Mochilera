import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo en desarrollo: permite abrir `npm run dev` desde el celular en la
  // misma red Wi-Fi (http://192.168.x.x:3000). No afecta al sitio publicado.
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    // AVIF pesa ~20% menos que WebP; los navegadores que no lo soportan reciben WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
