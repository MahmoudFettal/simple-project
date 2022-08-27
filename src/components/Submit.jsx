function Submit({ type = "Button", action = "submit", text }) {
  return (
    <>
      {type === "Button" ? (
        <input
          type={action}
          value={text}
          className="autofill:text-gray-900 group relative w-full flex justify-center py-2 px-4 border border-transparent font-semibold rounded-md text-white dark:text-gray-900 dark:bg-white dark:hover:bg-gray-200 bg-gray-900 hover:bg-gray-700 focus:outline-none"
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Submit;
