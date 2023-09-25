import styled from "styled-components";
import Center from "./Center";
import {
  AiFillYoutube,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";

const StyledFooter = styled.footer`
  background-color: #222;
  color: #aaa;
  margin-top: 40px;
  bottom: 0;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const SocialIcons = styled.div`
  cursor: pointer;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Center>
        <Wrapper>
          <div>Site design / logo © {new Date().getFullYear()} Ecommerce</div>
          <SocialIcons>
            <AiFillYoutube /> <AiFillFacebook /> <AiFillTwitterSquare />{" "}
            <AiFillLinkedin /> <AiFillInstagram />
          </SocialIcons>
        </Wrapper>
      </Center>
    </StyledFooter>
  );
};

export default Footer;
