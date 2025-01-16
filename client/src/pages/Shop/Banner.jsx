const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-12 flex flex-col justify-center items-center">
        <div className="text-center space-y-7 px-4">
          <h2 className="md:text-4xl text-4x font-bold md:leading-snug leading sung">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
            nihil. incidunt earum
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
            enim officiis, ipsam omnis eligendi sint vitae cumque incidunt earum
            reiciendis.
          </p>
          <a
            className="btn bg-red px-8 py-3 font-semibold text-white rounded-full"
            href="/shop"
          >
            Order Now
          </a>
        </div>
      </div>
      Banner
    </div>
  );
};

export default Banner;
