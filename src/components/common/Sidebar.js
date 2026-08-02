import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";

const menu = [
  "Dashboard",
  "Cheques",
  "Security Cheques",
  "Parties",
  "Transactions",
  "Reports",
  "Notifications",
  "Users",
  "Settings",
  "Activity Log"
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250
      }}
    >
      <List>
        {menu.map(item => (
          <ListItemButton key={item}>
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}