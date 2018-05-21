import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.css";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Something
    </NavigationItem>
    <NavigationItem link="/">Nothing</NavigationItem>
    <NavigationItem link="/">Everything</NavigationItem>
  </ul>
);

export default navigationItems;
