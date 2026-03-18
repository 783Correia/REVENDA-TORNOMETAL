/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tornometalevertonlopes.com.br',
            },
            {
                protocol: 'https',
                hostname: 'lozduuvplbfiduaigjth.supabase.co',
            },
        ],
    },
};

export default nextConfig;
