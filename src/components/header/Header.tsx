import { menuItems } from "./HeaderConstants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSection } from "../../store/headerSlice";
import  { useCallback, useState, useEffect } from "react";
import { Plus, Search } from "react-feather";
import { Container, NavbarContainer, NavItem, Badge, RightContainer, AddButton, SearchBox, SearchInput, AvatarContainer, SearchResults, SearchResultItem } from "./Header.styled";
import NewContactForm from "../contacts/NewContactForm";
import { useDebounce } from "../../hooks/useDebounce";
import { searchContacts } from "../../services/api";

export default function Header() {
  const dispatch = useDispatch()
  const activeSection =useSelector((state: RootState) => state.header.section)
  const handleClick = useCallback(
    (item: string) => {
      dispatch(setSection(item));
    },
    [dispatch]
  );

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
    return () => { isCancelled = true; };
  }, [debouncedQuery]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Container>
      <NavbarContainer>
        {menuItems.map((item) => (
          <NavItem
            key={item}
            $active={activeSection === item}
            onClick={() => handleClick(item)}
          >
            {item}
            {item === "Inbox" && <Badge>0</Badge>}
          </NavItem>
        ))}
      </NavbarContainer>

      <RightContainer>
        <AddButton onClick={openModal}><Plus color="#184561" size={16}/></AddButton>
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
                  <img src={c.avatar || 'https://www.w3schools.com/howto/img_avatar.png'} alt={c.first_name} />
                  <span>{c.first_name} {c.last_name}</span>
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
