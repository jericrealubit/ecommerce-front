import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "./icons/Bars";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
`;

const Logo = styled(Link)`
  color: #aaa;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive ? ` display: block; ` : ` display: none; `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  &:hover,
  &.active {
    color: white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Header = () => {
  const router = useRouter();
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav
            mobileNavActive={mobileNavActive}
            onClick={() => setMobileNavActive((prev) => !prev)}
          >
            <NavLink
              href={"/"}
              className={router.pathname == "/" ? "active" : ""}
            >
              Home
            </NavLink>
            <NavLink
              href={"/products"}
              className={router.pathname == "/products" ? "active" : undefined}
            >
              All products
            </NavLink>
            {/* <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink> */}
            <NavLink
              href={"/cart"}
              className={router.pathname == "/cart" ? "active" : undefined}
            >
              Cart ({cartProducts.length})
            </NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
