import Head from "Next/head";
import Header from "Header";

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>Ditte Flink Design</title>
        <link
          rel="stylesheet"
          href={"https://bootswatch.com/4/lux/bootstrap.min.css"}
        />
      </Head>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
