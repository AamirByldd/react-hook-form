import { useState } from "react";
import { useForm } from "react-hook-form";

interface UserDetails {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  gender: string;
  hobbies: string[];
  about: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const genderOptions = ["Male", "Female"];
const hobbyOptions = ["Reading", "Sports", "Music", "Traveling"];
const countryOptions = ["India", "Germany", "UK", "USA"];

function ReactForms() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserDetails>();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<UserDetails | null>(null);

  const password = watch("password");

  function onSubmit(data: UserDetails) {
    setFormData(data);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    reset();
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          User Details
        </h1>
        <p className="text-gray-500 text-sm mb-6">Fill in your details below</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
        >
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Gender</span>
            <div className="flex flex-wrap gap-4">
              {genderOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={option}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    {...register("gender", {
                      required: "Please select a gender",
                    })}
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-600 text-xs">{errors.gender.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Hobbies</span>
            <div className="flex flex-wrap gap-4">
              {hobbyOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={option}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                    {...register("hobbies", {
                      validate: (value) =>
                        (value && value.length > 0) ||
                        "Select at least one hobby",
                    })}
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.hobbies && (
              <p className="text-red-600 text-xs">{errors.hobbies.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="about"
            >
              About
            </label>
            <textarea
              id="about"
              className="w-full min-h-20 resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about yourself"
              {...register("about", { required: "This field is required" })}
            />
            {errors.about && (
              <p className="text-red-600 text-xs">{errors.about.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="street"
            >
              Street Address
            </label>
            <input
              id="street"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="123 Main St"
              {...register("address.street", {
                required: "Street address is required",
              })}
            />
            {errors.address?.street && (
              <p className="text-red-600 text-xs">
                {errors.address.street.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:col-span-2">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="city"
              >
                City
              </label>
              <input
                id="city"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="San Francisco"
                {...register("address.city", { required: "City is required" })}
              />
              {errors.address?.city && (
                <p className="text-red-600 text-xs">
                  {errors.address.city.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="state"
              >
                State
              </label>
              <input
                id="state"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="CA"
                {...register("address.state", { required: "State is required" })}
              />
              {errors.address?.state && (
                <p className="text-red-600 text-xs">
                  {errors.address.state.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="zip"
              >
                Zip Code
              </label>
              <input
                id="zip"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="94103"
                {...register("address.zip", {
                  required: "Zip code is required",
                  pattern: {
                    value: /^\d{4,6}$/,
                    message: "Enter a valid zip code",
                  },
                })}
              />
              {errors.address?.zip && (
                <p className="text-red-600 text-xs">
                  {errors.address.zip.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="country"
              >
                Country
              </label>
              <select
                id="country"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("country", {
                  required: "Please select a country",
                })}
              >
                <option value="">Select country</option>
                {countryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-600 text-xs">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      {showModal && formData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Form Submitted
            </h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Name</span>
                <span className="text-gray-900 font-medium">
                  {formData.name}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-900 font-medium">
                  {formData.email}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Country</span>
                <span className="text-gray-900 font-medium">
                  {formData.country}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Gender</span>
                <span className="text-gray-900 font-medium">
                  {formData.gender}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Hobbies</span>
                <span className="text-gray-900 font-medium text-right">
                  {formData.hobbies.join(", ")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">About</span>
                <span className="text-gray-900">{formData.about}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">Address</span>
                <span className="text-gray-900">
                  {formData.address.street}, {formData.address.city},{" "}
                  {formData.address.state} {formData.address.zip}
                </span>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReactForms;
