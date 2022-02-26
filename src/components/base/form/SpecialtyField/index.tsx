import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "@components/base/form/ErrorMessage";

const specialties = ["개발", "디자인", "기획", "마케팅"];

const SpecialtyField = () => {
  const [selected, setSelected] = useState(specialties[0]);
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setValue("specialty", selected);
  }, [selected]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div>
            <div className="mt-1 relative">
              <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cc-green focus:border-cc-green text-sm sm:text-lg">
                <span className="block truncate">{selected}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm sm:text-lg">
                  {specialties.map((specialty: string, index: number) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active ? "text-white bg-cc-green" : "text-gray-900"
                        } cursor-default select-none relative py-2 pl-3 pr-9`
                      }
                      value={specialty}
                    >
                      {({ selected, active }) => (
                        <div>
                          <span className="block truncate">{specialty}</span>

                          {selected ? (
                            <span
                              className={`${
                                active ? "text-white" : "text-cc-green"
                              }
                              absolute inset-y-0 right-0 flex items-center pr-4`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
      <ErrorMessage message={errors.specialty?.message} />
    </div>
  );
};

export default SpecialtyField;
