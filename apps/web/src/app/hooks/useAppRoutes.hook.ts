/**
 * Dont edit this file directly.
 * @fileoverview App routes hook for the app to be used with react-router-dom.
 * @global apps/web/~/hooks/useAppRoutes.hook.ts
 */
import { useRoutes as useCustomRoutes } from '@ntua-saas-10/web/hooks';
import { useRoutes as useDomRoutes } from 'react-router-dom';

import { AppRoutes } from '../routes';

export const useAppRoutes = () => useDomRoutes(useCustomRoutes(AppRoutes));
