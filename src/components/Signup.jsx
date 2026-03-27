import React, { useState } from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div>
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-slate-700"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
        error
          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
          : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
      }`}
    />
    {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
  </div>
);

const initialLogin = {
  email: "",
  password: "",
  remember: false,
};

const initialSignup = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

export default function Signup() {
  const [mode, setMode] = useState("login");
  const [loginData, setLoginData] = useState(initialLogin);
  const [signupData, setSignupData] = useState(initialSignup);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleLoginChange = (e) => {
    const { name, type, checked, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateLogin = () => {
    const next = {};
    if (!loginData.email.trim()) next.email = "Email is required";
    if (!loginData.password.trim()) next.password = "Password is required";
    return next;
  };

  const validateSignup = () => {
    const next = {};
    if (!signupData.name.trim()) next.name = "Name is required";
    if (!signupData.email.trim()) next.email = "Email is required";
    if (!signupData.password.trim()) next.password = "Password is required";
    if (!signupData.confirmPassword.trim())
      next.confirmPassword = "Confirm your password";
    if (
      signupData.password &&
      signupData.confirmPassword &&
      signupData.password !== signupData.confirmPassword
    ) {
      next.confirmPassword = "Passwords do not match";
    }
    if (!signupData.agree) next.agree = "Please accept the terms";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    const nextErrors = mode === "login" ? validateLogin() : validateSignup();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (mode === "login") {
      console.log("Login payload", loginData);
    } else {
      console.log("Signup payload", signupData);
    }

    setSuccess(
      mode === "login"
        ? "Logged in successfully"
        : "Account created successfully",
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                TaskFlow
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {mode === "login"
                  ? "Sign in to continue managing your tasks."
                  : "Join TaskFlow and start organizing your work."}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrors({});
                  setSuccess("");
                }}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  mode === "login"
                    ? "bg-blue-300 text-indigo-700 shadow"
                    : "hover:text-slate-900"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrors({});
                  setSuccess("");
                }}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  mode === "signup"
                    ? "bg-blue-300 text-indigo-700 shadow"
                    : " hover:text-slate-900"
                }`}
              >
                Sign Up
              </button>
            </div>

            {success ? (
              <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "login" ? (
                <>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="you@example.com"
                    error={errors.email}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    error={errors.password}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={loginData.remember}
                        onChange={handleLoginChange}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Input
                    label="Full Name"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    placeholder="Your name"
                    error={errors.name}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="you@example.com"
                    error={errors.email}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="Create a password"
                    error={errors.password}
                  />
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    placeholder="Repeat password"
                    error={errors.confirmPassword}
                  />
                  <label className="flex items-start gap-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={signupData.agree}
                      onChange={handleSignupChange}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>
                      I agree to the{" "}
                      <span className="font-medium text-slate-900">Terms</span>{" "}
                      and{" "}
                      <span className="font-medium text-slate-900">
                        Privacy Policy
                      </span>
                      .
                    </span>
                  </label>
                  {errors.agree ? (
                    <p className="-mt-2 text-sm text-red-600">{errors.agree}</p>
                  ) : null}
                </>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                {mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600 lg:text-left">
              {mode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
