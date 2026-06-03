import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins : [
      'cresting-parmesan-ninetieth.ngrok-free.dev',
  ],
};

export default nextConfig;
