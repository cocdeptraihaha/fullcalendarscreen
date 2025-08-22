import { FC, useEffect, useRef, useState } from "react";
import {
  StyledDropdownIcon,
  StyledSearchDropdownItem,
  StyledDropdownItem,
  StyledDropdownList,
  StyledDropdownMenu,
  StyledDropdownToggle,
  StyledDropdownWrapper,
  StyledDropdownAvatar,
} from "./styled";
import { ChevronDown, ChevronUp } from "react-feather";

interface DropdownProps {
  hasSearch?: number; // 0: no search, 1: search in toggle, 2: search in menu
  hasCheckbox?: boolean;
  Items?: any[];
  renderTitle: () => React.ReactNode; // custom render function for dropdown title
  onChange?: (value: any) => void;
  value?: any | any[];
}

const Dropdown: FC<DropdownProps> = ({
  hasSearch = 0,
  renderTitle,
  Items = [],
  onChange,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null); // ref to detect clicks outside dropdown

  const handleToggle = () => {
    setOpen(!open);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchTerm(""); // clear when closing
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // filter items based on searchTerm - supports both name and label properties
  const filteredItems = Items.filter((item) =>
    (item.name || item.label || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <StyledDropdownWrapper ref={dropdownRef}>
      <StyledDropdownToggle onClick={handleToggle}>
        {!open && renderTitle()} {/* show custom title when closed */}
        {hasSearch === 1 &&
          open /* search input replaces title when open */ && (
            <StyledSearchDropdownItem
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) =>
                e.stopPropagation()
              } /* prevent dropdown close on input click */
            />
          )}
        <StyledDropdownIcon>
          {open ? <ChevronUp /> : <ChevronDown />}
        </StyledDropdownIcon>
      </StyledDropdownToggle>

      {open && (
        <StyledDropdownMenu>
          <StyledDropdownList>
            {hasSearch === 2 /* search input inside dropdown menu */ && (
              <StyledSearchDropdownItem
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) =>
                  e.stopPropagation()
                } /* prevent dropdown close */
              />
            )}
            {!filteredItems.length && (
              <StyledDropdownItem>Empty</StyledDropdownItem>
            )}
            {filteredItems.map((item) => (
              <StyledDropdownItem
                key={item.id}
                onClick={() => {
                  onChange?.(item.id); // notify parent component of selection
                  setOpen(false);
                  setSearchTerm(""); // reset search after selection
                }}
              >
                {item.color /* color indicator for appointment types */ && (
                  <span style={{ color: item.color, fontSize: "30px" }}>•</span>
                )}
                {item.avatar && <StyledDropdownAvatar src={item.avatar} />}
                {/* avatar for contacts/staff */}
                {item.name || item.label} {/* display name or label */}
              </StyledDropdownItem>
            ))}
          </StyledDropdownList>
        </StyledDropdownMenu>
      )}
    </StyledDropdownWrapper>
  );
};

export default Dropdown;
