import React, { Component, Suspense } from "react";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import fone from '../img/mainFon.jpg';


class Main extends Component {
    
    render() {
        const { t, i18n } = this.props
        let style = {
            backgroundImage: `url(${fone})`,
            backgroundPosition: "top center",
            backgroundSize: "100%",
            minHeight: "calc(100vh - 60px)"
        }
        let innerStyle = {
            backgroundColor: "rgba(0,0,0,.7)", 
            minHeight: "calc(100vh - 60px)"
        }
    
        return (
            <div className='mainpagediv'>
                <div className='textmain1'>
                    <h1 id ='a'> {t('title')} </h1>
                    <h3> {t('description')}</h3>
                </div>
                <div className='imgfirst' style={style}>
                    <div style={innerStyle}>
                    </div>                  
                </div>
            </div>
        );
    }
}
const Loader = () => (
    <div className="App">
      <div>loading...</div>
    </div>
  );

const Welcome = withTranslation()(Main)
export default function App() {
    return (
      <Suspense fallback={<Loader />}>
        <Welcome />
      </Suspense>
    );
  }