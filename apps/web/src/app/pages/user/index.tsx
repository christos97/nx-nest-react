import React, { FC } from 'react';
import UserInfo from '../../components/UserInfo';
import { UiCard } from '@ntua-saas-10/web/ui/card';

export const User: FC = () => {
  return (
    <UiCard>
      <UserInfo />
    </UiCard>
  );
};
