import { IRangeSliderProps } from "@components/form/RangeSlider/type";
import { useFormContext } from "react-hook-form";

const RangeSlider = ({ name, min, max, step, value }: IRangeSliderProps) => {
  if (value) {
    return (
      <div className="flex flex-col space-y-2 px-2 py-4 cursor-pointer">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={value}
          className="appearance-none w-full h-2 bg-gray-300 rounded outline-none slider-thumb"
        />
        <ul className="flex justify-between w-full px-[10px]">
          {[...Array(max - min + 1).keys()].map((index) => (
            <li key={index} className="flex justify-center relative">
              <span>{min + index * step}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    const { register } = useFormContext();

    return (
      <div className="flex flex-col space-y-2 px-2 py-4 cursor-pointer">
        <input
          type="range"
          {...register(name)}
          min={min}
          max={max}
          step={step}
          className="appearance-none w-full h-2 bg-gray-300 rounded outline-none slider-thumb"
        />
        <ul className="flex justify-between w-full px-[10px]">
          {[...Array(max - min + 1).keys()].map((index) => (
            <li key={index} className="flex justify-center relative">
              <span>{min + index * step}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default RangeSlider;
