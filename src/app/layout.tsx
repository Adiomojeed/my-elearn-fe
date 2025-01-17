import type { Metadata } from "next";
import "@styles/globals.css";
import ParentProvider from "./Provider";
import dynamic from "next/dynamic";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyELearn",
  description: "Your Gateway to Seamless Learning Anywhere, Anytime.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["myelearn"],
  icons: {
    icon: "/ico.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Styling = dynamic(() => import("@components/StylingComponent"));
  return (
    <html lang="en">
      {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      /> */}
      <Styling />
      <body className="text-grey-500">
        <ParentProvider>{children}</ParentProvider>
      </body>
    </html>
  );
}
