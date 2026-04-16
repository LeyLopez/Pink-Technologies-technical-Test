const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDataSource } = require("../config/data-source");

const SALT_ROUNDS = 10;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return secret;
}

async function registerUser(email, password) {
  const repository = getDataSource().getRepository("User");
  const existing = await repository.findOne({ where: { email } });

  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const savedUser = await repository.save(
    repository.create({ email, passwordHash })
  );

  return {
    id: savedUser.id,
    email: savedUser.email,
  };
}

async function loginUser(email, password) {
  const repository = getDataSource().getRepository("User");
  const user = await repository.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    getJwtSecret(),
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

module.exports = {
  registerUser,
  loginUser,
};