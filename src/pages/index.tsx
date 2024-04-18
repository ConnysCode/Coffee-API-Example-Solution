import Image from "next/image";
import { useState, useEffect, FC } from "react";
import { text } from "stream/consumers";

const Img: FC<{ src: string }> = ({ src }) => {
  const [error, setError] = useState(false);

  return (
    <Image
      src={
        !error
          ? src
          : "https://www.verizon.com/learning/_next/static/images/87c8be7b206ab401b295fd1d21620b79.jpg"
      }
      width={1920}
      height={100}
      onError={() => setError(true)}
      alt={"image"}
      className="w-full h-fullk"
    />
  );
};

const Chip: FC<{ text: string }> = ({ text }) => (
  <div className="px-2 py-1 rounded-full bg-slate-100 shadow-sm border text-sm opacity-75 text-slate-800">
    {text}
  </div>
);

enum CoffeeType {
  Iced,
  Hot,
}

export interface CoffeeResponse {
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  id: number;
}

export default function Home() {
  const [page, setPage] = useState<CoffeeType>(CoffeeType.Hot);
  const [iced, setIced] = useState<CoffeeResponse[]>([]);
  const [hot, setHot] = useState<CoffeeResponse[]>([]);

  useEffect(() => {
    fetch("https://cof.cny.sh/iced")
      .then((res) => res.json())
      .then((data) => setIced(data));

    fetch("https://cof.cny.sh/hot")
      .then((res) => res.json())
      .then((data) => setHot(data));
  }, []);

  const coffeeList = (page === CoffeeType.Hot ? hot : iced).filter(
    (coffee) => !!coffee
  );

  return (
    <div className="w-full h-fit p-5 flex flex-col gap-10">
      <div className="p-3 mx-auto border shadow-sm rounded-full bg-white w-fit flex flex-row gap-2">
        <button
          className="hover:scale-105 transition-all duration-200 ease-in-out active:scale-95"
          onClick={() => {
            setPage(CoffeeType.Iced);
          }}
        >
          <Chip text={"Iced Coffees"} />
        </button>
        <button
          className="hover:scale-105 transition-all duration-200 ease-in-out active:scale-95"
          onClick={() => {
            setPage(CoffeeType.Hot);
          }}
        >
          <Chip text={"Hot Coffees"} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-5 mx-auto w-1/2">
        {coffeeList.map((coffee) => {
          const imageValid = coffee.image.startsWith("http");

          return (
            <div
              key={coffee.id}
              className="flex flex-col bg-white shadow-md rounded-md border"
            >
              {imageValid && (
                <div className="w-full overflow-hidden aspect-video">
                  <Img src={coffee.image} />
                </div>
              )}
              <div className="p-3 flex flex-col justify-between border grow">
                <div>
                  <p className="text-lg text-slate-800">{coffee.title}</p>
                  <div
                    dangerouslySetInnerHTML={{ __html: coffee.description }}
                    className="text-sm opacity-75 text-slate-800"
                  />
                </div>
                <div>
                  <hr className="my-4" />
                  <p className="text-base pb-2 text-slate-800">
                    Required Ingedients
                  </p>
                  <div className="flex flex-row gap-2">
                    {coffee.ingredients.map((ingredient) => {
                      return <Chip key={ingredient} text={ingredient} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
