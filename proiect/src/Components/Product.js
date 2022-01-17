import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit";

function Product() {
    const product = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        data: '',
        loading: false,
        loaded: false,
    });

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [companyId, setCompanyId] = useState('');

    async function fetchProduct() {
        setProductData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch(`http://localhost:8080/api/sequelize/get-products/${product.productId}`);

            const data = await response.json();

            setProductData({ data: data, loading: false, loaded: true });
            console.log(data);

        } catch (err) {
            setProductData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!productData.loaded) {
            fetchProduct();
        }
    }, [productData.loaded]);

    async function deleteProduct() {
        await fetch(`http://localhost:8080/api/sequelize/delete-product/${product.productId}`, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            response.json().then((res) => alert(res)).then(_ => {
                navigate("/coupons");
            })
        })
    }

    function setNewProduct(productData) {
        setId(productData.data.ProductId);
        setName(productData.data.ProductName);
        setPrice(productData.data.ProductPrice);
        setCategoryId(productData.data.CategoryId);
        setCompanyId(productData.data.CompanyId);
    }

    async function updateProduct() {
        const updatedProduct = {
            ProductName: name,
            ProductPrice: price,
            CategoryId: categoryId,
            CompanyId: companyId,
        }

        try {
            const addNewProduct = await fetch(`http://localhost:8080/api/sequelize/update-product/${product.productId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProduct)
                }).then((response) => {
                    response.json().then((res) => alert(res)).then(_ => {
                        setId(-1);
                        setName('');
                        setPrice('');
                        setCategoryId('');
                        setCompanyId('');
                        navigate('/products');
                    });
                })
        } catch (err) {
            console.error(err);
        }
    }

    return (<Fragment>
        <h3 src={location?.state} alt={""}>
        </h3>
        {productData.loading && <CircularProgress />}
        {productData.loaded &&
            <div>
                <h4>
                    {`Product Id: ${productData.data.ProductId}`}

                </h4>
                <h4>
                    {`Product Name:          `}
                    <input type="text" defaultValue={productData.data.ProductName}
                        onChange={(ev) => setName(ev.target.value)}></input>
                </h4>
                <h4>
                    {`Product Price:         `}
                    <input type="number" defaultValue={productData.data.ProductPrice}
                        onChange={(ev) => setPrice(ev.target.value)}></input>
                </h4>
                <h4>
                    {`Company Id:          `}
                    <input type="number" defaultValue={productData.data.CompanyId}
                        onChange={(ev) => setCompanyId(ev.target.value)}></input>
                </h4>
                <h4>
                    {`Category Id: ${productData.data.CategoryId}`}
                    <input type="number" defaultValue={productData.data.CategoryId}
                        onChange={(ev) => setCategoryId(ev.target.value)}></input>
                </h4>
            </div>
        }

        <Button color="secondary"
            startIcon={<DeleteIcon></DeleteIcon>}
            onClick={function onClick() {
                deleteProduct();
            }}>
            Delete</Button>
        <Button color="secondary"
            startIcon={<EditIcon></EditIcon>}
            onClick={function onClick() {
                updateProduct();
            }}>
            Update</Button>
    </Fragment>
    );
}

export default Product;