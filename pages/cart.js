import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { styled } from "styled-components";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { useRouter } from "next/router";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
  gap: 20px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const ProductInfoCell = styled.div`
  padding: 10px 0;
  cursor: pointer;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 40px;
    max-height: 40px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 60px;
      max-height: 60px;
    }
  }
`;

const ProductTitle = styled.div`
  max-width: 100%;
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    padding: 0 4px;
    display: inline-block;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const EditCartWrapper = styled.div`
  text-align: center;
`;

const TotalTd = styled.td`
  font-weight: 600;
`;

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cartProducts.length) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (router.asPath.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };

  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };

  const goToPayment = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (response.data.url) {
      router.push(response.data.url);
    }
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length > 0 && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell
                        onClick={() => router.push("/product/" + product._id)}
                      >
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        <ProductTitle>{product.title}</ProductTitle>
                      </ProductInfoCell>
                      <td>${product.price}</td>
                      <td>
                        <EditCartWrapper>
                          <Button
                            size={"s"}
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>

                          <Button
                            size={"s"}
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </Button>
                        </EditCartWrapper>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th>TOTAL</th>
                    <td></td>
                    <td></td>
                    <TotalTd>${total}</TotalTd>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <Button black={1} block={1} onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
