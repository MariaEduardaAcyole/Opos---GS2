import "@/styles/globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
