import express from "express";
import multer from "multer";
import * as db from "../../db/db.js";
import { jwtVerification } from "../../utils/auth.js";
import { checkRequiredField } from "../../utils/validation.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get(
  ["/getcustomers/:page/:pagesize", "/getcustomers/:page/:pagesize/:filter"],
  // jwtVerification,
  async (req, res) => {
    const { page, pagesize, filter } = req.params;
    const customerList = await db.getCustomersByPage(
      parseInt(page),
      parseInt(pagesize),
      filter
    );
    return res.status(200).send(customerList);
  }
);

router.post("/createcustomer", jwtVerification, async (req, res) => {
  try {
    const {
      customer_name,
      customer_address,
      customer_area,
      customer_city,
      customer_state,
      pincode,
      email,
      contact_no,
      gst,
      whatsapp_no,
      alternate_no,
    } = checkRequiredField(req.body, [
      "customer_name",
      "customer_address",
      "customer_area",
      "customer_city",
      "customer_state",
      "pincode",
      "email",
      "contact_no",
      "pending_amount",
      "gst",
      "whatsapp_no",
      "alternate_no",
    ]);

    let { user_id, pending_amount } = req.body;
    if (!user_id) {
      user_id = req.token.userId;
    }

    await db.createCustomer(
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
      alternate_no
    );
    return res.status(200).send("success");
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

router.post("/updatecustomer", jwtVerification, async (req, res) => {
  try {
    const {
      customer_name,
      customer_address,
      customer_area,
      customer_city,
      customer_state,
      pincode,
      contact_no,
      email,
      gst,
      whatsapp_no,
      alternate_no,
    } = checkRequiredField(req.body, [
      "customer_name",
      "customer_address",
      "customer_area",
      "customer_city",
      "customer_state",
      "pincode",
      "contact_no",
      "email",
      "pending_amount",
      "gst",
      "whatsapp_no",
      "alternate_no",
    ]);
    const {
      id,
      user_id,
      pending_amount,
      response,
      //last_contact_date
    } = req.body;
    await db.updateCustomer(
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
      //last_contact_date
    );
    return res.status(200).send("success");
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

router.delete("/deletecustomer/:id", jwtVerification, async (req, res) => {
  try {
    const id = req.params.id;
    await db.deleteCustomer(id);
    return res.status(200).send("success");
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

router.post("/assigncustomer", async (req, res) => {
  try {
    const { customer_id, user_id } = req.body;
    await db.assignCustomer(customer_id, user_id);
    return res.status(200).send("success");
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

router.post(
  "/uploadimages/:customer_id",
  jwtVerification,
  upload.fields([
    { name: "business_image", maxCount: 1 },
    { name: "customer_image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const customer_id = req.params.customer_id;
      const business_image = req.files["business_image"][0];
      const customer_image = req.files["customer_image"][0];
      await db.uploadImages(customer_id, business_image, customer_image);
      return res.status(200).send("success");
    } catch (error) {
      error instanceof Error
        ? res.status(409).send(error.message)
        : res.status(500).send("error");
    }
  }
);

router.get(
  "/getcustomerimages/:customer_id",
  jwtVerification,
  async (req, res) => {
    try {
      const customer_id = req.params.customer_id;
      const images = await db.getCustomerImages(customer_id);
      return res.status(200).send(images);
    } catch (error) {
      error instanceof Error
        ? res.status(409).send(error.message)
        : res.status(500).send("error");
    }
  }
);

export { router };
