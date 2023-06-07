import {useEffect, useRef, useState} from 'react';

const Dropdown = ({title, options, label, id, selectedValue,
                    handleChange, OptionComponent, SelectedItemComponent}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[label]);
  };

  function toggle(e) {
    if (!inputRef.current.contains(e.target)) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedValue) return selectedValue;

    return "";
  };

  const filter = (options) => {
    return options.filter(
        (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
      <div className="dropdown" ref={inputRef} onClick={toggle}>
        <div className="control">
          <div className="selected-value">
            <input
                type="text"
                value={selectedValue}
                placeholder={title || 'Select... '}
            />
          </div>
          <div className={`arrow ${isOpen ? "open" : ""}`}></div>
        </div>

        <div className={`options ${isOpen ? "open" : ""}`}>
          <input
              className="searchInput"
              type="text"
              placeholder="Search value"
              value={getDisplayValue()}
              name="searchTerm"
              onChange={(e) => {
                setQuery(e.target.value);
                handleChange(null);
              }}
          />
          {filter(options).map((option, index) => {
            if (OptionComponent) {
              return <OptionComponent onClick={() => selectOption(option)} key={`${id}-${index}`}>
                {option[label]}
              </OptionComponent>
            }
            if (option[label] === selectedValue && SelectedItemComponent) {
              return <SelectedItemComponent onClick={() => selectOption(option)} key={`${id}-${index}`}>
                {option[label]}
              </SelectedItemComponent>
            }
            return (
                <div
                    onClick={() => selectOption(option)}
                    className={`option ${
                        option[label] === selectedValue ? "selected" : ""
                    }`}
                    key={`${id}-${index}`}
                >
                  {option[label]}
                </div>
            );
          })}
        </div>
      </div>
  );
};
export default Dropdown;
