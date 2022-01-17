import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, CircularProgress } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add";

function Coupons() {
    const navigate = useNavigate();
    const [couponsData, setCouponsData] = useState({
        data: {},
        loading: false,
        loaded: false,
    });

    async function fetchCoupons() {
        setCouponsData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch("http://localhost:8080/api/sequelize/get-coupons");
            const data = await response.json();
            setCouponsData({ data: data, loading: false, loaded: true });
            console.log(data);
        } catch (err) {
            setCouponsData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!couponsData.loaded) {
            fetchCoupons();
        }
    }, [couponsData.loaded]);

    return (
        <Fragment>
            <div className="lists">
                List of available coupons</div>
            {couponsData.loading && <CircularProgress />}
            {couponsData.loaded && couponsData.data.map(function
                renderCoupon(coupon) {
                return (

                    <h4 key={coupon.CouponId}>
                        {`Coupon Id: ${coupon.CouponId}`} |
                        {` Coupon Value: ${coupon.CouponValue}`}
                        <Link to={`/coupons/${coupon.CouponId}`}

                        > More </Link>
                    </h4>
                );
            })}

            <Button
                startIcon={<AddIcon></AddIcon>}
                color="secondary"
                onClick={function onClick() {
                    navigate("/coupons/newCoupon");
                }}>
                Add a new coupon
            </Button>
        </Fragment>

    );
}

export default Coupons;