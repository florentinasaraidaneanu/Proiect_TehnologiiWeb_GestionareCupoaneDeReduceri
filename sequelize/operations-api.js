import { Categories, Companies, Products, Coupons } from "./sync.js";
import seq from "sequelize";
import express from "express";

async function sequelizeAuth(sequelizeConnection) {
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize has successfully connected to the database!");
    }
    catch (err) {
        console.error(`There was an error connecting to the database : ${err}`);
    }
}

async function sequelizeSync(sequelizeConnection) {
    try {
        await sequelizeConnection.sync({ force: false, alter: true });
        console.log("Sync completed!");
    }
    catch (err) {
        console.error(`Sync failed : ${err}`);
    }
}

// async function executeInitialDatabasePopulation() {
//     await Companies.create({
//         CompanyName: "ppt.ro",
//     });
//     await Companies.create({
//         CompanyName: "carturesti.ro",
//     });
//     await Companies.create({
//         CompanyName: "epantofi.ro",
//     });
//     await Categories.create({
//         CategoryName: "Jeans",
//         CompanyId: 1,
//     });
//     await Categories.create({
//         CategoryName: "Carte fictiune",
//         CompanyId: 2,
//     });
//     await Categories.create({
//         CategoryName: "Carte istorie",
//         CompanyId: 2,
//     });
//     await Categories.create({
//         CategoryName: "Ghete copii",
//         CompanyId: 3,
//     });
//     await Products.create({
//         ProductName: "Blugi dama talie inalta",
//         ProductPrice: 98.99,
//         CategoryId: 1,
//         CompanyId: 1,
//     });
//     await Products.create({
//         ProductName: "Marile sperante",
//         ProductPrice: 35.98,
//         CategoryId: 2,
//         CompanyId: 2,
//     });
//     await Products.create({
//         ProductName: "Istoria Romaniei",
//         ProductPrice: 85.98,
//         CategoryId: 3,
//         CompanyId: 2,
//     });
//     await Products.create({
//         ProductName: "Ghete din piele ecologica 2-3Y",
//         ProductPrice: 35.98,
//         CategoryId: 4,
//         CompanyId: 3,
//     });
//     await Coupons.create({
//         CouponValue: 15.32,
//         ExpirationDate: "2021/12/29",
//         Code: "BOOKS21",
//         ProductId: 2,
//         CategoryId: 2,
//         CompanyId: 2,
//     });
//     await Coupons.create({
//         CouponValue: 15.32,
//         ExpirationDate: "2021/12/29",
//         Code: "BOOKS21",
//         ProductId: 3,
//         CategoryId: 2,
//         CompanyId: 2,
//     });
// }

async function sequelizeInit(sequelizeConnection) {
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
    //await executeInitialDatabasePopulation();
}

function validateId(sentId, response, callbackFn = function () { }) {
    if (Number.isFinite(sentId) && sentId > 0) return callbackFn();
    else response.status(500).json("Invalid id!");
}
function validateValue(sentValue, response, callbackFn = function () { }) {
    if (Number.isFinite(sentValue) && sentValue > 0) return callbackFn();
    else response.status(500).json("Invalid value!");
}
function validateBody(sentBody, response, callbackFn = function () { }) {
    if (Object.keys(sentBody).length != 0) return callbackFn();
    else response.status(500).json("Body is missing!");
}

async function execAsyncRequest(asyncRequest) {
    try {
        return await asyncRequest();
    } catch (err) {
        throw err;
    }
}

async function getCompanies() {
    return await execAsyncRequest(async function retreivedCompanies() {
        return await Companies.findAll();
    })
}

async function getCategories() {
    return await execAsyncRequest(async function retreivedCategories() {
        return await Categories.findAll();
    })
}

async function getProducts() {
    return await execAsyncRequest(async function retreivedProducts() {
        return await Products.findAll();
    })
}

async function getCoupons() {
    return await execAsyncRequest(async function retreivedCoupons() {
        return await Coupons.findAll();
    })
}

async function getCompaniesById(companyId) {
    return await execAsyncRequest(async function retreivedCompanies() {
        return Companies.findByPk(companyId);
    });
}

async function getCategoriesById(categoryId) {
    return await execAsyncRequest(async function retreivedCategories() {
        return Categories.findByPk(categoryId);
    });
}

async function getProductsById(productId) {
    return await execAsyncRequest(async function retreivedCategories() {
        return Products.findByPk(productId);
    });
}

async function getCouponsById(couponId) {
    return await execAsyncRequest(async function retreivedCategories() {
        return Coupons.findByPk(couponId);
    });
}

async function getCompaniesByName(companyName) {
    return await execAsyncRequest(async function retreivedCompanies() {
        return Companies.findAll({ where: { CompanyName: { [seq.Op.substring]: companyName } } });
    })
}

async function getCategoriesByName(categoryName) {
    return await execAsyncRequest(async function retreivedCategories() {
        return Categories.findAll({ where: { CategoryName: { [seq.Op.substring]: categoryName } } });
    })
}

async function getProductsByName(productName) {
    return await execAsyncRequest(async function retreivedProducts() {
        return Products.findAll({ where: { ProductName: { [seq.Op.substring]: productName } } });
    })
}

async function getCouponsByValue(couponValue) {
    return await execAsyncRequest(async function retreivedCoupons() {
        return Coupons.findAll({ where: { CouponValue: { [seq.Op.gte]: couponValue } } });
    });
}

async function getCouponsByCode(code) {
    return await execAsyncRequest(async function retreivedCoupons() {
        return Coupons.findAll({ where: { Code: { [seq.Op.substring]: code } } });
    });
}

async function getCouponsByCategoryId(categoryId) {
    return await execAsyncRequest(async function retreivedCoupons() {
        return Coupons.findAll({ where: { CategoryId: categoryId } });
    });
}

async function getCouponsByCompanyId(companyId) {
    return await execAsyncRequest(async function retreivedCoupons() {
        return Coupons.findAll({ where: { CompanyId: companyId } });
    });
}

async function createCompany(company) {
    await execAsyncRequest(async function createCompany() {
        await Companies.create({
            CompanyName: company.CompanyName,
        });
    });
}

async function createCategory(category) {
    await execAsyncRequest(async function createCategory() {
        await Categories.create({
            CategoryName: category.CategoryName,
            CompanyId: category.CompanyId,
        });

    });
}

async function createProduct(product) {
    await execAsyncRequest(async function createProduct() {
        if (product.CategoryId)
            await Products.create({
                ProductName: product.ProductName,
                ProductPrice: product.ProductPrice,
                CategoryId: product.CategoryId,
                CompanyId: product.CompanyId,
            });
    });
}

async function createCoupon(coupon) {
    await execAsyncRequest(async function createCoupon() {
        await Coupons.create({
            CouponValue: coupon.CouponValue,
            ExpirationDate: coupon.ExpirationDate,
            Code: coupon.Code,
            ProductId: coupon.ProductId,
            CategoryId: coupon.CategoryId,
            CompanyId: coupon.CompanyId,
        });
    });
}

async function createCompanyWithCategories(company) {
    await execAsyncRequest(async function createCompanyWithCategories() {
        const result = await Companies.create({
            CompanyName: company.CompanyName,
        });
        var { Categories: categories } = company;
        categories.forEach(category => {
            Categories.create({
                CategoryName: category.CategoryName,
                CompanyId: result.CompanyId,
            });
        });
    });
}

async function createCategoryWithProducts(category) {
    await execAsyncRequest(async function createCategoryWithProducts() {
        const result = await Categories.create({
            CategoryName: category.CategoryName,
            CompanyId: category.CompanyId,
        });
        var { Products: products } = category;
        products.forEach(product => {
            Products.create({
                ProductName: product.ProductName,
                ProductPrice: product.ProductPrice,
                CategoryId: result.CategoryId,
                CompanyId: result.CompanyId,
            });
        });
    });
}

async function updateCompany(companyId, company) {
    await execAsyncRequest(async function updateCompany() {
        const record = await Companies.findByPk(companyId);
        if (record) {
            await record.update({
                CompanyName: company.CompanyName,
            });
        }
    });
}

async function updateCategory(categoryId, category) {
    await execAsyncRequest(async function updateCategory() {
        const record = await Categories.findByPk(categoryId);
        if (record) {
            await record.update({
                CategoryName: category.CategoryName,
                CompanyId: category.CompanyId,
            });
        }
    });
}

async function updateProduct(productId, product) {
    await execAsyncRequest(async function updateProduct() {
        const record = await Products.findByPk(productId);
        if (record) {
            await record.update({
                ProductName: product.ProductName,
                ProductPrice: product.ProductPrice,
                CategoryId: product.CategoryId,
                CompanyId: product.CompanyId,
            });
        }
    });
}

async function updateCoupon(couponId, coupon) {
    await execAsyncRequest(async function updateCoupon() {
        const record = await Coupons.findByPk(couponId);
        if (record) {
            await record.update({
                CouponValue: coupon.CouponValue,
                ExpirationDate: coupon.ExpirationDate,
                Code: coupon.Code,
                ProductId: coupon.ProductId,
                CategoryId: coupon.CategoryId,
                CompanyId: coupon.CompanyId,
            });
        }
    });
}

async function deleteCompany(companyId) {
    await execAsyncRequest(async function deleteCompany() {
        const record = await Companies.findByPk(companyId);
        if (record) await record.destroy();
    });
}

async function deleteCategory(categoryId) {
    await execAsyncRequest(async function deleteCategory() {
        const record = await Categories.findByPk(categoryId);
        if (record) await record.destroy();
    });
}

async function deleteProduct(productId) {
    await execAsyncRequest(async function deleteProduct() {
        const record = await Products.findByPk(productId);
        if (record) await record.destroy();
    });
}

async function deleteCoupon(couponId) {
    await execAsyncRequest(async function deleteCoupon() {
        const record = await Coupons.findByPk(couponId);
        if (record) await record.destroy();
    })
}
export const sequelizeOperationsAPI = {
    init: sequelizeInit,
    validateId: validateId,
    validateValue: validateValue,
    validateBody: validateBody,
    getCompanies: getCompanies,
    getCategories: getCategories,
    getProducts: getProducts,
    getCoupons: getCoupons,
    getCompaniesById: getCompaniesById,
    getCategoriesById: getCategoriesById,
    getProductsById: getProductsById,
    getCouponsById: getCouponsById,
    getCompaniesByName: getCompaniesByName,
    getCategoriesByName: getCategoriesByName,
    getProductsByName: getProductsByName,
    getCouponsByValue: getCouponsByValue,
    getCouponsByCode: getCouponsByCode,
    getCouponsByCategoryId: getCouponsByCategoryId,
    getCouponsByCompanyId: getCouponsByCompanyId,
    createCompany: createCompany,
    createCategory: createCategory,
    createProduct: createProduct,
    createCoupon: createCoupon,
    createCompanyWithCategories: createCompanyWithCategories,
    createCategoryWithProducts: createCategoryWithProducts,
    updateCompany: updateCompany,
    updateCategory: updateCategory,
    updateProduct: updateProduct,
    updateCoupon: updateCoupon,
    deleteCompany: deleteCompany,
    deleteCategory: deleteCategory,
    deleteProduct: deleteProduct,
    deleteCoupon: deleteCoupon,
};