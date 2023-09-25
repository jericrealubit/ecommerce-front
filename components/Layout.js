import Header from "./Header";
import Footer from "./Footer";
import NoSsr from "./NoSsr";
import styled from "styled-components";

const Content = styled.div`
  min-height: 80vh;
`;

const Layout = ({ children }) => {
  return (
    <>
      <NoSsr>
        <Header />
        <Content>
          <main>{children}</main>
        </Content>
        <Footer />
      </NoSsr>
    </>
  );
};

export default Layout;
