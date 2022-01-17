import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Typography, Button } from "@material-ui/core"

function Home() {
    const navigate = useNavigate();
    return (
        <Fragment>
            <Typography variant="h4"> Home </Typography>
            <div>
                <Button
                    color="primary"
                    onClick={function onClick() {
                        navigate("/companies");
                    }}
                > See companies </Button>
            </div>

            <div>
                <Button
                    color="primary"
                    onClick={function onClick() {
                        navigate("/categories");
                    }}
                > See categories </Button>
            </div>


            <div>
                <Button
                    color="primary"
                    onClick={function onClick() {
                        navigate("/products");
                    }}
                > See products </Button>
            </div>
        </Fragment>
    );
}
export default Home;