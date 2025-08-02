interface OptionPair {
  value: string;
  label: string;
}

interface RadioButtonsHorisontalProps {
  title: string;
  selected: string;
  name: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: OptionPair[];
}

export const RadioButtonsHorisontal = (props: RadioButtonsHorisontalProps) => {
  return (
    <div className="radiogroup-h">
      {props.title && <div className="title-h">{props.title}</div>}

      <div className="options-h">
        {props.options.map(({ value, label }) => (
          <label key={value} className="radioitem-h">
            <input
              type="radio"
              value={value}
              checked={props.selected === value}
              onChange={props.change}
            />
            <span className="radiolabeltext-h">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
