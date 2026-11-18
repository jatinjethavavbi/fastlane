// Ensure NODE_ENV is set to development when running the dev server
if (process.env.npm_lifecycle_event === 'dev' || process.argv.includes('dev')) {
  process.env.NODE_ENV = 'development';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
