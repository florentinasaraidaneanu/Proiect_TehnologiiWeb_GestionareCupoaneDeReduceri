import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function NewProduct() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [companyId, setCompanyId] = useState('');

    async function addProduct() {
        const newProduct = {
            ProductName: name,
            ProductPrice: productPrice,
            CategoryId: categoryId,
            CompanyId: companyId
        }

        try {
            const addNewProduct = await fetch("http://localhost:8080/api/sequelize/create-product",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newProduct)
                }).then((response) => {
                    response.json().then((res) => alert(res))

                    if (response.status === 200) {
                        navigate("/products");
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    function cancel() {
        navigate("/products");
    }

    return (
        <Fragment>
            <div className="add">
                Add a new product
            </div>
            <div>
                <div>
                    <input type="text" placeholder="Product Name" onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div>
                    <input type="number" placeholder="Product Price" onChange={(event) => setProductPrice(event.target.value)}></input>
                </div>
                <div>
                    <input type="number" placeholder="Category Id" onChange={(event) => setCategoryId(event.target.value)}></input>
                </div>
                <div>
                    <input type="number" placeholder="Company Id" onChange={(event) => setCompanyId(event.target.value)}></input>
                </div>
                <div>
                    <input type="button" value="Add Product" onClick={addProduct} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>
            </div>
        </Fragment>
    );
}
export default NewProduct;