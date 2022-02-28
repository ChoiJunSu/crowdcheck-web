import { IRangeSliderProps } from "@components/base/form/RangeSlider/type";
import { useFormContext } from "react-hook-form";

const RangeSlider = ({ name, min, max, step }: IRangeSliderProps) => {
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
            <span className="absolute">{min + index * step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RangeSlider;
