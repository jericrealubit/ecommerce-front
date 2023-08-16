import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NoSsr from "../components/NoSsr";

const HomePage = ({ featuredProduct }) => {
  return (
    <div>
      <NoSsr>
        <Header />
        <Featured product={featuredProduct} />
        <NewProducts />
      </NoSsr>
    </div>
  );
};

export default HomePage;
export async function getServerSideProps() {
  const featuredProductID = "64ba5bd512815a511a926bac";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductID);
  const newPrdoducts = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: { featuredProduct: JSON.parse(JSON.stringify(featuredProduct)) },
  };
}
