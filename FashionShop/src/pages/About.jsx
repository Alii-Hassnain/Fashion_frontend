import React from "react";
import hero3 from "../assets/hero3.jpg";

const About = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              About FashionVista
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Welcome to FashionVista, your ultimate destination for discovering
              the latest trends and timeless styles. We believe fashion is more
              than just clothing—it&apos;s a way to express your unique
              personality.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Our curated collections are designed to inspire and empower you,
              whether you’re dressing for a casual day out or a special
              occasion. At FashionVista, quality, sustainability, and style come
              together to create an unforgettable fashion experience.
            </p>
            <p className="text-lg text-gray-600">
              Join us on a journey to redefine your style and create your own
              fashion vista.
            </p>
          </div>
          {/* About Image */}
          <div>
            <img
              src={hero3}
              alt="About FashionVista"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
