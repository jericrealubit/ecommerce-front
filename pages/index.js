import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const HomePage = ({ featuredProduct, newProducts }) => {
  return (
    <div>
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
};

export default HomePage;
export async function getServerSideProps() {
  const featuredProductID = "64faf4d816a229f4362fead4";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductID);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
