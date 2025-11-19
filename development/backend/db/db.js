import { Roles, Users, Customers } from "../models/model.js";
import * as auth from "../utils/auth.js";
import * as exceptions from "../db/exceptions.js";
import * as rolesController from "./controllers/roles.controller.js";
import * as usersController from "./controllers/users.controller.js";
import * as customerController from "./controllers/customers.controller.js";
import * as customerLogsController from "./controllers/customersLogs.controller.js";
import * as tranctionController from "./controllers/transactions.controller.js";

export const authenticateUser = async (userName, password) => {
  const user = await usersController.getUserByName(userName);
  if (!user) {
    throw new exceptions.NoUserFound(userName);
  }

  const isPasswordValid = await auth.verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new exceptions.InvalidPassword("Invalid password");
  }

  const role = await rolesController.getRoleByUserId(user.id);
  return auth.generateToken(userName, role.role, user.id);
};

export const createUser = async (userName, password, role, contact, uid) => {
  const user = await usersController.getUserByName(userName);
  if (user) {
    throw new exceptions.UserAlreadyExists(userName);
  }

  const newUser = new Users({
    user_name: userName,
    password: await auth.encrypt(password),
    uid: uid,
    contact_info: contact,
    created_at: new Date(),
    is_active: true,
  });
  await newUser.save();
  const newRole = new Roles({
    role: role,
    user_id: newUser.id,
  });
  await newRole.save();
};

export const resetPasswordByAdmin = async (id, newPasswod) => {
  const user = await usersController.getUserById(id);
  if (!user) {
    throw new exceptions.NoUserFound(id);
  }

  user.password = await auth.encrypt(newPasswod);
  await user.save();
};

export const resetPasswordByUser = async (
  userName,
  oldPassword,
  newPassword
) => {
  const user = await usersController.getUserByName(userName);
  if (!user) {
    throw new exceptions.NoUserFound(userName);
  }

  const isPasswordValid = await auth.verifyPassword(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new exceptions.InvalidPassword("Invalid password");
  }

  user.password = await auth.encrypt(newPassword);
  await user.save();
};

export const updateUser = async (id, userName, contact, role) => {
  const user = await usersController.getUserById(id);
  if (!user) {
    throw new exceptions.NoUserFound(userName);
  }

  const userRole = await rolesController.getRoleByUserId(id);
  user.user_name = userName;
  user.contact_info = contact;
  userRole.role = role;
  await user.save();
  await userRole.save();
};

export const deleteUser = async (user_id) => {
  const user = await usersController.getUserById(user_id);
  if (!user) {
    throw new exceptions.NoUserFound();
  }
  user.is_active = false;
  await user.save();
};

export const getCustomersByPage = async (
  page,
  pageSize,
  filter = undefined
) => {
  const customers = {
    totalPages: 0,
    customers: [],
    totalCustomers: 0,
  };

  if (filter !== undefined) {
    customers.customers = await customerController.getCustomersByPageAndFilter(
      page,
      pageSize,
      filter
    );
    customers.totalCustomers = await customerController.countCustomersByFilter(
      filter
    );
  } else {
    customers.customers = await customerController.getCustomersByPage(
      page,
      pageSize
    );
    customers.totalCustomers = await Customers.count();
  }

  customers.totalPages = Math.ceil(customers.totalCustomers / pageSize);
  return customers;
};

export const createCustomer = async (
  customer_name,
  customer_address,
  customer_area,
  customer_city,
  customer_state,
  pincode,
  contact_no,
  email,
  user_id,
  pending_amount = 0.0,
  gst,
  whatsapp_no,
  alternate_no
) => {
  const user = usersController.getUserById(user_id);
  if (!user) {
    throw new exceptions.NoUserFound(user_id);
  }

  const newCustomer = new Customers({
    customer_name: customer_name,
    customer_address: customer_address,
    customer_area: customer_area,
    customer_city: customer_city,
    customer_state: customer_state,
    pincode: pincode,
    contact_no: contact_no,
    email: email,
    user_id: user_id,
    pending_amount: pending_amount,
    gst: gst,
    whatsapp_no: whatsapp_no,
    alternate_no: alternate_no,
  });
  await newCustomer.save();
};

export const updateCustomer = async (
  id,
  customer_name,
  customer_address,
  customer_area,
  customer_city,
  customer_state,
  pincode,
  contact_no,
  email,
  user_id,
  pending_amount,
  gst,
  whatsapp_no,
  alternate_no,
  response
  // last_contact_date
) => {
  const user = usersController.getUserById(user_id);
  if (!user) {
    throw new exceptions.NoUserFound(user_id);
  }

  const customer = await customerController.getCustomerById(id);
  if (!customer) {
    throw new exceptions.NoCustomerFound(id);
  }

  customer.customer_name = customer_name;
  customer.customer_address = customer_address;
  customer.customer_area = customer_area;
  customer.customer_city = customer_city;
  customer.customer_state = customer_state;
  customer.pincode = pincode;
  customer.contact_no = contact_no;
  customer.email = email;
  customer.user_id = user_id;
  // customer.is_active = is_active;
  customer.pending_amount = pending_amount;
  customer.gst = gst;
  customer.whatsapp_no = whatsapp_no;
  customer.alternate_no = alternate_no;
  customer.response = response;
  //  customer.last_contact_date = last_contact_date;
  await customer.save();
};

export const deleteCustomer = async (id) => {
  const customer = await customerController.getCustomerById(id);
  if (!customer) {
    throw new exceptions.NoCustomerFound(id);
  }
  customer.is_active = false;
  await customer.save();
};

export const assignCustomer = async (customer_id, user_id) => {
  const user = await usersController.getUserById(user_id);
  if (!user) {
    throw new exceptions.NoUserFound(user_id);
  }

  const customer = await customerController.getCustomerById(customer_id);
  if (!customer) {
    throw new exceptions.NoCustomerFound(customer_id);
  }

  customer.user_id = user_id;
  await customer.save();
};

export const getUserInfoById = async (user_id) => {
  const user = usersController.getUserById(user_id);
  if (!user) {
    throw new exceptions.NoUserFound(user_id);
  }

  const userInformation =
    await usersController.getUsersWithCustomersAndCallLogs(user_id);

  const customers = userInformation[0].customers.map((customer) => ({
    customer_id: customer.id,
    customer_name: customer.customer_name,
    contact_no: customer.contact_no,
    last_contact_date: customer.last_contact_date,
    is_active: customer.is_active,
    pending_amount: customer.pending_amount,
    next_follow_up: customer.callLogs?.[0]?.next_follow_up || "Not found",
  }));

  const closed = customers.filter((c) => !c.is_active).length;
  const pending = customers.filter((c) => c.is_active).length;
  const total = customers.length;

  const userInfo = {
    user_id: userInformation[0].id,
    user_name: userInformation[0].user_name,
    closed,
    pending,
    total,
    customers,
  };

  return userInfo;
};

export const uploadImages = async (
  customer_id,
  business_image,
  customer_image
) => {
  const customer = await customerController.getCustomerById(customer_id);
  if (!customer) {
    throw new exceptions.NoCustomerFound(customer_id);
  }
  customer.business_photo = business_image.buffer || null;
  customer.customer_photo = customer_image.buffer || null;
  await customer.save();
};

export const getCustomerImages = async (customer_id) => {
  const customer = await customerController.getCustomerById(customer_id);
  if (!customer) {
    throw new exceptions.NoCustomerFound(customer_id);
  }

  return {
    business_image: customer.business_photo
      ? `data:image/jpeg;base64,${customer.business_photo.toString("base64")}`
      : null,
    customer_image: customer.customer_photo
      ? `data:image/jpeg;base64,${customer.customer_photo.toString("base64")}`
      : null,
  };
};
