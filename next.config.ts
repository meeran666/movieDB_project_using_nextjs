import { Configuration } from 'webpack'
const nextConfig = {
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default nextConfig
