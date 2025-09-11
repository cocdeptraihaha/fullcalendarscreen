import * as S from "./Sidebar.styled";

type SidebarItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type SidebarProps = {
  items: SidebarItem[];
  active: string;
  onChange: (value: string) => void;
  render?:() => React.ReactNode;
};

export default function Sidebar({ items, active, onChange,render }: SidebarProps) {
  return (
    <S.SidebarContainer>
      <S.ContentContainer>
        {render && render()}
        {items.map((item) => (
          <S.SidebarItem
            key={item.label}
            $active={active === item.value}
            onClick={() => onChange(item.value)}
          >
            {item.icon}
            {item.label}
          </S.SidebarItem>
        ))}
      </S.ContentContainer>
    </S.SidebarContainer>
  );
}