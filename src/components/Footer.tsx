export default function Footer() {
  return (
    <footer className="dark:bg-darkBlue w-full bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-7">
        <p className="text-sm text-center text-gray-500 dark:text-gray-300 ">
          Challenge by{" "}
          <a
            href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca"
            className="font-semibold hover:text-amber-500 transition ease-in"
          >
            Frontend Mentor
          </a>{" "}
          | Coded with ♥ by{" "}
          <a
            href="https://engrjvramos.github.io"
            target="_blank"
            className="font-semibold hover:text-amber-500 transition ease-in"
          >
            Jobie
          </a>
        </p>
      </div>
    </footer>
  );
}
