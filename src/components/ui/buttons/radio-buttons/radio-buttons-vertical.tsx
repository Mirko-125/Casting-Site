interface OptionPair {
  value: string;
  label: string;
}

interface RadioButtonsVerticalProps {
  title: string;
  selected: string;
  name: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: OptionPair[];
}

export const RadioButtonsVertical = (props: RadioButtonsVerticalProps) => {
  return (
    <div className="radiogroup-v">
      <label className="textlabel-v">{props.title}</label>
      {props.options.map(({ value, label }) => (
        <label key={value} className="radioitem-v">
          <span className="radiolabeltext">{label}</span>
          <input
            type="radio"
            value={value}
            checked={props.selected === value}
            onChange={props.change}
          />
        </label>
      ))}
    </div>
  );
};
