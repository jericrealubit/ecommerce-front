import { CartContextProvider } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="fonts.googleapis.com_css2_family=Poppins_wght@400;500;600;700&display=swap.css"
        />
      </Helmet>
      <GlobalStyles />
      <CartContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </>
  );
}
