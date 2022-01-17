import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit";

function Coupon() {
    const coupon = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [couponData, setCouponData] = useState({
        data: '',
        loading: false,
        loaded: false,
    });

    const [id, setId] = useState('');
    const [value, setValue] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [code, setCode] = useState('');
    const [productId, setProductId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [companyId, setCompanyId] = useState('');

    async function fetchCoupon() {
        setCouponData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch(`http://localhost:8080/api/sequelize/get-coupons/${coupon.couponId}`);

            const data = await response.json();

            setCouponData({ data: data, loading: false, loaded: true });
            console.log(data);

        } catch (err) {
            setCouponData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!couponData.loaded) {
            fetchCoupon();
        }
    }, [couponData.loaded]);

    async function deleteCoupon() {
        await fetch(`http://localhost:8080/api/sequelize/delete-coupon/${coupon.couponId}`, {

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

    function setNewCoupon(couponData) {
        setId(couponData.data.CouponId);
        setValue(couponData.data.CouponValue);
        setExpirationDate(couponData.data.ExpirationDate);
        setCode(couponData.data.Code);
        setProductId(couponData.data.ProductId);
        setCategoryId(couponData.data.CategoryId);
        setCompanyId(couponData.data.CompanyId);
    }

    async function updateCoupon() {
        const updateCoupon = {
            CouponValue: value,
            ExpirationDate: expirationDate,
            Code: code,
            ProductId: productId,
            CompanyId: companyId,
            CategoryId: categoryId
        }

        try {
            const addNewCoupon = await fetch(`http://localhost:8080/api/sequelize/update-coupon/${coupon.couponId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateCoupon)
                }).then((response) => {
                    response.json().then((res) => alert(res)).then(_ => {
                        setId(-1);
                        setValue('');
                        setExpirationDate('');
                        setCode('');
                        setProductId('');
                        setCategoryId('');
                        setCompanyId('');
                        navigate('/coupons');
                    });
                })
        } catch (err) {
            console.error(err);
        }
    }

    return (<Fragment>
        <h3 src={location?.state} alt={""}>
        </h3>
        {couponData.loading && <CircularProgress />}
        {couponData.loaded &&
            <div>
                <h4>
                    {`Coupon Id: ${couponData.data.CouponId}`}

                </h4>
                <h4>
                    {`Coupon Value:           `}
                    <input type="number" defaultValue={couponData.data.CouponValue}
                        onChange={(ev) => setValue(ev.target.value)}></input>
                </h4>
                <h4>
                    {`Expiration Date:            `}
                    <input type="text" defaultValue={couponData.data.ExpirationDate}
                        onChange={(ev) => setExpirationDate(ev.target.value)}></input>
                </h4>
                <h4>
                    {`Coupon Code:          `}
                    <input type="text" defaultValue={couponData.data.Code}
                        onChange={(ev) => setCode(ev.target.value)}></input>
                </h4>
                <h4>
                    {`Product Id:          `}
                    <input type="number" defaultValue={couponData.data.ProductId}
                        onChange={(ev) => setProductId(ev.target.value)}></input>
                </h4>
                <h4>
                    {`Category Id:        `}
                    <input type="number" defaultValue={couponData.data.CategoryId}
                        onChange={(ev) => setCategoryId(ev.target.value)}></input>
                </h4>
                <h4>
                    {`Company Id:         `}
                    <input type="number" defaultValue={couponData.data.CompanyId}
                        onChange={(ev) => setCompanyId(ev.target.value)}></input>
                </h4>
            </div>
        }

        <Button color="secondary"
            startIcon={<DeleteIcon></DeleteIcon>}
            onClick={function onClick() {
                deleteCoupon();
            }}>
            Delete</Button>
        <Button color="secondary"
            startIcon={<EditIcon></EditIcon>}
            onClick={function onClick() {
                updateCoupon();
            }}>
            Update</Button>
    </Fragment>
    );
}
export default Coupon;