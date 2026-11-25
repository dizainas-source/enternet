import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { OfficeMaster } from './OfficeMaster';

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [itProgress, setItProgress] = useState(0);
  const [officeFit, setOfficeFit] = useState({ scale: 1.29, centerY: 0 });
  useEffect(() => {
    const updateScrollProgress = () => {
      setScrollProgress(Math.min(window.scrollY / 820, 1));
      setItProgress(Math.max(0, Math.min((window.scrollY - 1050) / 520, 1)));
      const officeHeight = document.querySelector('.office')?.offsetHeight || 821;
      setOfficeFit({
        scale: Math.min(1.29, (window.innerHeight - 24) / officeHeight),
        centerY: (window.innerHeight - officeHeight) / 2 - 120,
      });
    };
    updateScrollProgress();
    const handleScroll = () => {
      setSelectedRoom(null);
      updateScrollProgress();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);
  useEffect(() => {
    const clearOnOutsideClick = (event) => {
      if (!event.target.closest('.office-room')) {
        setSelectedRoom(null);
      }
    };
    document.addEventListener('click', clearOnOutsideClick);
    return () => document.removeEventListener('click', clearOnOutsideClick);
  }, []);

  const officeStyle = { '--scroll-progress': scrollProgress, '--it-progress': itProgress, '--office-fit-scale': officeFit.scale, '--office-center-y': `${officeFit.centerY}px` };

  return <main className="page-shell">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Enternet — pradžia"><img src={`${import.meta.env.BASE_URL}assets/enternet-logo.svg`} alt="Enternet" /></a>
      <nav aria-label="Pagrindinė navigacija">
        <button className="nav-link" type="button">Ką sprendžiame</button><button className="nav-link" type="button">Projektai</button><button className="nav-link" type="button">Komanda</button><button className="nav-link" type="button">Įžvalgos</button><button className="nav-link" type="button">Kontaktai</button>
        <button className="contact-button" type="button">Susisiekti</button>
      </nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <h1>Viena komanda <span>visai jūsų verslo<br />sistemai</span></h1>
      </div>
      <div className="office-wrap">
        <div className="office" style={officeStyle} aria-label="Interaktyvus Enternet biuro planas">
          <OfficeMaster selectedId={selectedRoom} onSelect={setSelectedRoom} itProgress={itProgress} />
          <aside className={`office-story ${itProgress >= .9 ? 'office-story--visible' : ''}`} aria-hidden={itProgress < .9}>
            <span className="office-story__eyebrow">Paslaugos / IT</span>
            <h2>IT kabinetas</h2>
            <p className="office-story__lead">Technologijos, kurios padeda verslui veikti sklandžiai kasdien.</p>
            <div className="office-story__services" aria-label="Pavyzdinės IT paslaugos">
              <div><span>01</span><div><h3>IT infrastruktūra</h3><p>Darbo vietų, tinklo ir sistemų paruošimas augančiai komandai.</p></div></div>
              <div><span>02</span><div><h3>Priežiūra ir pagalba</h3><p>Kasdienių trikdžių sprendimas ir nuosekli sistemų priežiūra.</p></div></div>
              <div><span>03</span><div><h3>Duomenų saugumas</h3><p>Prieigų, atsarginių kopijų ir svarbios informacijos apsauga.</p></div></div>
            </div>
            <small>Pavyzdinis prototipo turinys</small>
          </aside>
        </div>
      </div>
    </section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
