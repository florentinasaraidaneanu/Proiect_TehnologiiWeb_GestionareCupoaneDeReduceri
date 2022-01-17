import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Category() {
    const category = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState({
        data: '',
        loading: false,
        loaded: false,
    });


    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [companyId, setCompanyId] = useState('');

    async function fetchCategory() {
        setCategoryData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch(`http://localhost:8080/api/sequelize/get-categories/${category.categoryId}`);

            const data = await response.json();

            setCategoryData({ data: data, loading: false, loaded: true });
            console.log(data);

        } catch (err) {
            setCategoryData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!categoryData.loaded) {
            fetchCategory();
        }
    }, [categoryData.loaded]);

    async function deleteCategory() {
        await fetch(`http://localhost:8080/api/sequelize/delete-category/${category.categoryId}`, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            response.json().then((res) => alert(res)).then(_ => {
                navigate("/categories");
            })
        })
    }

    function setNewCategory(categoryData) {
        setId(categoryData.data.CategoryId);
        setName(categoryData.data.CategoryName);
        setCompanyId(categoryData.data.CompanyId);
    }

    async function updateCategory() {
        const updatedCategory = {
            CategoryName: name,
            CompanyId: companyId
        }

        try {
            const addNewCategory = await fetch(`http://localhost:8080/api/sequelize/update-category/${category.categoryId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedCategory)
                }).then((response) => {
                    response.json().then((res) => alert(res)).then(_ => {
                        setId(-1);
                        setName('');
                        setCompanyId('');
                        navigate('/categories');
                    });
                })
        } catch (err) {
            console.error(err);
        }
    }

    return (<Fragment>
        <h3 src={location?.state} alt={""}>
        </h3>
        {categoryData.loading && <CircularProgress />}
        {categoryData.loaded &&
            <div>
                <h4>
                    {`Category Id: ${categoryData.data.CategoryId}`}

                </h4>
                <h4>
                    {`Category Name:        `}
                    <input type="text" defaultValue={categoryData.data.CategoryName}
                        onChange={(ev) => setName(ev.target.value)}></input>
                </h4>
                <h4>
                    {`Company Id:        `}
                    <input type="text" defaultValue={categoryData.data.CompanyId}
                        onChange={(ev) => setCompanyId(ev.target.value)}></input>
                </h4>
            </div>
        }


        <Button color="secondary"
            startIcon={<DeleteIcon></DeleteIcon>}
            onClick={function onClick() {
                deleteCategory();
            }}>
            Delete</Button>
        <Button color="secondary"
            startIcon={<EditIcon></EditIcon>}
            onClick={function onClick() {
                updateCategory();
            }}>
            Update</Button>
    </Fragment>
    );
}

export default Category;