const customerModel = require("../../model/customerModel");
const { responseReturn } = require("../../utils/response");
const sellerCustomerModel = require("../../model/chat/sellerCustomerModel");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/tokenCreate");
const nodemailer = require("nodemailer");

class cutomerAuthController {
  constructor() {
    // Initialize  otpStore

    this.otpStore = {};
  }
  // method for creating an otp
  createOtp() {
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    console.log(otp);
    return { otp, expirationTime };
  }
  // method for sending the otp
  sendEmailWithOtp = async (email) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "naveen.prakash.kv@gmail.com",
        pass: "tens lfeb uihx gnvo", // Use app password if 2FA is enabled
      },
    });

    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code for Easy Shop",
        text: `Your OTP is: ${
          this.otpStore[email].otp
        } and expires at: ${new Date(
          this.otpStore[email].expirationTime
        ).toLocaleString()}`,
      });

      console.log("Email sent: %s", info.messageId);
      return { success: true, message: "OTP sent successfully!" };
    } catch (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        message: "Error sending OTP",
        error: error.message,
      };
    }
  };

  customer_register = async (req, res) => {
    // Trim inputs
    const { name, email, password } = req.body;
    const trimmedData = {
      name: name?.trim(),
      email: email?.trim(),
      password: password?.trim(),
    };

    try {
      // Validate input
      const {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      } = trimmedData;

      if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        return responseReturn(res, 400, { error: "All fields are mandatory" });
      }

      // Check if customer already exists
      const existingCustomer = await customerModel.findOne({
        email: trimmedEmail,
        isBlocked: false,
      });
      if (existingCustomer) {
        return responseReturn(res, 400, {
          error: "You are already registered. Please login.",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

      // Create a new customer
      const createCustomer = await customerModel.create({
        name: trimmedName,
        email: trimmedEmail,
        password: hashedPassword,
        method: "manual",
      });

      // Add entry in sellerCustomerModel for chat
      await sellerCustomerModel.create({
        myId: createCustomer._id,
      });

      // Generate JWT token
      const token = await createToken({
        id: createCustomer._id,
        name: createCustomer.name,
        email: createCustomer.email,
        method: createCustomer.method,
      });

      // Set cookie with the token
      res.cookie("customerToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      });

      return responseReturn(res, 201, {
        token,
        message: "User registered successfully",
      });
    } catch (error) {
      console.error(`Error in customer registration: ${error.message}`);
      return responseReturn(res, 500, { error: "Internal server error" });
    }
  };
  customer_login = async (req, res) => {
    // Trim inputs
    const { email, password } = req.body;
    const trimmedData = {
      email: email?.trim(),
      password: password?.trim(),
    };

    try {
      // Validate input
      const { email: trimmedEmail, password: trimmedPassword } = trimmedData;

      if (!trimmedEmail || !trimmedPassword) {
        return responseReturn(res, 400, { error: "All fields are mandatory" });
      }

      let isBlocked = await customerModel.findOne({
        email: trimmedEmail,
        isBlocked: true,
      });
      if (isBlocked) {
        return responseReturn(res, 404, { error: "You are blocked by admin" });
      }
      // Check if customer already exists
      const customer = await customerModel
        .findOne({
          email: trimmedEmail,
          isBlocked: false,
        })
        .select("+password");
      if (!customer) {
        return responseReturn(res, 400, {
          error: "Email not registerd Please Register first",
        });
      }

      // Hash the password
      const match = await bcrypt.compare(trimmedPassword, customer.password);
      if (!match) {
        return responseReturn(res, 400, {
          error: "invalid credentials",
        });
      }

      // Generate JWT token
      const token = await createToken({
        id: customer._id,
        name: customer.name,
        email: customer.email,
        method: customer.method,
      });

      // Set cookie with the token
      res.cookie("customerToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      });

      return responseReturn(res, 201, {
        token,
        message: "Login successfully",
      });
    } catch (error) {
      console.error(`Error in customer registration: ${error.message}`);
      return responseReturn(res, 500, { error: "Internal server error" });
    }
  };
  google_signin = async (req, res) => {
    const { email, name } = req.body.userInfo;
    console.log("in google sign in controller ", req.body.userInfo);

    try {
      if (!email || !name) {
        return responseReturn(res, 400, {
          error: "Error please user other method to login",
        });
      }
      let isBlocked = await customerModel.findOne({
        email,
        isBlocked: true,
      });
      if (isBlocked) {
        return responseReturn(res, 403, { error: "You are blocked by admin" });
      }

      let customer = await customerModel.findOne({
        email,
        isBlocked: false,
      });

      if (!customer) {
        // If user doesn't exist, create a new one
        customer = new customerModel({
          name,
          email,
          method: "google",
          password: null,
        });
        await customer.save();
      }

      // Generate JWT token
      const authToken = await createToken({
        id: customer._id,
        name: customer.name,
        email: customer.email,
        method: customer.method,
      });

      // Set the JWT token in the cookie
      res.cookie("customerToken", authToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expiration (1 week)
      });

      // Send response with token
      return responseReturn(res, 201, {
        token: authToken,
        message: "Login successful via Google",
      });
    } catch (error) {
      console.error(`Error in Google Sign-In: ${error.message}`);
      return responseReturn(res, 500, { error: "Internal server error" });
    }
  };

  send_otp = async (req, res) => {
    console.log("Sending OTP", req.body);
    const { email } = req.body;

    if (!email) {
      return responseReturn(res, 400, { error: "Email is required" });
    }

    // Generate and store OTP
    this.otpStore[email] = this.createOtp();

    try {
      // Send OTP to the provided email
      const result = await this.sendEmailWithOtp(email);

      if (result.success) {
        return responseReturn(res, 200, { message: "OTP sent successfully!" });
      } else {
        // If email sending fails, return a 500 error with a descriptive message
        return responseReturn(res, 500, { error: "Error while sending OTP" });
      }
    } catch (error) {
      console.error("Error sending otp:", error);
      return responseReturn(res, 500, { error: "Error while sending OTP" });
    }
  };

  verify_otp = async (req, res) => {
    console.log("Verifying OTP", req.body);
    const { email, otp, password, name } = req.body;

    // Validate that email, OTP, password, and name are provided
    if (!email || !otp || !password || !name) {
      return responseReturn(res, 400, {
        error: "Email, OTP, password, and name are required",
      });
    }

    // Check if OTP exists for the email
    if (!this.otpStore[email]) {
      return responseReturn(res, 400, { error: "OTP not found or expired" });
    }

    const storedOtp = this.otpStore[email].otp;
    const expirationTime = this.otpStore[email].expirationTime;

    // Verify OTP and check for expiration
    if (storedOtp !== otp) {
      return responseReturn(res, 400, { error: "Invalid OTP" });
    }

    if (new Date() > new Date(expirationTime)) {
      // OTP expired
      delete this.otpStore[email]; // Clear expired OTP
      return responseReturn(res, 400, { error: "OTP has expired" });
    }

    // OTP is valid, proceed with account creation (save user with email, password, and name)
    try {
      // Clean and validate input data
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        return responseReturn(res, 400, { error: "All fields are mandatory" });
      }

      // Check if the customer already exists
      const existingCustomer = await customerModel.findOne({
        email: trimmedEmail,
        isBlocked: false,
      });
      if (existingCustomer) {
        return responseReturn(res, 400, {
          error: "You are already registered. Please login.",
        });
      }

      // Hash the password securely
      const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

      // Create a new customer
      const createCustomer = await customerModel.create({
        name: trimmedName,
        email: trimmedEmail,
        password: hashedPassword,
        method: "manual", // Assuming 'manual' is the registration method
      });

      // Link customer with seller model (if applicable)
      await sellerCustomerModel.create({
        myId: createCustomer._id,
      });

      // Generate JWT token
      const token = await createToken({
        id: createCustomer._id,
        name: createCustomer.name,
        email: createCustomer.email,
        method: createCustomer.method,
      });

      // Set cookie with the token
      res.cookie("customerToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week expiration
      });

      // Return success response with token
      return responseReturn(res, 201, {
        token,
        message: "User registered successfully",
      });
    } catch (error) {
      console.error("Error creating account:", error);
      return responseReturn(res, 500, { error: "Error creating account" });
    }
  };
}

module.exports = new cutomerAuthController();