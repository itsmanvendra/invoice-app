import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHourglassStart, faFileCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faFile, faBell} from '@fortawesome/free-regular-svg-icons'
library.add(faFile, faBell, faHourglassStart, faFileCircleCheck)

const Analysis = ({ percentage, name, numInvoices, color, icon }) => {


  return (
    <div className=" p-2 rounded-md shadow-md flex items-center bg-[#193051]">
      <div className="w-4/10 p-2">
        <div className="relative">
              {/* Circular border with padding */}
            <CircularProgressbarWithChildren value={percentage} className='w-16 h-16'
                      strokeWidth={6} styles={buildStyles({
            
                trailColor: "#701a75",
                pathColor: color,
            })}
            >
            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
            <div className='flex items-center justify-center w-10 h-10' >
              {(icon === "faFile") ? (<FontAwesomeIcon icon={faFile} size="xl" className="text-[#701a75]"  />) : (icon === "faFileCircleCheck") ? (<FontAwesomeIcon icon={faFileCircleCheck} size="xl" className="text-[#16a34a]" />) : (icon === "faHourglassStart") ? (<FontAwesomeIcon icon={faHourglassStart} size="xl" className="text-[#facc15]" />) : (icon === "faBell") ? (<FontAwesomeIcon icon={faBell} size="xl" className="text-[#c2410c]" />) : ''}
            </div>
            </CircularProgressbarWithChildren>        
            </div>
        </div>
      <div className="w-6/10 p-2">
        <div className="text-xl font-bold text-center text-slate-300">{name}</div>
        <div className="text-slate-500 text-lg font-semibold">{numInvoices} Invoices</div>
      </div>
    </div>
  );
};

export default Analysis;






