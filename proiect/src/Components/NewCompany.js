import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function NewCompany() {

    const navigate = useNavigate();
    const [name, setName] = useState('');

    async function addCompany() {
        const newCompany = {
            CompanyName: name
        }

        try {
            const addNewCompany = await fetch("http://localhost:8080/api/sequelize/create-company",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCompany)
                }).then((response) => {
                    response.json().then((res) => alert(res))

                    if (response.status === 200) {
                        navigate("/companies");
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    function cancel() {
        navigate("/companies");
    }

    return (
        <Fragment>
            <div className="add">
                Add a new company
            </div>
            <div>
                <div>
                    <input type="text" placeholder="Company Name" onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div>
                    <input type="button" value="Add Company" onClick={addCompany} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>
            </div>
        </Fragment>
    );
}

export default NewCompany;