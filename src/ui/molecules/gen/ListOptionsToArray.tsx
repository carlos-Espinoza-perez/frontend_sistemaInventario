import type { IOption } from "../../../interface/GenInterface";

const ListOptionsToArray = ({ options }: { options: IOption[] }) => {
  return (
    <>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
};

export default ListOptionsToArray;