import { useState } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #3498db;
  
  span {
    color: #2c3e50;
    font-weight: 500;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    margin-top: 1rem;
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const NavLink = styled(Link)`
  color: #2c3e50;
  position: relative;
  transition: color 0.3s;
  font-weight: 500;
  
  &:hover {
    color: #3498db;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #3498db;
    transition: width 0.3s;
  }
  
  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <StyledLink href="/">
            参議院選挙<span>ガイド</span>
          </StyledLink>
        </Logo>
        
        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </MenuButton>
        
        <Nav isOpen={isMenuOpen}>
          <NavLink href="/">
            ホーム
          </NavLink>
          <NavLink href="/issues">
            政策課題
          </NavLink>
          <NavLink href="/parties">
            政党比較
          </NavLink>
          <NavLink href="/evaluation-principles">
            評価方針
          </NavLink>
          <NavLink href="/policies">
            政策別比較
          </NavLink>
          <NavLink href="/glossary">
            用語集
          </NavLink>
          <NavLink href="/about">
            サイトについて
          </NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 