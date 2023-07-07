/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { styles } from './styles';
import type { UiHeaderProps } from './types';

const StyledAppBar = styled(AppBar)(styles.appBar);

const StyledToolbar = styled(Toolbar)(styles.toolbar);

const StyledLink = styled(Link)(styles.link);

const StyledTypography = styled(Typography)(styles.typography);

const LinksContainer = styled.div(styles.links);

const Header: React.FC<UiHeaderProps> = ({ children, brand, links, ...logoProps }) => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>
            <img {...logoProps} />
          </span>
          <StyledTypography color="black" variant="h5">
            <span style={{ padding: '1rem', margin: '1rem' }}>{brand}</span>
          </StyledTypography>
        </div>
        <LinksContainer>
          {links.map(({ label, path, isButton, handler }) => {
            if (isButton) {
              return (
                <Button
                  onClick={() => {
                    if (handler && typeof handler === 'function') {
                      handler();
                    } else {
                      throw new Error('Button handler is not a function');
                    }
                  }}
                  key={label}
                  variant="text"
                  sx={{
                    color: 'gray',
                    backgroundColor: 'inherit',
                  }}
                >
                  {label}
                </Button>
              );
            }
            return (
              <StyledLink key={label} to={path}>
                {label}
              </StyledLink>
            );
          })}
          {children}
        </LinksContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
