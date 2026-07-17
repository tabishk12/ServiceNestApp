import { Link } from "react-router-dom";

const ErrorScreen = () => {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-white px-6 py-24">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-600">
          Sorry, we couldn't find the page you are looking for.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
