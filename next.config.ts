import { Configuration } from 'webpack'
const nextConfig = {
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/w300_and_h450_bestv2/**',
      },
    ],
  },
}

export default nextConfig
