import { Roles } from "../../models/model.js";

export const getRoleByUserId = async (userId) => {
  return await Roles.findOne({
    where: { user_id: userId }
  });
};
