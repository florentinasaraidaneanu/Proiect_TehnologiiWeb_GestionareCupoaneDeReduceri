import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function NewCoupon() {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [code, setCode] = useState('');
    const [productId, setProductId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [companyId, setCompanyId] = useState('');

    async function addCoupon() {
        const newCoupon = {
            CouponValue: value,
            ExpirationDate: expirationDate,
            Code: code,
            ProductId: productId,
            CategoryId: categoryId,
            CompanyId: companyId
        }

        try {
            const addNewCoupon = await fetch("http://localhost:8080/api/sequelize/create-coupon",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCoupon)
                }).then((response) => {
                    response.json().then((res) => alert(res))

                    if (response.status === 200) {
                        navigate("/coupons");
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    function cancel() {
        navigate("/coupons");
    }

    return (
        <Fragment>
            <div className="add">
                Add a new coupon
            </div>
            <div>
                <div>
                    <input type="number" placeholder="Coupon Value" onChange={(event) => setValue(event.target.value)}></input>
                </div>
                <div>
                    <input type="text" placeholder="Expiration Date" onChange={(event) => setExpirationDate(event.target.value)}></input>
                </div>
                <div>
                    <input type="text" placeholder="Code" onChange={(event) => setCode(event.target.value)}></input>
                </div>
                <div>
                    <input type="number" placeholder="Product Id" onChange={(event) => setProductId(event.target.value)}></input>
                </div>
                <div>
                    <input type="number" placeholder="Category Id" onChange={(event) => setCategoryId(event.target.value)}></input>
                </div>
                <div>
                    <input type="number" placeholder="Company Id" onChange={(event) => setCompanyId(event.target.value)}></input>
                </div>
                <div>
                    <input type="button" value="Add Coupon" onClick={addCoupon} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>
            </div>
        </Fragment>
    );
}
export default NewCoupon;