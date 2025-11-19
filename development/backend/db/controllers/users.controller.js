import { Sequelize } from "sequelize";
import { Users, Roles, Customers, CustomerLogs } from "../../models/model.js";

export const getUserByName = async (name) => {
  return await Users.findOne({
    where: { user_name: name },
  });
};

export const getUserById = async (id) => {
  return await Users.findOne({
    where: { id: id },
  });
};

export const getAllUsers = async () => {
  return await Users.findAll({
    where: {
      is_active: true,
    },
    attributes: [
      "id",
      "user_name",
      "uid",
      "contact_info",
      "created_at",
      [Sequelize.col("roles.role"), "role"],
    ],
    include: [
      {
        model: Roles,
        as: "roles",
        attributes: [],
      },
    ],
    raw: true,
  });
};

export const getUsersWithCustomersAndCallLogs = async (userId) => {
  return await Users.findAll({
    where: {
      id: userId,
    },
    attributes: ["id", "user_name"],
    include: [
      {
        model: Customers,
        as: "customers",
        attributes: [
          "id",
          "customer_name",
          "contact_no",
          "last_contact_date",
          "is_active",
          "pending_amount",
        ],
        include: [
          {
            model: CustomerLogs,
            as: "customerLogs",
            attributes: ["next_follow_up"],
          },
        ],
      },
    ],
    // raw: true
  });
};
