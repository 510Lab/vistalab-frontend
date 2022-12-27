import "./globals.css";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Provider from "./components/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang='zh-Hans'>
      <head />
      <body>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
