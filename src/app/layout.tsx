import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTop";
import { CartProvider } from "@/components/context/cartcontext";
import { Toaster } from "sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400","500","700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Pizza Store | The Best Pizza in Town",
  description: "Enjoy the most delicious, freshly baked pizzas made daily. Order now and experience an unforgettable taste!",
};



export default function RootLayout({


  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex flex-col min-h-screen">
        <Header/>
        <CartProvider>
              <Toaster
              position="top-right"
              toastOptions={{
                classNames: {
                  toast: "bg-gray-900 text-white shadow-lg rounded-xl",
                  title: "text-white font-bold",
                  description: "text-gray-300",
                },
              }}
            />
          <main className="flex-grow">
          {children}
        </main>
        </CartProvider>
        <ScrollToTopButton/>
        <Footer/>
        </div>
      </body>
    </html>
  );
}
