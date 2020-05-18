const Product = (props) => {
  const { product } = props;
  return (
    <div>
      <div className="card mb-3">
        <h3 className="card-header">{product.name}</h3>
        <img
          src={product.images[0].src}
          alt="Card image"
          style={{
            margin: "2px",
            height: "180px",
            width: "100px",
            display: "block",
          }}
        />
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div className="card-body">
          <h4 className="card-title">Card title</h4>
          <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
          <a className="btn btn-secondary" href="#">
            View
          </a>
          <a href="#" className="btn btn-primary">
            Add to card
          </a>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  );
};

export default Product;
