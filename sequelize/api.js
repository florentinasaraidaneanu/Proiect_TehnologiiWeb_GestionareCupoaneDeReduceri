import { router } from "../server-init.js";
import "./sync.js";
import { sequelizeOperationsAPI } from "./operations-api.js";
import { Companies } from "./sync.js";

//GET - All companies
router.route("/sequelize/get-companies")
    .get(async function getCompanies(_, response) {
        const result = await sequelizeOperationsAPI.getCompanies();
        if (result.length == 0) {
            response.status(500).json("There is no company to show!");
        }
        else response.status(200).json(result);
    });

//GET - All categories
router.route("/sequelize/get-categories")
    .get(async function getCategories(_, response) {
        const result = await sequelizeOperationsAPI.getCategories();
        if (result.length == 0) {
            response.status(500).json("There is no category to show!");
        }
        else response.status(200).json(result);
    });

//GET - All products
router.route("/sequelize/get-products")
    .get(async function getProducts(_, response) {
        const result = await sequelizeOperationsAPI.getProducts();
        if (result.length == 0) {
            response.status(500).json("There is no product to show!");
        }
        else response.status(200).json(result);
    });

//GET - All coupons
router.route("/sequelize/get-coupons")
    .get(async function getCoupons(_, response) {
        const result = await sequelizeOperationsAPI.getCoupons();
        if (result.length == 0) {
            response.status(500).json("There is no coupon to show!");
        }
        else response.status(200).json(result);
    });

//GET - Companies by id
router.route("/sequelize/get-companies/:companyId")
    .get(async function getCompaniesById(request, response) {
        const companyId = +request.params.companyId;
        sequelizeOperationsAPI.validateId(companyId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getCompaniesById(companyId);
            if (result == null) response.status(500).json(`This company does not exist!`);
            else response.status(200).json(result);
        });
    });

//GET - Categories by id
router.route("/sequelize/get-categories/:categoryId")
    .get(async function getCategoriesById(request, response) {
        const categoryId = +request.params.categoryId;
        sequelizeOperationsAPI.validateId(categoryId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getCategoriesById(categoryId);
            if (result == null) response.status(500).json(`This category does not exist!`);
            else response.status(200).json(result);
        })
    });

//GET - Products by id
router.route("/sequelize/get-products/:productId")
    .get(async function getProductsById(request, response) {
        const productId = +request.params.productId;
        sequelizeOperationsAPI.validateId(productId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getProductsById(productId);
            if (result == null) response.status(500).json(`This product does not exist!`);
            else response.status(200).json(result);
        })
    });

//GET - Coupons by id
router.route("/sequelize/get-coupons/:couponId")
    .get(async function getCouponsById(request, response) {
        const couponId = +request.params.couponId;
        sequelizeOperationsAPI.validateId(couponId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getCouponsById(couponId);
            if (result == null) response.status(500).json(`This coupon does not exist!`);
            else response.status(200).json(result);
        })
    });

//GET - Companies by name
router.route("/sequelize/get-companies-by-name/:companyName")
    .get(async function getCompaniesByName(request, response) {
        const companyName = request.params.companyName;
        const result = await sequelizeOperationsAPI.getCompaniesByName(companyName);
        if (result.length == 0) response.status(500).json(`This company does not exist!`);
        else response.status(200).json(result);

    });

//GET - Categories by name
router.route("/sequelize/get-categories-by-name/:categoryName")
    .get(async function getCategoriesByName(request, response) {
        const categoryName = request.params.categoryName;
        const result = await sequelizeOperationsAPI.getCategoriesByName(categoryName);
        if (result.length == 0) response.status(500).json(`This category does not exist!`);
        else response.status(200).json(result);

    });

//GET - Products by name
router.route("/sequelize/get-products-by-name/:productName")
    .get(async function getProductsByName(request, response) {
        const productName = request.params.productName;
        const result = await sequelizeOperationsAPI.getProductsByName(productName);
        if (result.length == 0) response.status(500).json(`This category does not exist!`);
        else response.status(200).json(result);

    });

//GET - Coupons by value (greater than)
router.route("/sequelize/get-coupons-by-value/:couponValue")
    .get(async function getCouponsByValue(request, response) {
        const couponValue = +request.params.couponValue;
        sequelizeOperationsAPI.validateValue(couponValue, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getCouponsByValue(couponValue);
            if (result.length == 0) response.status(500).json(`There is no coupon with a value greater than ${couponValue}!`);
            else response.status(200).json(result);
        })
    });

//GET - Coupons by code
router.route("/sequelize/get-coupons-by-code/:code")
    .get(async function getCouponsByCode(request, response) {
        const code = request.params.code;
        const result = await sequelizeOperationsAPI.getCouponsByCode(code);
        if (result.length == 0) response.status(500).json(`There is no coupon with this code`);
        else response.status(200).json(result);

    });

//GET - Coupons by category id
router.route("/sequelize/get-coupons-by-category-id/:categoryId")
    .get(async function getCouponsByCategoryId(request, response) {
        const categoryId = +request.params.categoryId;
        sequelizeOperationsAPI.validateId(categoryId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getCouponsByCategoryId(categoryId);
            if (result.length == 0) response.status(500).json(`There is no coupon to display for this category`);
            else response.status(200).json(result);
        })
    });

//GET - Coupons by company id
router.route("/sequelize/get-coupons-by-company-id/:companyId")
    .get(async function getCouponsByCompanyId(request, response) {
        const companyId = +request.params.companyId;
        sequelizeOperationsAPI.validateId(companyId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getCouponsByCompanyId(companyId);
            if (result.length == 0) response.status(500).json(`There is no coupon to display for this company`);
            else response.status(200).json(result);
        })
    });

//POST - Create company
router.route("/sequelize/create-company")
    .post(async function createCompany({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (Object.keys(body).length < 0) {
                    response.status(500).json("The format is incorrect!");
                }
                else {
                    await sequelizeOperationsAPI.createCompany(body);
                    response.status(200).json("The company was created!");
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
    });

//POST - Create category
router.route("/sequelize/create-category")
    .post(async function createCategory({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (Object.keys(body).length < 2) {
                    response.status(500).json("The format is incorrect!");
                }
                else {
                    await sequelizeOperationsAPI.createCategory(body);
                    response.status(200).json("The category was created!");
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
    });

//POST - Create product
router.route("/sequelize/create-product")
    .post(async function createProduct({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (Object.keys(body).length < 4) {
                    response.status(500).json("The format is incorrect!");

                }
                else {
                    await sequelizeOperationsAPI.createProduct(body);
                    response.status(200).json("The product was created!");
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
    });


//POST - Create coupon
router.route("/sequelize/create-coupon")
    .post(async function createCoupon({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (Object.keys(body).length < 6) {
                    response.status(500).json("The format is incorrect!");

                }
                else {
                    await sequelizeOperationsAPI.createCoupon(body);
                    response.status(200).json("The coupn was created!");
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
    });

//POST - Create company with categories
router.route("/sequelize/create-company-with-categories")
    .post(async function createCompanyWithCategories({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                await sequelizeOperationsAPI.createCompanyWithCategories(body);
                response.status(200).json("The company and its categories were created!");
            });
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//POST - Create category with products
router.route("/sequelize/create-category-with-products")
    .post(async function createCategoryWithProducts({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                await sequelizeOperationsAPI.createCategoryWithProducts(body);
                response.status(200).json("The category and its products were created!");
            });
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//PUT - Update company
router.route("/sequelize/update-company/:companyId")
    .put(async function updateCompany({ params: { companyId }, body }, response) {
        try {
            const record = await sequelizeOperationsAPI.getCompaniesById(+companyId);
            if (record == null)
                response.status(200).json("The company does not exist!");
            else {
                sequelizeOperationsAPI.validateId(+companyId, response, async function handleSuccessfulValidation() {
                    sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        await sequelizeOperationsAPI.updateCompany(+companyId, body);
                        response.status(200).json("The company was updated");
                    });
                });
            }

        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//PUT - Update category
router.route("/sequelize/update-category/:categoryId")
    .put(async function updateCategory({ params: { categoryId }, body }, response) {
        try {
            const record = await sequelizeOperationsAPI.getCategoriesById(+categoryId);
            if (record == null)
                response.status(500).json("This category does not exist!");
            else {
                sequelizeOperationsAPI.validateId(+categoryId, response, async function handleSuccessfulValidation() {
                    sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        await sequelizeOperationsAPI.updateCategory(+categoryId, body);
                        response.status(200).json("The category was updated");
                    });
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//PUT - Update product
router.route("/sequelize/update-product/:productId")
    .put(async function updateProduct({ params: { productId }, body }, response) {
        try {
            const record = await sequelizeOperationsAPI.getProductsById(+productId);
            if (record == null)
                response.status(500).json("This product does not exist!");
            else {
                sequelizeOperationsAPI.validateId(+productId, response, async function handleSuccessfulValidation() {
                    sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        await sequelizeOperationsAPI.updateProduct(+productId, body);
                        response.status(200).json("The product was updated");
                    });
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//PUT - Update coupon
router.route("/sequelize/update-coupon/:couponId")
    .put(async function updateCoupon({ params: { couponId }, body }, response) {
        try {
            const record = await sequelizeOperationsAPI.getCouponsById(+couponId);
            if (record == null)
                response.status(500).json("This coupon does not exist!");
            else {
                sequelizeOperationsAPI.validateId(+couponId, response, async function handleSuccessfulValidation() {
                    sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        await sequelizeOperationsAPI.updateCoupon(+couponId, body);
                        response.status(200).json("The coupon was updated");
                    });
                });
            }

        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//DELETE - Delete company
router.route("/sequelize/delete-company/:companyId")
    .delete(async function deleteCompany({ params: { companyId } }, response) {
        try {
            const record = await sequelizeOperationsAPI.getCompaniesById(+companyId);
            if (record == null)
                response.status(200).json("The company does not exist!");
            else {
                sequelizeOperationsAPI.validateId(+companyId, response, async function handleSuccessfulValidation() {
                    await sequelizeOperationsAPI.deleteCompany(+companyId);
                    response.status(200).json("The company was deleted!");
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//DELETE - Delete category
router.route("/sequelize/delete-category/:categoryId")
    .delete(async function deleteCategory({ params: { categoryId } }, response) {
        try {
            const record = await sequelizeOperationsAPI.getCategoriesById(+categoryId);
            if (record == null)
                response.status(500).json("This category does not exist!");
            else {
                sequelizeOperationsAPI.validateId(+categoryId, response, async function handleSuccessfulValidation() {
                    await sequelizeOperationsAPI.deleteCategory(+categoryId);
                    response.status(200).json("The category was deleted!");
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//DELETE - Delete product
router.route("/sequelize/delete-product/:productId")
    .delete(async function deleteProduct({ params: { productId } }, response) {
        try {
            const record = await sequelizeOperationsAPI.getProductsById(+productId);
            if (record == null)
                response.status(500).json("This product does not exist!");
            else {
                sequelizeOperationsAPI.validateId(+productId, response, async function handleSuccessfulValidation() {
                    await sequelizeOperationsAPI.deleteProduct(+productId);
                    response.status(200).json("The product was deleted!");
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//DELETE - Delete coupon by Id
router.route("/sequelize/delete-coupon/:couponId")
    .delete(async function deleteCoupon({ params: { couponId } }, response) {
        try {
            const record = await sequelizeOperationsAPI.getCouponsById(+couponId);
            if (record == null)
                response.status(500).json("This coupon does not exist!");
            else {
                sequelizeOperationsAPI.validateId(+couponId, response, async function handleSuccessfulValidation() {
                    await sequelizeOperationsAPI.deleteCoupon(+couponId);
                    response.status(200).json("The coupon was deleted!");
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });