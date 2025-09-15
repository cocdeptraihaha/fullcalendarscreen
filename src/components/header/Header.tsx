import { menuItems } from "./HeaderConstants";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus, Search } from "react-feather";
import {
  Container,
  NavbarContainer,
  NavItem,
  Badge,
  RightContainer,
  AddButton,
  SearchBox,
  SearchInput,
  AvatarContainer,
  SearchResults,
  SearchResultItem,
} from "./Header.styled";
import NewContactForm from "../contacts/NewContactForm";
import { useDebounce } from "../../hooks/useDebounce";
import { searchContacts } from "../../services/api";

// Mapping từ menu items sang routes
const menuToRoute: { [key: string]: string } = {
  Calendar: "/calendar",
  Inbox: "/inbox",
  Contacts: "/contacts",
  Forms: "/forms",
  Billing: "/billing",
  Marketing: "/marketing",
  Reports: "/reports",
};

export default function Header() {
  const location = useLocation();
  const activeSection = location.pathname.substring(1) || "calendar";

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const run = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      try {
        const data = await searchContacts(debouncedQuery.trim());
        if (!isCancelled) setResults((data || []).slice(0, 5));
      } catch (e) {
        if (!isCancelled) setResults([]);
      }
    };
    run();
    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Container>
      <NavbarContainer>
        {menuItems.map((item) => (
          <NavItem
            key={item}
            as={Link}
            to={menuToRoute[item]}
            $active={activeSection === item.toLowerCase()}
          >
            {item}
            {item === "Inbox" && <Badge>0</Badge>}
          </NavItem>
        ))}
      </NavbarContainer>

      <RightContainer>
        <AddButton onClick={openModal}>
          <Plus color="#184561" size={16} />
        </AddButton>
        <SearchBox>
          <Search color={"#ffffff4d"} size={14} />
          <SearchInput
            type="text"
            placeholder="Search Contact"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 150)}
          />
          {showResults && results.length > 0 && (
            <SearchResults>
              {results.map((c) => (
                <SearchResultItem key={c.id}>
                  <img
                    src={
                      c.avatar ||
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    alt={c.first_name}
                  />
                  <span>
                    {c.first_name} {c.last_name}
                  </span>
                </SearchResultItem>
              ))}
            </SearchResults>
          )}
        </SearchBox>
        <AvatarContainer></AvatarContainer>
      </RightContainer>

      <NewContactForm isOpen={isOpen} onClose={closeModal} />
    </Container>
  );
}
