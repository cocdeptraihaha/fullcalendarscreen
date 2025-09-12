import styled from "styled-components";

export const ContactsContainer = styled.div`
  margin: 45px 0 0 65px;
  min-height: calc(100vh - 45px);
`;

export const AddButton = styled.button`
  margin: 5px;
  border-radius: 6px;
  background-color: #184561;
  display: flex;
  justify-content: center;
  align-items: center;  
  height: 30px;
  width: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  &:hover {
    background: rgba(24, 69, 97, 0.8);
    transform: translateY(-1px);
  }  
`;

export const TableContainer = styled.div`
  overflow: auto;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const TableHeader = styled.thead`
  tr {
    background-color: #f8f8f8;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 2px solid #eee;
  font-weight: 600;
  color: #184561;
  font-size: 14px;
`;

export const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s ease;
    background-color: transparent;
    
    &:hover {
      background-color:rgb(125, 125, 125,0.3) !important;
    }
  }
`;

export const TableCell = styled.td`
  padding: 5px 16px;
`;

export const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #184561;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const NameText = styled.div`
  font-weight: 600;
  color: #184561;
  font-size: 14px;
`;

export const EmailText = styled.div`
  color: #666;
  font-size: 14px;
`;

export const PhoneText = styled.div`
  color: #666;
  font-size: 14px;
`;

// Pagination Styles
export const PaginationContainer = styled.div`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  margin-left: 65px;
  flex-wrap: wrap;
  background: white;
  padding: 16px;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #ddd;

  background: ${props => props.disabled ? '#f5f5f5' : 'white'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.disabled ? '#999' : '#184561'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.disabled ? '#f5f5f5' : '#e3f2fd'};
    border-color: ${props => props.disabled ? '#ddd' : '#184561'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
  }
`;

export const PageInfo = styled.div`
  padding: 8px 16px;
  border: 1px solid #184561;
  font-size: 14px;
  font-weight: 600;
  color: #184561;
  text-align: center;
  background: #f8f8f8;
`;

export const PageInfoSmall = styled.small`
display: flex;
  font-size: 12px;
  color: #666;
  min-width: 100px;
  justify-content: center;
`;

// Content Styles
export const ContentContainer = styled.div`
  padding-bottom: 50px; 
  min-height: calc(100vh - 45px);
`;

export const PageTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 600;
  color: #184561;
`;

export const LoadingContainer = styled.div`
  padding: 40px;
  text-align: center;
  color: #184561;
  font-size: 16px;
  margin: 20px;
`;

export const ErrorContainer = styled.div`
  padding: 40px;
  text-align: center;
  color: #dc3545;
  font-size: 16px;
  margin: 20px;
`;

export const NoDataContainer = styled.div`
  padding: 40px;
  text-align: center;
  color: #184561;
  font-size: 16px;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

