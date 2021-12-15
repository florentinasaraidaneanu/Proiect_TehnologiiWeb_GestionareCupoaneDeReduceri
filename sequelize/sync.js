import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js"
import { sequelizeOperationsAPI } from "./operations-api.js";

const sequelizeConnection = new Sequelize("proiect_db", "root", "Florentina1802", sequelizeConfigProps);

export const Companies = sequelizeConnection.define("Companies", {
    CompanyId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    CompanyName: {
        type: Sequelize.STRING,
    },
});

export const Categories = sequelizeConnection.define("Categories", {
    CategoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    CategoryName: {
        type: Sequelize.STRING,
    },
    CompanyId: {
        type: Sequelize.INTEGER,
    },
});

Companies.hasMany(Categories, {
    foreignKey: "CompanyId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});

export const Products = sequelizeConnection.define("Products", {
    ProductId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    ProductName: {
        type: Sequelize.STRING,
    },
    ProductPrice: {
        type: Sequelize.DECIMAL(18, 2),
    },
    CategoryId: {
        type: Sequelize.INTEGER,
    },
    CompanyId: {
        type: Sequelize.INTEGER,
    },
});

Companies.hasMany(Products, {
    foreignKey: "CompanyId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});

Categories.hasMany(Products, {
    foreignKey: "CategoryId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});

export const Coupons = sequelizeConnection.define("Coupons", {
    CouponId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    CouponValue: {
        type: Sequelize.DECIMAL(18, 2),
    },
    ExpirationDate: {
        type: Sequelize.STRING,
    },
    Code: {
        type: Sequelize.STRING,
    },
    ProductId: {
        type: Sequelize.INTEGER,
    },
    CategoryId: {
        type: Sequelize.INTEGER,
    },
    CompanyId: {
        type: Sequelize.INTEGER,
    },
});

Companies.hasMany(Coupons, {
    foreignKey: "CompanyId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});
Categories.hasMany(Coupons, {
    foreignKey: "CategoryId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});
Products.hasOne(Coupons, {
    foreignKey: "ProductId"
});
Coupons.belongsTo(Coupons, {
    foreignKey: "ProductId",
});

sequelizeOperationsAPI.init(sequelizeConnection);

export { sequelizeConnection };