const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../src/middleware/auth.middleware");

describe("authenticateToken", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret";
  });

  it("should return 401 when Authorization header is missing", () => {
    const req = { headers: {} };
    const res = {
      statusCode: 200,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      },
    };

    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next when token is valid", () => {
    const token = jwt.sign({ sub: 1, email: "test@example.com" }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      },
    };

    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user.email).toBe("test@example.com");
  });

  it("should accept lowercase bearer scheme", () => {
    const token = jwt.sign({ sub: 1, email: "test@example.com" }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `bearer ${token}` } };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      },
    };

    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user.email).toBe("test@example.com");
  });

  it("should accept double bearer prefix from Swagger input mistakes", () => {
    const token = jwt.sign({ sub: 1, email: "test@example.com" }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer Bearer ${token}` } };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      },
    };

    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user.email).toBe("test@example.com");
  });
});