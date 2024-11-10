import { useState } from 'react'
import Page from './component/Page'
import DisplayGroups from './component/Afficher_groupe.jsx'
import Afficher_formateur from './component/Afficher_formateur.jsx'

import Emploi_formateur from './component/Emploi_formateur.jsx'
import Emploi_stagiaire from './component/Emploi_stagiaire.jsx'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  
  return (
    <>
    <Router> 
<Routes>
          <Route path="/" element={< Page />} /> 
          <Route path="/afficher_groupe_stagiaire" element={<DisplayGroups />} />
          <Route path="/afficher_formateur" element={<Afficher_formateur />} />
          <Route path="/emploi_formateur" element={<Emploi_formateur />} />
          <Route path="/emploi_stagiaire" element={<Emploi_stagiaire />} />


</Routes>
    </Router>
     
    </>
  )
}

export default App
