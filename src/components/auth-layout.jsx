import React from "react";

const AuthLayout = (props) => {
  const { image, children } = props;

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 p-8 pr-0">
        <div className="flex items-center justify-center bg-gray-50 rounded-lg h-full w-full">
          <div className="max-w-md max-h-md">
            <img
              src={image}
              className="w-full h-screen aspect-square object-contain"
              alt="img"
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
