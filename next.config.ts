import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    reactCompiler: {
      compilationMode: "annotation",
    },
  } as any,
  images: {
    domains: [
      "images.unsplash.com",
      "example.com",
      "lh3.googleusercontent.com",
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "source.unsplash.com",
      "picsum.photos",
      "via.placeholder.com",
      "avatar.vercel.sh",
      "img1.kakaocdn.net",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/(.*)", // 프로젝트 내의 모든 경로에 적용
        headers: [
          {
            key: "Content-Security-Policy",
            value: "require-trusted-types-for 'script';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
