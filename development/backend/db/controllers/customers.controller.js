import { Sequelize, Op } from "sequelize";
import { Customers, CustomerLogs, Users } from "../../models/model.js";

export const getCustomerById = async (customerId) => {
  return await Customers.findOne({
    where: { id: customerId },
  });
};

export const getCustomersByUserId = async (userId) => {
  return await Customers.findAll({
    where: {
      user_id: userId,
    },
  });
};

export const getCustomersByPage = async (page, pagesize) => {
  return await Customers.findAll({
    offset: (page - 1) * pagesize,
    limit: pagesize,
    attributes: {
      exclude: ["customer_photo", "business_photo"],
      include: [
        [
          Sequelize.fn("COUNT", Sequelize.col("customer_logs.id")),
          "approached_count",
        ],
      ],
    },
    include: [
      {
        model: CustomerLogs,
        as: "customer_logs",
        attributes: [],
        required: false,
      },
    ],
    group: Object.keys(Customers.rawAttributes).map(
      (field) => `customers.${field}`
    ),
    raw: true,
    subQuery: false,
    where: {
      is_active: true,
    },
  });
};

export const countCustomersByFilter = async (filter) => {
  return await Customers.count({
    where: {
      is_active: true,
      [Op.or]: [
        {
          customer_name: {
            [Op.like]: `%${filter}%`,
          },
        },
        {
          contact_no: {
            [Op.like]: `%${filter}%`,
          },
        },
      ],
    },
  });
};

export const getCustomersByPageAndFilter = async (page, pagesize, filter) => {
  return await Customers.findAll({
    where: {
      is_active: true,
      [Op.or]: [
        { customer_name: { [Op.like]: `%${filter}%` } },
        { contact_no: { [Op.like]: `%${filter}%` } },
      ],
    },
    offset: (page - 1) * pagesize,
    limit: pagesize,
    attributes: {
      exclude: ["customer_photo", "business_photo"],
      include: [
        [
          Sequelize.fn("COUNT", Sequelize.col("customer_logs.id")),
          "approached_count",
        ],
      ],
    },
    include: [
      {
        model: CustomerLogs,
        as: "customer_logs",
        attributes: [],
      },
    ],
    group: ["customers.id"],
    raw: true,
    subQuery: false,
  });
};
