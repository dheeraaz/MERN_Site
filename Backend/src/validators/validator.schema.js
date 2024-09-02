import { z } from "zod";

// creating an object schema

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of at least 3 characters" })
    .max(40, { message: "Name cannot be more than 40 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least of 4 characters" })
    .max(90, { message: "Email cannot be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone number must be at least of 10 characters" })
    .max(20, { message: "Phone number cannot be more than 20 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "password must be of atleast of 6 characters" })
    .max(90, { message: "password must be of atleast of 90 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least of 4 characters" })
    .max(90, { message: "Email cannot be more than 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "password must be of atleast of 6 characters" })
    .max(90, { message: "password must be of atleast of 90 characters" }),
});

const contactSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of at least 3 characters" })
    .max(40, { message: "Name cannot be more than 40 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least of 4 characters" })
    .max(90, { message: "Email cannot be more than 255 characters" }),

  message: z
    .string({ required_error: "Message is required" })
    .min(4, { message: "Message must be of atleast of 4 characters" }),
});

const editUserSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of at least 3 characters" })
    .max(40, { message: "Name cannot be more than 40 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least of 4 characters" })
    .max(90, { message: "Email cannot be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone number must be at least of 10 characters" })
    .max(20, { message: "Phone number cannot be more than 20 characters" }),
})

export { signupSchema, loginSchema, contactSchema,editUserSchema};
