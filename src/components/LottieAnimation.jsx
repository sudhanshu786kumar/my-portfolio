import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../developer.json';

const LottieAnimation = () => {
  return (
    <div className="w-full h-full">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieAnimation;