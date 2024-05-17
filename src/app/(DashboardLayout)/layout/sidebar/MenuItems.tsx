import {
  IconLayoutDashboard,
} from "@tabler/icons-react";
import GroupIcon from '@mui/icons-material/Group';

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: GroupIcon,
    href: "/users",
  },
];

export default Menuitems;
