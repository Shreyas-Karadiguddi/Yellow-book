import { CustomerLogs } from "../../models/model.js";

export const deleteCallLogsByCustomerId = async (id) => {
  return await CustomerLogs.destroy({
    where: {
      customer_id: id,
    },
  });
};

export const getNextFollowUpDatesByUserandCustomerId = async (
  userId,
  customerId
) => {
  return await CustomerLogs.findAll({
    where: {
      customer_id: customerId,
      user_id: userId,
    },
  });
};
