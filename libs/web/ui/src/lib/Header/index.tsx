import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styles } from './styles';

const StyledAppBar = styled(AppBar)(styles.appBar);

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
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledTypography color="black" variant="h6">
            <span>
              <strong>{brand}</strong>
            </span>
            <span>
              <img width={width} height={height} src={logoSrc} alt={logoAlt} />
            </span>
          </StyledTypography>
          <div style={{ display: 'flex', alignItems: 'end' }}>
            {links.map((link) => (
              <StyledLink key={link.label} to={link.path}>
                {link.label}
              </StyledLink>
            ))}
          </div>
          {children}
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
