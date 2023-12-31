import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const ProductsPage = ({ products }) => {
  return (
    <>
      <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
};

export default ProductsPage;

export const getServerSideProps = async () => {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
