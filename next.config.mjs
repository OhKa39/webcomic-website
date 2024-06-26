/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'i.truyenvua.com',
            pathname: '**',
            
        },
        {
            protocol: 'https',
            hostname: 'comicbucket23.s3.ap-southeast-1.amazonaws.com',
            pathname: '**',
            
        },
        {
            protocol: 'https',
            hostname: 'img.clerk.com',
            pathname: '**',
        }
    ],
        unoptimized: true
    },
};

export default nextConfig;
