import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Company() {
    const company = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [companyData, setCompanyData] = useState({
        data: '',
        loading: false,
        loaded: false,
    });

    const [id, setId] = useState('');
    const [name, setName] = useState('');

    async function fetchCompany() {
        setCompanyData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch(`http://localhost:8080/api/sequelize/get-companies/${company.companyId}`);

            const data = await response.json();

            setCompanyData({ data: data, loading: false, loaded: true });
            console.log(data);

        } catch (err) {
            setCompanyData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!companyData.loaded) {
            fetchCompany();
        }
    }, [companyData.loaded]);

    async function deleteCompany() {
        await fetch(`http://localhost:8080/api/sequelize/delete-company/${company.companyId}`, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            response.json().then((res) => alert(res)).then(_ => {
                navigate("/companies");
            })
        })
    }

    function setNewCompany(companyData) {
        setId(companyData.data.CompanyId);
        setName(companyData.data.CompanyName);
    }

    async function updateCompany() {
        const updatedCompany = {
            CompanyName: name
        }

        try {
            const addNewCompany = await fetch(`http://localhost:8080/api/sequelize/update-company/${company.companyId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedCompany)
                }).then((response) => {
                    response.json().then((res) => alert(res)).then(_ => {
                        setId(-1);
                        setName('');
                        navigate('/companies');
                    });
                })
        } catch (err) {
            console.error(err);
        }
    }

    return (<Fragment>
        <h3 src={location?.state} alt={""}>
        </h3>
        {companyData.loading && <CircularProgress />}
        {companyData.loaded &&
            <div>
                <h4>
                    {`Company Id: ${companyData.data.CompanyId}`}

                </h4>
                <h4>
                    {`Company Name:       `}
                    <input type="text" defaultValue={companyData.data.CompanyName}
                        onChange={(ev) => setName(ev.target.value)}></input>
                </h4>
            </div>
        }

        <Button color="secondary"
            startIcon={<DeleteIcon></DeleteIcon>}
            onClick={function onClick() {
                deleteCompany();
            }}>
            Delete</Button>
        <Button color="secondary"
            startIcon={<EditIcon></EditIcon>}
            onClick={function onClick() {
                updateCompany();
            }}>
            Update</Button>
    </Fragment>
    );
}

export default Company;