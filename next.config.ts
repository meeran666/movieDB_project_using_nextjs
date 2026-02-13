import { Configuration } from "webpack";
const nextConfig = {
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com; " +
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https://*;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
