import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, CircularProgress } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add";

function Products() {
    const navigate = useNavigate();
    const [productsData, setProductsData] = useState({
        data: {},
        loading: false,
        loaded: false,
    });

    async function fetchProducts() {
        setProductsData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch("http://localhost:8080/api/sequelize/get-products");
            const data = await response.json();
            setProductsData({ data: data, loading: false, loaded: true });
            console.log(data);
        } catch (err) {
            setProductsData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!productsData.loaded) {
            fetchProducts();
        }
    }, [productsData.loaded]);



    return (
        <Fragment>
            <div className="lists">
                List of available products
            </div>
            {productsData.loading && <CircularProgress />}
            {productsData.loaded && productsData.data.map(function renderProduct(product) {
                return (
                    <h4 key={product.ProductId}>
                        {product.ProductName}
                        <Link to={`/products/${product.ProductId}`}
                        > More </Link>
                    </h4>

                );
            })}

            <Button
                startIcon={<AddIcon></AddIcon>}
                color="secondary"
                onClick={function onClick() {
                    navigate("/products/newProduct");
                }}>
                Add a new product
            </Button>
        </Fragment>

    );
}
export default Products;