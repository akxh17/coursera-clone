"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { SiGnuprivacyguard } from "react-icons/si";
import { z } from "zod";
import { useRouter } from "next/navigation";

const userSchema = z
  .object({
    fullName: z.string().min(6, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be atleast 8 character long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof userSchema>;

function registerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({});

    const validation = userSchema.safeParse(formData);
    if (!validation.success) {
      const validationErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          validationErrors[err.path[0]] = err.message;
        }
      });
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("/api/user_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        alert("User registered successfully");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/login");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="register--main--container">
      <div className="register--container">
        <SiGnuprivacyguard className="registration--icon" />
        <h1>Create an account</h1>
        <form className="registration--form" onSubmit={handleSubmit}>
          <div className="registration--input--container">
            <label className="registration--label">Full Name</label>
            <input
              className="registration--input"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="error--message">{errors.fullName}</p>
            )}
          </div>

          <div className="registration--input--container">
            <label className="registration--label">Email ID</label>
            <input
              className="registration--input"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error--message">{errors.email}</p>}
          </div>

          <div className="registration--input--container">
            <label className="registration--label">Password</label>
            <input
              className="registration--input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error--message">{errors.password}</p>
            )}
          </div>

          <div className="registration--input--container">
            <label className="registration--label">Confirm Password</label>
            <input
              className="registration--input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error--message">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="registration--button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default registerPage;
