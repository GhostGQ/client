import nextI18NextConfig from './next-i18next.config';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: nextI18NextConfig.i18n,
  output: 'standalone'
};

export default nextConfig;
