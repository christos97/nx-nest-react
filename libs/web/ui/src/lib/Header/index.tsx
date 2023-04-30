import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styles } from './styles';

const StyledAppBar = styled(AppBar)(styles.appBar);

const StyledToolbar = styled(Toolbar)(styles.toolbar);

const StyledLink = styled(Link)(styles.link);

const StyledTypography = styled(Typography)(styles.typography);

interface UiHeaderProps {
  children?: React.ReactNode;
  links: { label: string; path: string }[];
  brand?: string;
  logoSrc?: string;
  logoAlt?: string;
  width?: number;
  height?: number;
}

const Header: React.FC<UiHeaderProps> = ({
  children,
  brand,
  logoSrc,
  logoAlt,
  links,
  width,
  height,
}) => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>
            <img width={width} height={height} src={logoSrc} alt={logoAlt} />
          </span>
          <StyledTypography color="black" variant="h5">
            <span style={{ padding: '1rem', margin: '1rem' }}>{brand}</span>
          </StyledTypography>
        </div>
        <div style={styles.links}>
          {links.map((link) => (
            <StyledLink key={link.label} to={link.path}>
              {link.label}
            </StyledLink>
          ))}
          {children}
        </div>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
