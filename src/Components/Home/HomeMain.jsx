import React from 'react';
import HeroSlider from "../../pages/HeroSlider";
import LatestCrop from './LatestCrops/LatestCrop';
import HowToWork from '../HowToWork';
import AgroNews from './AgroNews';
import Donate from './Donet';
import AgroDoctor from './AgroDocter';



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
      <div>
        <HowToWork/>
      </div>
      {/* Agro News or blogs section */}
      <div>
        <AgroNews/>
      </div>
      {/* extra-1 */}
      <div>
        <Donate/>
      </div>
      {/* extra-2 */}
      <div>
        <AgroDoctor/>
      </div>

      {/* ---------------------------- */}
    </div>
  );
};

export default HomeMain;