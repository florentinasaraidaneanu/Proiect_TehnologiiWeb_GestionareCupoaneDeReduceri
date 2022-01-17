import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, CircularProgress } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add";


function Categories() {
    const navigate = useNavigate();
    const [categoriesData, setCategoriesData] = useState({
        data: {},
        loading: false,
        loaded: false,
    });

    async function fetchCategories() {
        setCategoriesData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch("http://localhost:8080/api/sequelize/get-categories");
            const data = await response.json();
            setCategoriesData({ data: data, loading: false, loaded: true });
        } catch (err) {

            setCategoriesData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });
            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!categoriesData.loaded) {
            fetchCategories();
        }
    }, [categoriesData.loaded]);
    return (
        <Fragment>
            <div className="lists">
                List of available categories</div>
            {categoriesData.loading && <CircularProgress />}
            {categoriesData.loaded && categoriesData.data.map(function
                renderCategory(category) {
                return (

                    <h4 key={category.CategoryId}>
                        {category.CategoryName}
                        <Link to={`/categories/${category.CategoryId}`}
                            state={{
                                categoryName: category.CategoryName,
                                companyId: category.CompanyId
                            }}
                        > More </Link>
                    </h4>

                );
            })}

            <Button
                startIcon={<AddIcon></AddIcon>}
                color="secondary"
                onClick={function onClick() {
                    navigate("/categories/newCategory");
                }}>
                Add a new category
            </Button>
        </Fragment>

    );
}
export default Categories;