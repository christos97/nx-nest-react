import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { doc, setDoc, increment } from 'firebase/firestore';
import { firestore } from '@ntua-saas-10/web/firebase';
import { toast } from 'react-toastify';

interface BuyCreditsFormProps {
  uid: string;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuyCreditsForm: React.FC<BuyCreditsFormProps> = ({ uid, setOpenDialog }) => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // State for selected credit option

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedOption) {
      try {
        const userDocRef = doc(firestore, `users/${uid}`);
        await setDoc(userDocRef, {
          'customClaims.quota.current': increment(Number(selectedOption)),
        });
        toast('Your purchase was successful', { type: 'success' });
        setOpenDialog(false);
      } catch (error) {
        toast('Your purchase failed to complete', { type: 'error' });
        setOpenDialog(false);
      }
    }
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select one of the following options</FormLabel>
        <RadioGroup name="creditOptions" value={selectedOption} onChange={handleOptionChange} row>
          <FormControlLabel value="5" control={<Radio />} label="5 credits" />
          <FormControlLabel value="10" control={<Radio />} label="10 credits" />
          <FormControlLabel value="20" control={<Radio />} label="20 credits" />
          <FormControlLabel value="50" control={<Radio />} label="50 credits" />
        </RadioGroup>
      </FormControl>
      <Box>
        <FormControl>
          <Button type="submit" variant="contained" disabled={!selectedOption}>
            Buy Credits
          </Button>
        </FormControl>
      </Box>
    </form>
  );
};

export default BuyCreditsForm;
