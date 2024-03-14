/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
    },
    // Для Mui-X
    transpilePackages: ['@mui/x-date-pickers']
}

module.exports = nextConfig
