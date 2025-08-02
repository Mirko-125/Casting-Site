interface DropdownMenuProps {
  record: Record<string, string>;
  title: string;
  change: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  return (
    <div className="flex justify-center items-center p-2">
      <div className="w-52 md:w-[240px] bg-[#222222] p-4">
        <label className="block text-white">{props.title}</label>
        <select
          className="block w-full mt-1 focus:outline-none bg-[#333333] p-2"
          onChange={props.change}
        >
          <option className="text-center">Unselected</option>
          {Object.entries(props.record).map(([code, name]) => (
            <option className="text-center" key={code} value={code}>
              {name.length > 20 ? name.slice(0, 20) + "..." : name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
