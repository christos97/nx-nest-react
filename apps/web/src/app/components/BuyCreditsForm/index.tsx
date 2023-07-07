import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { firestore } from '@ntua-saas-10/web/firebase';
import { doc, setDoc, increment } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface BuyCreditsFormProps {
  uid: string;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const credits = [5, 10, 20, 50];

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
        await setDoc(
          userDocRef,
          {
            customClaims: {
              quota: { current: increment(Number(selectedOption)) },
            },
          },
          { merge: true },
        );
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
          {credits.map((value) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={value.toString() + ` Credits`}
            />
          ))}
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
