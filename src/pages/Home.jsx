import React from "react";
import Nav from "../components/Nav";
import app from "../static/app.png";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="grid justify-items-center bg-gray-900 w-full ">
      <Nav />
      <div className="bg-gray-900 px-10 pt-24 pb-48 w-full max-w-7xl">
        <div className="pl-3 text-center">
          <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Welcome to{" "}
            <span className="font-extralight text-gray-200">
              {" "}
              Simple<span className="font-bold">Project</span>{" "}
            </span>
          </h1>
          <p className="mt-4 text-gray-500 text-md sm:text-lg lg:text-xl">
            Manage your projects easily and more effectively
          </p>
        </div>
      </div>
      <div className="grid justify-items-center -mb-36 bg-gray-200 p-10 w-full">
        <img
          src={app}
          className="w-full max-w-7xl h-auto relative -top-40 rounded-lg shadow-lg"
          alt="app screenshot"
        />
      </div>
      <div className="grid justify-items-center bg-white p-10 w-full">
        <div className="w-full max-w-7xl">
          <h2 className="font-bold text-center first-line:selection:text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Why use SimpleProject?
          </h2>
          <hr className="my-10" />
          <div
            id="features"
            className="grid lg:grid-cols-3 place-items-center gap-5"
          >
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                Simple to use
              </h5>
              <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                The app is very intuitive and simple to use, so you can easily
                start working with it
              </p>
            </div>
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                Free to use
              </h5>
              <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                You can use the app for as many projects for free <br /> (for
                now XD)
              </p>
            </div>
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                Always something new
              </h5>
              <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                New features are always in the making you can also request them
                on the github repos
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
