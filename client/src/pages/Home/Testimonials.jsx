const Testimonials = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What our customer say about us</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              labore quibusdam pariatur ipsam corporis animi incidunt eos!
              Sapiente qui similique debitis molestias eum optio, cumque
              provident ea sequi adipisci illo."
            </blockquote>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial3.png" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-12">
                    <span>+9</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <div className="rating">
                    <input
                      type="radio"
                      className="mask mask-star-2 bg-orange-400"
                      disabled
                      defaultChecked
                    />
                    <div>
                      <span className="font-semibold">4.9</span>
                      <span className="text-#[907E7E]"> (88.8K Reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
