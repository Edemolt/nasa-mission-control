import { 
  Logo,
  Words,
  Header as ArwesHeader,
  Highlight,
  withStyles,
} from "arwes";
import { Link } from "react-router-dom";
import Clickable from "./Clickable";
import Centered from "./Centered";
import { useAuth } from "../components/auth_context";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "80px",
  },
  logo: {
    display: "inherit",
    marginTop: "15px",
  },
  nav: {
    display: "inherit",
    alignItems: "center",  // Ensures all nav items are vertically aligned
  },
  banner: {
    display: "inherit",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "15px",
    fontSize: 28,
  },
  clickable: {
    display: 'flex', // Ensures flex behavior
    alignItems: 'center', // Aligns items vertically
    fontSize: 21,
    "& i": {
      marginRight: theme.padding / 2,
      fontSize: 24,
      verticalAlign: 'middle' // Helps align icon vertically with the text
    },
  },
  link: {
    color: theme.color.content,
    textDecoration: "none",
    display: 'flex', // Ensures the link also uses flex
    alignItems: 'center' // Centers link contents vertically
  },
  button: {
    padding: [0, theme.padding / 2],
  },
  "@media (max-width: 800px)": {
    logo: {
      display: "none",
    },
    img: {
      display: "none",
    },
    banner: {
      display: "none",
    },
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
      "& i": {
        fontSize: 20, // Slightly smaller icons on smaller screens
      }
    }
  },
});


const Header = ({ classes, onNav, isLoggedIn, onSignOut }) => {

  const { isAuthenticated } = useAuth();

  return <ArwesHeader animate>
    <Centered className={classes.root}>
      <img src="/favicon.png" alt="" className={classes.img} style={{
        margin: "15px 10px 15px 0",
        height: "50px",
        width: "auto",
      }} />
      <Logo animate size={50} className={classes.logo} layer="header" />
      <Words animate className={classes.banner}>
        NASA Mission Control
      </Words>
      <nav className={`${classes.nav}`}>
        { /* Navigation items here with icons and text aligned */ }
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/launch">
              <i className="material-icons">check_circle_outline</i>Launch
            </Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/upcoming">
            <i className="material-icons">update</i>Upcoming</Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/history">
            <i className="material-icons">history</i>History</Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={isLoggedIn ? onSignOut : onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to={isLoggedIn ? "/launch" : "/auth"}>
              <i className="material-icons">{isAuthenticated ? "exit_to_app" : "person_outline"}</i>
              {isAuthenticated ? "Sign Out" : "Sign In"}
            </Link>
          </Highlight>
        </Clickable>
      </nav>
    </Centered>
  </ArwesHeader>;
};

export default withStyles(styles)(Header);
