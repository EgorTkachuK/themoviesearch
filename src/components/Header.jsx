
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #304b78;


`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;



const LinkBase = styled(NavLink)`

  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
text-transform: uppercase;
font-weight: bold;
  &:hover {
    color: #dbb13b;
 
  }

  &.active {
    background: #2494a2;
    color: #dbb13b;
   
  }
`;

export default function Header() {
  return (
    <Bar>
      <Nav>
      
        <LinkBase to="/" end>
          Home
        </LinkBase>
        <LinkBase to="/movies">
          Movies
        </LinkBase>
      </Nav>
    </Bar>
  );
}
