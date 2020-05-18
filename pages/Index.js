// landing page. Jeg behøver ikke lave class baseret component
// så længe jeg ikke bruger state
// Det er en convention i React at Components starter med Stort

import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import clientConfig from "../client-config";
import Product from "../components/Products";
const Index = (props) => {
  //her trækker jeg data fra products objectet via destructoring
  const { products } = props;

  return (
    <Layout>
      <div className="ProductContainer">
        {products.length
          ? products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          : ""}
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const res = await fetch(`${clientConfig.siteURL}/getproducts`);
  const productsData = await res.json();

  return {
    products: productsData,
  };
};
export default Index;
