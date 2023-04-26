import { useTranslation } from 'react-i18next';
import { TRANSLATE_PREFIX } from '../../constants/i18n.constants';

const Home: React.FC = () => {
  const { t } = useTranslation('translation', TRANSLATE_PREFIX.HOME);
  return <h3>{t('hero1')}</h3>;
};

export default Home;
