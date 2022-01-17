import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, ButtonGroup } from "@material-ui/core"

function Nav() {
    const navStyleState = useState({ color: "white" });
    const navigate = useNavigate();
    return (
        <Fragment>
            <AppBar style={{ position: "relative" }}>
                <Toolbar>
                    <Typography variant="h6"> Discount coupons ... </Typography>
                    <ButtonGroup>
                        <Button
                            style={navStyleState[0]}
                            onClick={function onClick() {
                                navigate("/");
                            }}
                        >Start</Button>

                        <Button
                            style={navStyleState[0]}
                            onClick={function onClick() {
                                navigate("/coupons");
                            }}
                        >All coupons</Button>

                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

export default Nav;