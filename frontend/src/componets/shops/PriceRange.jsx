import React from "react";
import { Range } from "react-range";

const PriceRange = ({ state, setState, priceRange }) => {
  return (
    <div>
      <div className="py-2 flex flex-col gap-5 md:w-6/12 px-2  ">
        <h2 className="text-3xl font-bold mb-3 text-slate-600">Price</h2>

        <Range
          step={50}
          min={priceRange.low}
          max={priceRange.high}
          values={state.values}
          onChange={(values) => setState({ values })}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              className="w-[15px] h-[15px] bg-[#059473] rounded-full"
              {...props}
            />
          )}
        />
        <span className="text-slate-800 font-bold text-lg">
          ₹{Math.floor(state.values[0])} - ₹{Math.ceil(state.values[1])}
        </span>
      </div>
    </div>
  );
};

export default PriceRange;
