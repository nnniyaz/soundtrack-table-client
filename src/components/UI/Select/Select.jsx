import classes from './Select.module.css';

const Select = ({ value, onChange, options, defaultValue }) => {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className={classes.select}
        >
            <option value=''>{defaultValue}</option>
            {
                options.map(option =>
                    <option value={option.value} key={option.value}>
                        {option.name}
                    </option>
                )
            }
        </select>
    );
}

export default Select;