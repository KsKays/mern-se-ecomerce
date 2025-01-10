import { useState } from "react";

const serviceList = [
  {
    id: 1,
    title: "High-Quality",
    description: "Lorem ipsum dolor sit amet.",
    image: "/images/home/services/assurance.png",
  },
  {
    id: 2,
    title: "High-Quality",
    description: "Lorem ipsum dolor sit amet.",
    image: "/images/home/services/fast-delivery.png",
  },
  {
    id: 3,
    title: "High-Quality",
    description: "Lorem ipsum dolor sit amet.",
    image: "/images/home/services/order.png",
  },
  {
    id: 4,
    title: "High-Quality",
    description: "Lorem ipsum dolor sit amet.",
    image: "/images/home/services/gift.png",
  },
];

const Service = () => {
  const [myServices, setMyServices] = useState(serviceList);
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Journey and Service</h2>
            <p className="my-5 text-secondary leading-[30px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              labore quibusdam pariatur ipsam corporis animi incidunt eos!
              Sapiente qui similique debitis molestias eum optio, cumque
              provident ea sequi adipisci illo."
            </p>
            <button className="btn bg-red font-semibold text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {myServices.length > 0 &&
              myServices.map((item) => (
                <div
                  key={item.id}
                  className="shadow-md rounded-lg py-5 px-4 text-center space-y-2 text-red cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out hover:border-2 hover:border-indigo-600 hover:bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mx-auto h-16"
                  />
                  <h5 className="font-semibold">{item.title}</h5>
                  <p className="text-[#1E1E1E]">{item.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
