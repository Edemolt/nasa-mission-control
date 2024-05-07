import {
  BrowserRouter as Router,
} from "react-router-dom";
import {
  Arwes,
  SoundsProvider,
  ThemeProvider,
  createSounds,
  createTheme,
} from "arwes";

import AppLayout from "./pages/AppLayout";
import { AuthProvider } from "./components/auth_context";

import { theme, resources, sounds } from "./settings";

const App = () => {
  return <ThemeProvider theme={createTheme(theme)}>
    <SoundsProvider sounds={createSounds(sounds)}>
      <Arwes animate background={resources.background.large} pattern={resources.pattern}>
        {anim => (
          <Router>
            <AuthProvider>
              <AppLayout show={anim.entered} />
            </AuthProvider>
          </Router>
        )}
      </Arwes>
    </SoundsProvider>
  </ThemeProvider>;
};

export default App;
