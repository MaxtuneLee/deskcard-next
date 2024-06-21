/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    ...(process.env.OUTPUT_STANDALONE && { output: "standalone" }),
};

export default nextConfig;
