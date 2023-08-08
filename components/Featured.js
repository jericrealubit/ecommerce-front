import { styled } from "styled-components";
import Center from "./Center";
import PrimaryBtn from "./PrimaryBtn";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Featured = () => {
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>Pro anywhere</Title>
              <Desc>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </Desc>
              <button>Read more</button>
              <PrimaryBtn size="l">Add to cart</PrimaryBtn>
            </div>
          </Column>
          <Column>
            <img
              src="https://jeric-next-ecommerce.s3.amazonaws.com/1691493466321.png"
              alt="xxx"
            />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
