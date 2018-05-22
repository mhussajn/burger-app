import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.css";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Builder</NavigationItem>
    <NavigationItem link="/orders">My Orders</NavigationItem>
  </ul>
);

export default navigationItems;
