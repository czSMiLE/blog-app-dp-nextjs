// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: extendWebpackConfig,
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: 'idkxd',
  project: 'javascript-nextjs',
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

function extendWebpackConfig(config) {
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          typescript: true,
          icon: true,
        },
      },
    ],
  });

  return config;
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
