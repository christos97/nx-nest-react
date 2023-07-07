import styled from '@emotion/styled';
import LanguageIcon from '@mui/icons-material/Language';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type Languages, LANGUAGES, FLAGS } from './constants';

import { styles } from './styles';

const StyledSelect = styled(Select)(styles);

export interface ChangeLanguageProps {
  langs: Languages[];
}

export const ChangeLanguage: React.FC<ChangeLanguageProps> = ({ langs }) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<Languages>(i18n.language as Languages);

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
      variant="standard"
      sx={{
        marginLeft: '12px',
      }}
    >
      {langs.map((key) => (
        <MenuItem key={key} value={key}>
          {`${FLAGS[key]} ${LANGUAGES[key as Languages]}`}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};
