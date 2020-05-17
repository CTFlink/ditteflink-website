// landing page. Jeg behøver ikke lave class baseret component
// så længe jeg ikke bruger state
// Det er en convention i React at Components starter med Stort

import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import clientConfig from "../client-config";

const Index = () => {
  return <Layout>Hello World</Layout>;
};

Index.getInitialProps = async () => {
  const res = await fetch(`${clientConfig.siteURL}/getproducts`);
  const productsData = await res.json();

  return {
    products: productsData,
  };
};
export default Index;
