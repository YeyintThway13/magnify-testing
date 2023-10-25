require("dotenv").config();

const app = require("./app");
const connectDb = require("./database/db");
const { createSuperAdminAccount } = require("./utils/create-superadmin-acc");

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`App is up and running on ${PORT}`);
  await connectDb();
  await createSuperAdminAccount();
});
