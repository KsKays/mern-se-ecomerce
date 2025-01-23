import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductService from "../../services/product.service";
import Card from "../../components/Card";
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
    >
      NEXT
    </div>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductService.getAllProducts();
      //console.log("API :", response);
      const data = response.data;
      const special = data.filter((item) => item.category === "gadget");
      setProducts(special);
    };
    fetchData();
  }, []);
  const slider = useRef(null);
  const setting = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    nextArrow: <SampleNextArrow></SampleNextArrow>,
    prevArrow: <SampleNextArrow></SampleNextArrow>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 970,
        settings: {
          dots: true,
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 578,
        settings: {
          dots: true,
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="section-container my-20 relative">
      <div className="text-lft">
        <p className="subtitle">Special Item</p>
        <h2 className="title">Standout Items from Our Products</h2>
      </div>
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          className="btn bg rounded-full space-x-2 mr-2"
          onClick={() => slider?.current?.slickPrev()}
        >
          &lt;
        </button>
        <button
          className="btn bg rounded-full space-x-2"
          onClick={() => slider?.current?.slickNext()}
        >
          &gt;
        </button>
      </div>
      <div className="slider-container">
        <Slider
          ref={slider}
          {...setting}
          className="overflow-hidden mt-10 space0-x-5"
        >
          {products.length > 0 &&
            products.map((item, index) => {
              return <Card item={item} key={index} />;
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Product;
