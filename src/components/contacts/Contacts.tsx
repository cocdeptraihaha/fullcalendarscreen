import { AlignCenter, Plus, Search, User, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather";
import Sidebar from "../ui/sidebar";
import { 
  AddButton, 
  ContactsContainer,
  TableContainer,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableCell,
  AvatarContainer,
  AvatarImage,
  NameText,
  EmailText,
  PhoneText,
  PaginationContainer,
  PaginationButton,
  PageInfo,
  PageInfoSmall,
  ContentContainer,
  LoadingContainer,
  ErrorContainer,
  NoDataContainer
} from "./Contacts.styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setView } from "../../store/contactsSlice";
import { usePaginatedContacts } from "../../hooks/usePaginatedContacts";
import { useState } from "react";
import NewContactForm from "./NewContactForm";

interface LaravelPaginationData {
  data: any[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}


function Contacts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  
  const sidebarItems = [
    { label: "Filters", value: 'filters',icon: <Search size={16} color="#184561"/> },
    { label: "Contacts", value: 'contacts',icon: <User size={16} color="#184561"/>  },
    { label: "Lists", value: 'lists',icon: <AlignCenter size={16} color="#184561"/>  },
  ];
  
  const active = useSelector((state: RootState) => state.contacts.view);
  const dispatch = useDispatch();
  
  const { 
    data: paginatedData, 
    isLoading, 
    error 
  } = usePaginatedContacts(currentPage) as {
    data: LaravelPaginationData | undefined;
    isLoading: boolean;
    error: Error | null;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddContact = () => {
    setIsNewContactModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsNewContactModalOpen(false);
  };

  const renderContactsList = () => {
    if (isLoading) {
      return <LoadingContainer>Loading contacts...</LoadingContainer>;
    }

    if (error) {
      return <ErrorContainer>Error loading contacts: {(error as Error).message}</ErrorContainer>;
    }

    if (!paginatedData?.data?.length) {
      return <NoDataContainer>No contacts found</NoDataContainer>;
    }
    const currentPage = paginatedData.meta.current_page;
    const lastPage = paginatedData.meta.last_page;
    const from = paginatedData.meta.from;
    const to = paginatedData.meta.to;
    const total = paginatedData.meta.total;
    const hasNext = !!paginatedData.links.next;
    const hasPrev = !!paginatedData.links.prev;

    return (
      <ContentContainer>
        
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Avatar</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Phone Number</TableHeaderCell>
              </tr>
            </TableHeader>
            
            <TableBody>
              {paginatedData.data.map((contact: any) => (
                <tr key={contact.id}>
                  <TableCell>
                    {contact.avatar ? (
                      <AvatarImage 
                        src={contact.avatar} 
                        alt={contact.name}
                      />
                    ) : (
                      <AvatarContainer>
                        {contact.name?.charAt(0)?.toUpperCase() || '?'}
                      </AvatarContainer>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <NameText>{contact.name || 'N/A'}</NameText>
                  </TableCell>
                  
                  <TableCell>
                    <EmailText>{contact.email || '-'}</EmailText>
                  </TableCell>
                  
                  <TableCell>
                    <PhoneText>{contact.phone_number || '-'}</PhoneText>
                  </TableCell>
                </tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <PaginationContainer>
        <PageInfoSmall>
            {from}-{to} of {total}
        </PageInfoSmall>
        <PageInfo>
            {currentPage}
        </PageInfo>
          
          
          <PaginationButton
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft size={16} />
          </PaginationButton>

          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrev}
          >
            <ChevronLeft size={16} />
          </PaginationButton>
          
          
          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNext}
          >
            <ChevronRight size={16} />
          </PaginationButton>

          <PaginationButton
            onClick={() => handlePageChange(lastPage)}
            disabled={currentPage === lastPage}
          >

            <ChevronsRight size={16} />
          </PaginationButton>
        </PaginationContainer>
      </ContentContainer>
    );
  };

  return (
    <ContactsContainer>
      <Sidebar
        items={sidebarItems}
        active={active}
        onChange={(value) => dispatch(setView(value))}
        render={() => (
          <>
            <AddButton onClick={handleAddContact}><Plus size={16} color="#fff"/></AddButton>
          </>
        )}
      />
      {active === 'contacts' && renderContactsList()}
      {active === 'filters' && <ContentContainer>Filters coming soon...</ContentContainer>}
      {active === 'lists' && <ContentContainer>Lists coming soon...</ContentContainer>}
      
      <NewContactForm 
        isOpen={isNewContactModalOpen} 
        onClose={handleCloseModal} 
      />
    </ContactsContainer>
  );
}

export default Contacts