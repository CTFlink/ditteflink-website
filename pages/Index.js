// landing page. Jeg behøver ikke lave class baseret component
// så længe jeg ikke bruger state
// Det er en convention i React at Components starter med Stort

import Layout from "../components/Layout";
import client from "./../components/ApolloClient";
import Product from "../components/Product";
import gql from "graphql-tag";

const PRODUCT_QUERY = gql`
  query {
    products(first: 20) {
      nodes {
        id
        productId
        averageRating
        slug
        description
        image {
          uri
          title
          srcSet
          sourceUrl
        }
      }
      name
      price
    }
  }
`;

const Index = (props) => {
  console.warn(props);
  //her trækker jeg data fra products objectet via destructoring
  const { products } = props;

  return (
    <Layout>
      <div className="product-container">
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
  // ---Dette er uddateret fordi jeg er gået over til at bruge graphql med Apollo client
  // const res = await fetch(`${clientConfig.siteURL}/getproducts`);
  // const productsData = await res.json();
  // return {
  //   products: productsData,
  // };

  const result = await client.query({ query: PRODUCT_QUERY });

  return {
    products: result.products.nodes,
  };
};
export default Index;
