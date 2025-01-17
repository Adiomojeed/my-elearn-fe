/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
  async headers() {
    return [
      {
        // Match all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevent embedding in iframes entirely
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none';", // Modern alternative to X-Frame-Options
          },
        ],
      },
    ];
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(nextConfig);
