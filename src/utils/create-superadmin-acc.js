const bcrypt = require("bcrypt");
const User = require("../database/models/user-model");

exports.createSuperAdminAccount = async () => {
  const superadminExists = await User.findOne({ role: "SuperAdmin" });

  const hashedPassword = await bcrypt.hash("123456", 10);

  if (!superadminExists) {
    const superadmin = new User({
      username: "Super Admin",
      email: "superadmin@gmail.com",
      password: hashedPassword,
      role: "SuperAdmin",
    });

    await superadmin.save();
    console.log("SuperAdmin account created.");
  }
};
