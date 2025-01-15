"use client";

import Link from "next/link";
import Button from "../Button";
import Image from "next/image";
import Slider from "react-slick";

const slider1 = [
  {
    name: "Transform Your Learning Experience",
    description: "Learn at your own pace, anytime, anywhere.",
    icon: "/le.png",
  },
  {
    name: "Participate in Quizzes",
    description:
      "Test your knowledge and Receive instant feedback to reinforce learning.",
    icon: "/le.png",
  },
  {
    name: "Submit Assignments",
    description:
      "Easily submit assignments and receive timely feedback from your instructor.",
    icon: "/le.png",
  },
  {
    name: "Access to Resources",
    description: "Gain access to a wealth of educational resources",
    icon: "/re.png",
  },
  {
    name: "Announcements",
    description:
      "Send announcements and email reminders to students on course related affairs",
    icon: "/le.png",
  },
];

const About = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          speed: 7000,
        },
      },
    ],
  };

  return (
    <>
      <section className="pb-12">
        <h1 className="text-[34px] leading-[1.3em] lg:text-[42px] lg:leading-[55px] font-medium text-center">
          Features
        </h1>
        <div className="app-width flex flex-col gap-6 mt-10">
          <Slider {...settings}>
            {slider1.map((i, idx) => (
              <div key={idx} className="px-3 h-full flex">
                <div className="bg-[#F9FAFB] h-full border-2 border-[#F3F3F3] shadow-xs flex flex-col rounded-md p-4 lg:p-10 min-h-[360px]">
                  <div className="flex-center h-[230px]">
                    <img
                      src={i.icon ?? "/hseq.svg"}
                      // width={43}
                      // height={43}
                      alt="feature icon"
                    />
                  </div>
                  <div className="min-h-[84px]">
                    <h5 className="text-2xl text-black font-bold mt-3">
                      {i.name}
                    </h5>
                    <p className="mt-2 lg:text-[18px] text-grey-400">
                      {i.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default About;
