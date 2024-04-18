import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 200);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="flex justify-center text-white items-center h-screen w-full"
    style={{
        backgroundImage: 'url("/bgmain.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <p
        style={{ opacity: showContent ? 1 : 0 }}
        className="allura text-[400px] transition-opacity duration-1000 ease-in"
      >
        S
      </p>
      <div className="flex flex-col items-start justify-start">
        <div className="flex justify-start items-end align-bottom">
          <p
            style={{ opacity: showContent ? 1 : 0 }}
            className="text-9xl londrinaoutline transition-opacity duration-1000 ease-in delay-300 font-extrabold"
          >
            ELF
          </p>
          <p
            style={{ opacity: showContent ? 1 : 0 }}
            className="text-9xl allura  transition-opacity duration-1000 ease-in delay-500"
          >
            CARE
          </p>
        </div>

        <div className="flex items-end justify-start align-bottom">
          <p
            style={{ opacity: showContent ? 1 : 0 }}
            className="allura text-9xl pr-4  transition-opacity duration-1000 ease-in delay-700"
          >
            By
          </p>
          <p
            style={{ opacity: showContent ? 1 : 0 }}
            className="londrinaoutline text-9xl pr-4   transition-opacity duration-1000 ease-in delay-1000 font-bold"
          >
            SHA
          </p>
          <p
            style={{ opacity: showContent ? 1 : 0 }}
            className="allura text-9xl pr-4   transition-opacity duration-1000 ease-in delay-1000"
          >
            &
          </p>
          <p
            style={{ opacity: showContent ? 1 : 0 }}
            className="londrinaoutline text-9xl  transition-opacity duration-1000 ease-in delay-1000 font-bold"
          >
            RI
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
