// src/App.jsx
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './Pages/Login';
import Register from './Pages/Register';
import LandingPage from './Pages/LandingPage';
import PrivateRoute from './PrivateRoute';

import LayoutClient from './layouts/LayoutClient';
import GestionCommandes from './Pages/Client/GestionCommandes';
import Commande from './Pages/Client/Commande';
import SuiviCommande from './Pages/Client/SuiviCommande';
import Profil from './Pages/Client/Profil';
import GestionCredit from './Pages/Client/GestionCredit';
import Support from './Pages/Client/Support';

import TableauDeBord from './Pages/Manager/TableauDeBord';
import Finances from './Pages/Manager/Finances';
import GestionUtilisateurs from './Pages/Manager/GestionUtilisateurs';
import GestionColliersMissions from './Pages/Manager/GestionColliersMissions';
import SupportManager from './Pages/Manager/Support';
import SuiviLivraisons from './Pages/Manager/SuiviLivraisons';

import LayoutDriver from './layouts/LayoutDriver';
import LayoutManager from './layouts/LayoutManager'
import MissionsAVenir from './Pages/Driver/MissionsAVenir';
import ProfilDriver from './Pages/Driver/ProfilDriver';
import HistoriqueMissions from './Pages/Driver/HistoriqueMissions';
import ManagerProfile from './Pages/Manager/ManagerProfile';
import ProfilDriver from './Pages/Driver/ProfilDriver'

function App() {
  if (window.location.pathname === '/') {
    window.location.href = '/landingPage.html'; // Ensure this file exists in the public folder
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            {/* <Route
              path='/'
              element={<LandingPage />}
            /> */}
            <Route path='/auth'>
              <Route
                path='login'
                element={<Login />}
              />
              <Route
                path='register'
                element={<Register />}
              />
            </Route>

            {/* Routes Client Sécurisées */}
            <Route element={<PrivateRoute />}>
              <Route
                path='/client/:id'
                element={<LayoutClient />}
              >
                <Route
                  index
                  element={<GestionCommandes />}
                />
                <Route
                  path='commande'
                  element={<Commande />}
                />
                <Route
                  path='suivi-commande'
                  element={<SuiviCommande />}
                />
                <Route
                  path='profil'
                  element={<Profil />}
                />
                <Route
                  path='gestion-credit'
                  element={<GestionCredit />}
                />
                <Route
                  path='support'
                  element={<Support />}
                />
              </Route>
            </Route>

            {/* Routes Manager Sécurisées */}
            <Route element={<PrivateRoute />}>
              <Route path='/manager/:id' element={<LayoutManager/>}>

                <Route
                  index
                  element={<TableauDeBord />}
                />
                <Route
                  path='finances'
                  element={<Finances />}
                />
                <Route
                  path='profil'
                  element={<ManagerProfile />}
                />
                <Route
                  path='gestion-utilisateurs'
                  element={<GestionUtilisateurs />}
                />
                <Route
                  path='gestion-colliers-missions'
                  element={<GestionColliersMissions />}
                />
                <Route
                  path='support'
                  element={<SupportManager />}
                />
                <Route
                  path='suivi-livraisons'
                  element={<SuiviLivraisons />}
                />
              </Route>
            </Route>

            {/* Routes Chauffeur Sécurisées */}
            <Route element={<PrivateRoute />}>
              <Route
                path='/driver/:id'
                element={<LayoutDriver />}
              >
                <Route
                  index
                  element={<MissionsAVenir />}
                />
                <Route
                  path='profildriver'
                  element={<ProfilDriver />}
                />
                <Route
                  path='historique-missions'
                  element={<HistoriqueMissions />}
                />
              </Route>
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
