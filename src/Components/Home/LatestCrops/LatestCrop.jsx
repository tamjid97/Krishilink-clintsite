import React from 'react';
import Cardcrops from './Cardcrops';
import { Link } from 'react-router';
import AllCrops from '../../AllCrops';


const latestCropSPromise = fetch('http://localhost:3000/latest-crops').
then(res => res.json());
const LatestCrop = () => {
  return (
    <div className=''>
 <div className="flex flex-col justify-center items-center my-10">
  <h2 className="text-5xl font-bold text-emerald-500 tracking-wide">
    Latest Crop
  </h2>
  
</div>




      <div>
        <Cardcrops latestCropSPromise={latestCropSPromise}>

        </Cardcrops>
      </div>
      <div className='flex justify-center  mt-5'>
      <Link to="AllCrops"
  className="flex justify-center items-center
    mt-4 w-35 py-3 rounded-xl text-white font-semibold
    bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600
    shadow-md hover:shadow-xl 
    hover:brightness-110 hover:-translate-y-1
    transition-all duration-300 ease-out
  "
>
  All Crops
</Link>

      </div>
    </div>
  );
};

export default LatestCrop;