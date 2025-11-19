import { DataTypes } from "sequelize";
import { connection } from "../db/connection.js";

const Users = connection.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(100),
    },
    uid: {
      type: DataTypes.INTEGER,
    },
    contact_info: {
      type: DataTypes.STRING(100),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.DATE,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

const Roles = connection.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING(20),
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

const Customers = connection.define(
  "customers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_name: {
      type: DataTypes.STRING(50),
    },
    customer_address: {
      type: DataTypes.STRING(150),
    },
    customer_area: {
      type: DataTypes.STRING(100),
    },
    customer_city: {
      type: DataTypes.STRING(100),
    },
    customer_state: {
      type: DataTypes.STRING(100),
    },
    pincode: {
      type: DataTypes.STRING(20),
    },
    contact_no: {
      type: DataTypes.STRING(20),
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING(150),
    },
    last_contact_date: {
      type: DataTypes.DATE,
    },
    pending_amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    response: {
      type: DataTypes.STRING(30),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    customer_photo: {
      type: DataTypes.BLOB,
    },
    business_photo: {
      type: DataTypes.BLOB,
    },
    gst: {
      type: DataTypes.STRING(20),
    },
    alternate_no: {
      type: DataTypes.STRING(13),
    },
    whatsapp_no: {
      type: DataTypes.STRING(13),
    },
  },

  {
    tableName: "customers",
    timestamps: false,
  }
);

const Transactions = connection.define(
  "transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    customer_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    mode_of_payment: {
      type: DataTypes.STRING(20),
    },
    narration: {
      type: DataTypes.STRING(100),
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "transactions",
    timestamps: false,
  }
);

const CustomerLogs = connection.define(
  "customer_logs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    customer_id: {
      type: DataTypes.INTEGER,
    },
    to_customer_no: {
      type: DataTypes.STRING(20),
    },
    response: {
      type: DataTypes.STRING(20),
    },
    narration: {
      type: DataTypes.STRING(300),
    },
    next_follow_up: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    approach_type: {
      type: DataTypes.STRING(10),
    },
  },
  {
    tableName: "customer_logs",
    timestamps: false,
  }
);

// Users → Customers (One-to-Many)
Users.hasMany(Customers, {
  foreignKey: "user_id",
  as: "customers",
});
Customers.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

// Users → Roles (One-to-Many)
Users.hasMany(Roles, {
  foreignKey: "user_id",
  as: "roles",
});
Roles.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

// Users → Transactions (One-to-Many)
Users.hasMany(Transactions, {
  foreignKey: "user_id",
  as: "transactions",
});
Transactions.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

// Users → CustomerLogs (One-to-Many)
Users.hasMany(CustomerLogs, {
  foreignKey: "user_id",
  as: "customerLogs",
});
CustomerLogs.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

// Customers → Transactions (One-to-Many)
Customers.hasMany(Transactions, {
  foreignKey: "customer_id",
  as: "transactions",
});
Transactions.belongsTo(Customers, {
  foreignKey: "customer_id",
  as: "customer",
});

// Customers → CustomerLogs (One-to-Many)
Customers.hasMany(CustomerLogs, {
  foreignKey: "customer_id",
  as: "customer_logs",
});
CustomerLogs.belongsTo(Customers, {
  foreignKey: "customer_id",
  as: "customer",
});

export { Users, Roles, Customers, Transactions, CustomerLogs };
