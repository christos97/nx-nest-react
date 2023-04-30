import { AppBar, Toolbar, Drawer, List, ListItem } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>Dashboard</Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </Drawer>
      <main>Main content goes here</main>
    </div>
  );
};

export default Dashboard;
