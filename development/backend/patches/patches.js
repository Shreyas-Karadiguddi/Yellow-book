import { QueryTypes } from "sequelize";
import { connection } from "../db/connection.js";

const patches = {
  "0.0.0":
    "ALTER TABLE users MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  "0.0.1": "ALTER TABLE users MODIFY COLUMN is_active BOOL DEFAULT true",
  "0.0.2": "ALTER TABLE customers MODIFY COLUMN is_active BOOL DEFAULT true",
  "0.0.3":
    "ALTER TABLE customers MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  "0.0.4": "ALTER TABLE customers MODIFY COLUMN response VARCHAR(30)",
  "0.0.5": "ALTER TABLE customers ADD COLUMN pending_amount DECIMAL(10,2)",
  "0.0.6": "ALTER TABLE customers ADD COLUMN last_contact_date DATE",
  "0.0.7": "ALTER TABLE customers ADD COLUMN customer_photo LONGTEXT",
  "0.0.8": "ALTER TABLE customers ADD COLUMN business_photo LONGTEXT",
  "0.0.9": "ALTER TABLE customers ADD COLUMN gst VARCHAR(20)",
  "0.1.0": "ALTER TABLE customers ADD COLUMN alternate_no VARCHAR(13)",
  "0.1.1": "ALTER TABLE customers ADD COLUMN whatsapp_no VARCHAR(13)",
  "0.1.2": "RENAME TABLE call_logs TO customer_logs",
  "0.1.3": "ALTER TABLE customer_logs ADD COLUMN approach_type VARCHAR(10)",
  "0.1.4": "ALTER TABLE customers MODIFY COLUMN customer_photo LONGBLOB NULL",
  "0.1.5": "ALTER TABLE customers MODIFY COLUMN business_photo LONGBLOB NULL",
};

const applyPatches = async () => {
  try {
    console.log("CHECKING DATABASE PATCHES");
    const [availablePatches] = await connection.query(
      "SELECT patch_version FROM versions"
    );
    for (const [version, query] of Object.entries(patches)) {
      if (!availablePatches.some((item) => item.patch_version === version)) {
        console.log("APPLYING THE PATCH", version);
        await connection.query(query);
        await connection.query(
          `INSERT INTO versions(patch_version) VALUES (?)`,
          {
            replacements: [version],
            type: QueryTypes.INSERT,
          }
        );
      }
    }
  } catch (err) {
    console.error("ERROR WHILE APPLYING THE PATCHES", err);
  }
};

applyPatches();
