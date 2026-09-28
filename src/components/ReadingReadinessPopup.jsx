import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ReadingReadinessPopup.css";

export default function ReadingReadinessPopup() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/super-admin") || location.pathname === "/reading-age") return;
    if (sessionStorage.getItem("reading-readiness-prompt-seen")) return;
    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);
  const close = () => { sessionStorage.setItem("reading-readiness-prompt-seen", "1"); setOpen(false); };
  if (!open) return null;
  return <div className="readiness-backdrop" role="presentation" onMouseDown={close}><section className="readiness-popup" role="dialog" aria-modal="true" aria-labelledby="readiness-title" onMouseDown={(event) => event.stopPropagation()}>
    <button className="readiness-close" onClick={close} aria-label="Close">×</button><div className="readiness-icon">📖</div><span>Free reading check</span><h2 id="readiness-title">Is your child ready for the next reading level?</h2><p>Take our guided Reading Age test to understand their current level and the best place to begin.</p><button className="readiness-start" onClick={() => { close(); navigate("/reading-age#assessment"); }}>Take the readiness test</button><button className="readiness-later" onClick={close}>Maybe later</button>
  </section></div>;
}
