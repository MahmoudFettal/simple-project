import React from "react";

function FormOptions() {
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-gray-900 dark:text-white"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <p className="font-medium text-gray-700 dark:text-gray-400">
            Forgot your password?
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormOptions;
