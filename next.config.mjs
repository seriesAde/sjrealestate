/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://property.reworkstaging.name.ng/v1/:path*",
      },
    ];
  },

  reactCompiler: true,
};

export default nextConfig;
