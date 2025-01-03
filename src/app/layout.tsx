import type { Metadata } from "next";
import "@styles/globals.css";
import ParentProvider from "./Provider";
import dynamic from "next/dynamic";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyELearn",
  description: "Your Gateway to Seamless Learning Anywhere, Anytime.",
  icons: {
    icon: "/ico.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Styling = dynamic(() => import("@components/StylingComponent"));
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <Styling />
      <body className="text-dark-900">
        <ParentProvider>{children}</ParentProvider>
      </body>
    </html>
  );
}
