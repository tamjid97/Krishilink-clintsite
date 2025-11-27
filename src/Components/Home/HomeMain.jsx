import React from 'react';
import HeroSlider from "../../pages/HeroSlider";
import LatestCrop from './LatestCrops/LatestCrop';



const HomeMain = () => {
  return (
    <div>
      {/* --------------------------- */}
      {/* Hero Section */}
      <div className='-mt-[24px]'>
        <HeroSlider />

      </div>
      {/* Latest crop post: */}
      <div className=''>

        <LatestCrop/>
      </div>
      {/*How it works section:  */}
      <div></div>
      {/* Agro News or blogs section */}
      <div></div>
      {/* extra-1 */}
      <div></div>
      {/* extra-2 */}
      <div></div>

      {/* ---------------------------- */}
    </div>
  );
};

export default HomeMain;