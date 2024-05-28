/*
 * @Date: 2024-05-14 15:41:13
 * @LastEditors: CZH
 * @LastEditTime: 2024-05-28 20:08:27
 * @FilePath: /DB-GPT-Web/next.config.js
 */
/** @type {import('next').NextConfig} */
const CopyPlugin = require('copy-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const nextConfig = {
  output: 'export',
  experimental: {
    esmExternals: 'loose',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  trailingSlash: true,
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.join(__dirname, 'node_modules/@oceanbase-odc/monaco-plugin-ob/worker-dist/'),
              to: 'static/ob-workers'
            },
          ],
        })
      )
      // 添加 monaco-editor-webpack-plugin 插件
      config.plugins.push(
        new MonacoWebpackPlugin({
          // 你可以在这里配置插件的选项，例如：
          languages: ['sql'],
          filename: 'static/[name].worker.js'
        })
      );
    }
    return config;
  }
};

module.exports = nextConfig;
