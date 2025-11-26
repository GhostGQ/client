import nextI18NextConfig from './next-i18next.config';
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    i18n: nextI18NextConfig.i18n,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'localhost',
                port: '5000',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'api.seatextile.uz',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'api.set-textile.uz',
                pathname: '/uploads/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/:path*` // Proxy to Backend,
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                ],
            },
        ];
    },
};

export default nextConfig;
