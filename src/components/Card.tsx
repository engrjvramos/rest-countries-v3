import { Link } from "react-router-dom";

interface CountryProps {
  name: string;
  population: number;
  region: string;
  capital: [string];
  flagImg: string;
  flagAlt: string;
}

export default function Card({
  name,
  population,
  region,
  capital,
  flagImg,
  flagAlt,
}: CountryProps) {
  return (
    <li className="countryCard hover:cursor-pointer hover:-translate-y-[10px] dark:bg-darkBlue rounded shadow-lg ">
      <Link to={`${name}`}>
        <div className="w-full h-[180px] rounded-t overflow-hidden">
          <img
            className="object-cover h-full w-full"
            src={flagImg}
            alt={flagAlt}
          />
        </div>
        <div className="py-[10px] px-5">
          <p className="font-bold my-3 text-lg truncate">{name}</p>
          <p className="font-semibold my-2 text-sm">
            Population:{" "}
            <span className="font-light">{population.toLocaleString()}</span>
          </p>
          <p className="font-semibold my-2 text-sm">
            Region: <span className="font-light">{region}</span>
          </p>
          <p className="font-semibold my-2 text-sm">
            Capital: <span className="font-light">{capital}</span>
          </p>
        </div>
      </Link>
    </li>
  );
}
