import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { type Languages, LANGUAGES, FLAGS } from './constants';
import LanguageIcon from '@mui/icons-material/Language';
import { colors } from '@mui/material';

const SelectStyles  = () => ({
  color: 'black',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0',
  '&:before': {
    borderBottom: `1px solid ${colors.deepPurple[500]}`,
  },
  '&:after': {
    borderBottom: `1px solid ${colors.deepPurple[500]}`,
  },
  '&:hover:not(.Mui-disabled):before': {
    borderBottom: `1px solid transparent`,
  },
})

const StyledSelect = styled(Select)(SelectStyles);

interface ChangeLanguageProps {
  langs: Languages[];
}

const ChangeLanguage: React.FC<ChangeLanguageProps> = ({
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
      onChange={handleChange}
      defaultValue={i18n.language}
      IconComponent={LanguageIcon}
      value={selectedLanguage}
    >
      {langs.map((key) => (
        <MenuItem key={key} value={key}>
          {`${FLAGS[key]} ${LANGUAGES[key as Languages]}`}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default ChangeLanguage;
