import { Transactions } from "../../models/model.js";

export const deleteTransactionsByCustomerId = async (id) => {
  return Transactions.destroy({
    where: {
      customer_id: id
    }
  });
};
