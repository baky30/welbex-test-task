import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loader = () => {
  return (
    <AiOutlineLoading3Quarters className={'mx-auto animate-spin w-10 h-10 text-green-600'} />
  );
};

export default Loader;
