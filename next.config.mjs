/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'i.truyenvua.com',
            pathname: '**',
            
        },],
    },
};

export default nextConfig;
