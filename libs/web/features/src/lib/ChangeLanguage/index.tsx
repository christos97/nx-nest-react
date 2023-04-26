import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { type Languages, LANGUAGES } from './languages';

const StyledSelect = styled(Select)`
  color: white;
  background-color: gray;
  &:before {
    border-bottom: 1px solid white;
  }
  &:after {
    border-bottom: 1px solid white;
  }
  &:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid white;
  }
`;

interface ChangeLanguageProps {
  langs: Languages[];
  className?: string;
}

const ChangeLanguage: React.FC<ChangeLanguageProps> = ({
  className,
  langs,
}) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<Languages>(
    i18n.language as Languages
  );

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const newLanguage = event.target.value as Languages;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <StyledSelect
      className={className}
      value={selectedLanguage}
      onChange={handleChange}
    >
      {langs.map((key) => (
        <MenuItem key={key} value={key}>
          {LANGUAGES[key as Languages]}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default ChangeLanguage;
