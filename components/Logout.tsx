import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid #4b5563; // similar to Login for consistency
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #374151; // slightly darker than Login for distinction
  }

  &:focus {
    outline: none;
    border-color: #6b7280; // gray-500 from Tailwind
    box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.5); // matching focus style
  }
`;

const Logout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <Button
      onClick={onLogout}
      className="flex items-center justify-center space-x-2"
    >
      <span>Logout</span>
    </Button>
  );
};

export default Logout;
