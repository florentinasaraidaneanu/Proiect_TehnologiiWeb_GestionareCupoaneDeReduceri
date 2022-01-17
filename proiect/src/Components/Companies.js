import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, CircularProgress } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add";

function Companies() {
    const navigate = useNavigate();
    const [companiesData, setCompaniesData] = useState({
        data: {},
        loading: false,
        loaded: false,
    });

    async function fetchCompanies() {
        setCompaniesData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch("http://localhost:8080/api/sequelize/get-companies");
            const data = await response.json();
            setCompaniesData({ data: data, loading: false, loaded: true });
            console.log(data);
        } catch (err) {
            setCompaniesData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!companiesData.loaded) {
            fetchCompanies();
        }
    }, [companiesData.loaded]);

    return (
        <Fragment>
            <div className="lists">
                List of available companies</div>
            {companiesData.loading && <CircularProgress />}
            {companiesData.loaded && companiesData.data.map(function
                renderCompany(company) {
                return (

                    <h4 key={company.CompanyId}>
                        {company.CompanyName}
                        <Link to={`/companies/${company.CompanyId}`}
                            state={{
                                companyName: company.CompanyName,
                            }}
                        > More </Link>
                    </h4>

                );
            })}

            <Button
            startIcon={<AddIcon></AddIcon>}
            color="secondary"
            onClick={function onClick() {
                navigate("/companies/newCompany");
            }}>
                Add a new company
            </Button>
        </Fragment>

    );
}

export default Companies;