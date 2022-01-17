import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function NewCategory() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [companyId, setCompanyId] = useState('');

    async function addCategory() {
        const newCategory = {
            CategoryName: name,
            CompanyId: companyId
        }

        try {
            const addNewCategory = await fetch("http://localhost:8080/api/sequelize/create-category",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCategory)
                }).then((response) => {
                    response.json().then((res) => alert(res))

                    if (response.status === 200) {
                        navigate("/categories");
                    }
                })
        } catch (err) {
            console.error(err);
        }

    }

    function cancel() {
        navigate("/categories");
    }

    return (
        <Fragment>
            <div className="add">
                Add a new company
            </div>
            <div>
                <div>
                    <input type="text" placeholder="Category Name" onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div>
                    <input type="number" placeholder="Company Id" onChange={(event) => setCompanyId(event.target.value)}></input>
                </div>
                <div>
                    <input type="button" value="Add Category" onClick={addCategory} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>
            </div>
        </Fragment>
    );
}
export default NewCategory;