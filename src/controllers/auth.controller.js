const { loginUser, registerUser } = require("../services/auth.service");

async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await registerUser(email, password);
    return res.status(201).json(user);
  } catch (error) {
    if (error.message === "Email already registered") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Error registering user",
      detail: error.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const result = await loginUser(email, password);
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Error logging in",
      detail: error.message,
    });
  }
}

module.exports = {
  register,
  login,
};