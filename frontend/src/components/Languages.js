import React, { Component, Suspense } from 'react';
import {
    Button
} from 'react-materialize';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
function Languages() {
    const { t, i18n } = useTranslation();
  
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };
  
    return (
        <div className="App-header">
          <Button onClick={() => changeLanguage('ru')}>ru</Button>
          <Button onClick={() => changeLanguage('en')}>en</Button>
        </div>
    );
  }
  const Loader = () => (
    <div className="App">
      <div>loading...</div>
    </div>
  );

  export default function App() {
    return (
      <Suspense fallback={<Loader />}>
        <Languages />
       </Suspense>
    );
  }