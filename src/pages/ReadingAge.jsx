// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { API_URL } from "../services/api";
// import "../styles/ReadingAge.css";

// const initialForm = { student_name: "", age: "", class_name: "", city: "", country: "India",
//   school_name: "", email: "", whatsapp_country_code: "+91", whatsapp_number: "" };

// const readingAgeLabel = (code) => {
//   if (code === "B4") return "Below 4 years";
//   const [years, months] = String(code || "").split(".");
//   return `${Number(years)} years ${Number(months || 0)} months`;
// };
// const gapLabel = (gap) => gap == null ? "Not available" : gap > 0
//   ? `${gap} months below chronological age` : gap < 0
//     ? `${Math.abs(gap)} months above chronological age` : "Age appropriate";

// export default function ReadingAge() {
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState(initialForm);
//   const [items, setItems] = useState([]);
//   const [responses, setResponses] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [streak, setStreak] = useState(0);
//   const [result, setResult] = useState(null);
//   const [busy, setBusy] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch(`${API_URL}/reading-assessments/items`).then((response) => response.json())
//       .then((data) => setItems(data.data || [])).catch(() => setError("Unable to load the assessment."));
//   }, []);

//   const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
//   const start = (event) => {
//     event?.preventDefault();
//     setResponses([]); setIndex(0); setStreak(0); setResult(null); setError(""); setStep(2);
//   };
//   const submit = async (answers, b4 = false) => {
//     setBusy(true); setError("");
//     try {
//       const response = await fetch(`${API_URL}/reading-assessments/complete`, {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, age: Number(form.age), responses: answers, b4 }),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Assessment could not be saved");
//       setResponses(answers); setResult(data); setStep(3);
//     } catch (requestError) { setError(requestError.message); }
//     finally { setBusy(false); }
//   };
//   const mark = async (correct) => {
//     const next = [...responses, { item_index: index, correct }];
//     const nextStreak = correct ? 0 : streak + 1;
//     setResponses(next); setStreak(nextStreak);
//     if (nextStreak === 3 || index === items.length - 1) await submit(next);
//     else setIndex((value) => value + 1);
//   };
//   const downloadPdf = () => {
//     if (!result?.pdf?.base64) return;
//     const binary = window.atob(result.pdf.base64);
//     const bytes = new Uint8Array(binary.length);
//     for (let byte = 0; byte < binary.length; byte += 1) bytes[byte] = binary.charCodeAt(byte);
//     const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
//     const link = document.createElement("a");
//     link.href = url; link.download = result.pdf.filename; link.click();
//     URL.revokeObjectURL(url);
//   };

//   return <>
//     <Navbar />
//     <section className="ra-hero">
//       <div className="ra-overlay">
//         <span className="ra-badge">Free • Evidence-based • Immediate result</span>
//         <h1>Discover Your Child&apos;s <span>Reading Age</span></h1>
//         <p>An assessor guides the child through words and phrases. The test stops after three consecutive mistakes and saves the result securely for the Let&apos;s Read India team.</p>
//         <div className="hero-buttons"><a className="primary-btn" href="#assessment">Take the Test</a><a className="secondary-btn" href="#how-it-works">Learn More</a></div>
//       </div>
//     </section>

//     <section id="how-it-works" className="reading-age-section">
//       <div className="container"><div className="section-header"><span>HOW IT WORKS</span><h2>A simple guided assessment</h2><p>An adult marks each spoken answer as correct or incorrect. Please do not show the assessor controls to the child or teach during the test.</p></div>
//         <div className="reading-grid"><div className="reading-card"><div className="icon">1</div><h3>Enter details</h3><p>Add the student, school and parent contact information.</p></div><div className="reading-card"><div className="icon">2</div><h3>Read aloud</h3><p>Begin at item one and mark each response honestly.</p></div><div className="reading-card"><div className="icon">3</div><h3>See the result</h3><p>Receive the reading age and recommended starting area immediately.</p></div></div>
//       </div>
//     </section>

//     <section id="assessment" className="ra-tool-section"><div className="ra-tool-shell">
//       <div className="ra-tool-progress"><span className={step >= 1 ? "active" : ""}>1. Student</span><span className={step >= 2 ? "active" : ""}>2. Test</span><span className={step >= 3 ? "active" : ""}>3. Result</span></div>
//       {step === 1 && <form className="ra-form" onSubmit={start}><h2>Student details</h2>
//         <label>Student name *<input required name="student_name" value={form.student_name} onChange={update} /></label>
//         <label>Age *<input required type="number" min="3" max="18" name="age" value={form.age} onChange={update} /></label>
//         <label>Class / Grade *<input required name="class_name" value={form.class_name} onChange={update} /></label>
//         <label>City *<input required name="city" value={form.city} onChange={update} /></label>
//         <label>Country *<input required name="country" value={form.country} onChange={update} /></label>
//         <label>School *<input required name="school_name" value={form.school_name} onChange={update} /></label>
//         <label>Parent email *<input required type="email" name="email" value={form.email} onChange={update} placeholder="Result PDF will be sent here" /></label>
//         <label>WhatsApp<div className="ra-phone"><input name="whatsapp_country_code" value={form.whatsapp_country_code} onChange={update} /><input name="whatsapp_number" value={form.whatsapp_number} onChange={update} /></div></label>
//         <button className="primary-btn" type="submit" disabled={!items.length}>Start assessment</button></form>}

//       {step === 2 && items[index] && <div className="ra-live"><div className="ra-word-card"><span>Item {index + 1} of {items.length}</span><div className="ra-test-word">{items[index].text}</div><p>Ask the child to read this aloud.</p><div className="ra-answer-buttons"><button disabled={busy} onClick={() => mark(true)}>Correct</button><button disabled={busy} onClick={() => mark(false)}>Incorrect</button></div>{index < 5 && <button className="ra-b4" disabled={busy} onClick={() => submit([], true)}>Cannot recognise letters / blend sounds — mark B4</button>}</div><aside><strong>{responses.filter((answer) => answer.correct).length}</strong><span>Correct</span><strong>{responses.filter((answer) => !answer.correct).length}</strong><span>Incorrect</span><strong>{streak}/3</strong><span>Consecutive mistakes</span><button onClick={start}>Restart</button></aside></div>}

//       {step === 3 && result && <div className="ra-result">
//         <span>Assessment complete</span><h2>{form.student_name}</h2>
//         <div className="ra-result-age"><small>Reading Age</small><strong>{result.result.reading_age}</strong><small>{readingAgeLabel(result.result.reading_age)}</small></div>
//         <h3>Complete Result</h3>
//         <div className="ra-result-grid ra-complete-grid">
//           <div><small>Student</small><strong>{form.student_name}</strong></div><div><small>Chronological age</small><strong>{form.age} years ({result.result.chronological_age_months} months)</strong></div>
//           <div><small>Class / Grade</small><strong>{form.class_name}</strong></div><div><small>School</small><strong>{form.school_name}</strong></div>
//           <div><small>Location</small><strong>{form.city}, {form.country}</strong></div><div><small>Parent email</small><strong>{form.email}</strong></div>
//           <div><small>Reading age</small><strong>{readingAgeLabel(result.result.reading_age)}</strong></div><div><small>Reading gap</small><strong>{gapLabel(result.result.reading_gap_months)}</strong></div>
//           <div><small>Classification</small><strong>{result.result.classification}</strong></div><div><small>Recommended starting area</small><strong>{result.result.intervention}</strong></div>
//           <div><small>Correct answers</small><strong>{result.result.correct_count}</strong></div><div><small>Incorrect answers</small><strong>{result.result.incorrect_count}</strong></div>
//           <div><small>Total attempted</small><strong>{result.result.total_attempted}</strong></div><div><small>Last correct item</small><strong>{result.result.last_correct?.text || "None"}</strong></div>
//           <div><small>Assessment ID</small><strong>{result.assessment_number}</strong></div><div><small>Completed</small><strong>{new Date(result.result.completed_at).toLocaleString()}</strong></div>
//         </div>
//         <p className={result.email_delivery?.sent ? "ra-email-sent" : "ra-email-failed"}>{result.email_delivery?.sent ? `PDF result sent to ${form.email}` : `Assessment saved, but the email could not be sent: ${result.email_delivery?.error || "Please contact the administrator."}`}</p>
//         <div className="ra-result-actions">{result.pdf && <button className="ra-download" onClick={downloadPdf}>Download Result PDF</button>}<button className="primary-btn" onClick={() => { setForm(initialForm); setStep(1); }}>Take another test</button></div>
//         {responses.length > 0 && <details className="ra-response-details"><summary>View all {responses.length} assessment responses</summary><div className="ra-response-list">{responses.map((answer, answerIndex) => <div key={answer.item_index}><span>{answerIndex + 1}. {items[answer.item_index]?.text}</span><span>RA {items[answer.item_index]?.ra}</span><strong className={answer.correct ? "response-correct" : "response-wrong"}>{answer.correct ? "Correct" : "Incorrect"}</strong></div>)}</div></details>}
//       </div>}
//       {error && <p className="ra-error">{error}</p>}
//     </div></section>
//     <Footer />
//   </>;
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../services/api";
import "../styles/ReadingAge.css";

const initialForm = { student_name: "", age: "", class_name: "", city: "", country: "India",
  school_name: "", email: "", whatsapp_country_code: "+91", whatsapp_number: "" };

const readingAgeLabel = (code) => {
  if (code === "B4") return "Below 4 years";
  const [years, months] = String(code || "").split(".");
  return `${Number(years)} years ${Number(months || 0)} months`;
};
const gapLabel = (gap) => gap == null ? "Not available" : gap > 0
  ? `${gap} months below chronological age` : gap < 0
    ? `${Math.abs(gap)} months above chronological age` : "Age appropriate";

export default function ReadingAge() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [items, setItems] = useState([]);
  const [responses, setResponses] = useState([]);
  const [index, setIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/reading-assessments/items`).then((response) => response.json())
      .then((data) => setItems(data.data || [])).catch(() => setError("Unable to load the assessment."));
  }, []);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const showInstructions = (event) => {
    event?.preventDefault();
    setError(""); setStep(2);
  };
  const startAssessment = (event) => {
    event?.preventDefault();
    setResponses([]); setIndex(0); setStreak(0); setResult(null); setError(""); setStep(3);
  };
  const submit = async (answers, b4 = false) => {
    setBusy(true); setError("");
    try {
      const response = await fetch(`${API_URL}/reading-assessments/complete`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: Number(form.age), responses: answers, b4 }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Assessment could not be saved");
      setResponses(answers); setResult(data); setStep(4);
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  };
  const mark = async (correct) => {
    const next = [...responses, { item_index: index, correct }];
    const nextStreak = correct ? 0 : streak + 1;
    setResponses(next); setStreak(nextStreak);
    if (nextStreak === 3 || index === items.length - 1) await submit(next);
    else setIndex((value) => value + 1);
  };
  const downloadPdf = () => {
    if (!result?.pdf?.base64) return;
    const binary = window.atob(result.pdf.base64);
    const bytes = new Uint8Array(binary.length);
    for (let byte = 0; byte < binary.length; byte += 1) bytes[byte] = binary.charCodeAt(byte);
    const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url; link.download = result.pdf.filename; link.click();
    URL.revokeObjectURL(url);
  };

  return <>
    <Navbar />
    <section className="ra-hero">
      <div className="ra-overlay">
        <span className="ra-badge">Free • Evidence-based • Immediate result</span>
        <h1>Discover Your Child&apos;s <span>Reading Age</span></h1>
        <p>An assessor guides the child through words and phrases. The test stops after three consecutive mistakes and saves the result securely for the Let&apos;s Read India team.</p>
        <div className="hero-buttons"><a className="primary-btn" href="#assessment">Take the Test</a><a className="secondary-btn" href="#how-it-works">Learn More</a></div>
      </div>
    </section>

    <section id="how-it-works" className="reading-age-section">
      <div className="container"><div className="section-header"><span>HOW IT WORKS</span><h2>A simple guided assessment</h2><p>An adult marks each spoken answer as correct or incorrect. Please do not show the assessor controls to the child or teach during the test.</p></div>
        <div className="reading-grid"><div className="reading-card"><div className="icon">1</div><h3>Enter details</h3><p>Add the student, school and parent contact information.</p></div><div className="reading-card"><div className="icon">2</div><h3>Read instructions</h3><p>Review the assessment rules before beginning with the child.</p></div><div className="reading-card"><div className="icon">3</div><h3>Read aloud</h3><p>Begin at item one and mark each response honestly.</p></div><div className="reading-card"><div className="icon">4</div><h3>See the result</h3><p>Receive the reading age and recommended starting area immediately.</p></div></div>
      </div>
    </section>

    <section id="assessment" className="ra-tool-section"><div className="ra-tool-shell">
      <div className="ra-tool-progress"><span className={step >= 1 ? "active" : ""}>1. Student</span><span className={step >= 2 ? "active" : ""}>2. Instructions</span><span className={step >= 3 ? "active" : ""}>3. Test</span><span className={step >= 4 ? "active" : ""}>4. Result</span></div>
      {step === 1 && <form className="ra-form" onSubmit={showInstructions}><h2>Student details</h2>
        <label>Student name *<input required name="student_name" value={form.student_name} onChange={update} /></label>
        <label>Age *<input required type="number" min="3" max="18" name="age" value={form.age} onChange={update} /></label>
        <label>Class / Grade *<input required name="class_name" value={form.class_name} onChange={update} /></label>
        <label>City *<input required name="city" value={form.city} onChange={update} /></label>
        <label>Country *<input required name="country" value={form.country} onChange={update} /></label>
        <label>School *<input required name="school_name" value={form.school_name} onChange={update} /></label>
        <label>Parent email *<input required type="email" name="email" value={form.email} onChange={update} placeholder="Result PDF will be sent here" /></label>
        <label>WhatsApp<div className="ra-phone"><input name="whatsapp_country_code" value={form.whatsapp_country_code} onChange={update} /><input name="whatsapp_number" value={form.whatsapp_number} onChange={update} /></div></label>
        <button className="primary-btn" type="submit" disabled={!items.length}>Continue to instructions</button></form>}

      {step === 2 && <form className="ra-instructions" onSubmit={startAssessment}>
        <span className="ra-instructions-kicker">Before you begin</span>
        <h2>Reading Age Assessment Instructions</h2>
        <p>This assessment should be guided by a parent, teacher, or another adult. Keep the marking controls out of the child&apos;s view.</p>
        <ol>
          <li>Ask the child to read each displayed word or phrase aloud.</li>
          <li>Mark <strong>Correct</strong> only when the child reads it independently. Do not teach, prompt, or correct during the test.</li>
          <li>Mark <strong>Incorrect</strong> when the child cannot read the item. The test ends automatically after three consecutive incorrect responses.</li>
          <li>If the child cannot recognise letters or blend sounds during the first five items, use the <strong>mark B4</strong> option.</li>
          <li>After the test, the complete result and PDF will appear on screen and will be emailed to the parent address entered.</li>
        </ol>
        <label className="ra-ready-check"><input type="checkbox" required /> <span>I have read the instructions and am ready to guide the child.</span></label>
        <div className="ra-instructions-actions"><button type="button" onClick={() => setStep(1)}>Back</button><button type="submit" className="primary-btn">Start Assessment</button></div>
      </form>}

      {step === 3 && busy && <div className="ra-result-loading" role="status" aria-live="polite"><div className="ra-result-spinner" aria-hidden="true"></div><h2>Calculating the reading age…</h2><p>The assessment is complete. Please wait while we prepare the full result and PDF.</p></div>}

      {step === 3 && !busy && items[index] && <div className="ra-live"><div className="ra-word-card"><span>Item {index + 1} of {items.length}</span><div className="ra-test-word">{items[index].text}</div><p>Ask the child to read this aloud.</p><div className="ra-answer-buttons"><button disabled={busy} onClick={() => mark(true)}>Correct</button><button disabled={busy} onClick={() => mark(false)}>Incorrect</button></div>{index < 5 && <button className="ra-b4" disabled={busy} onClick={() => submit([], true)}>Cannot recognise letters / blend sounds — mark B4</button>}</div><aside><strong>{responses.filter((answer) => answer.correct).length}</strong><span>Correct</span><strong>{responses.filter((answer) => !answer.correct).length}</strong><span>Incorrect</span><strong>{streak}/3</strong><span>Consecutive mistakes</span><button onClick={startAssessment}>Restart</button></aside></div>}

      {step === 4 && result && <div className="ra-result">
        <span>Assessment complete</span><h2>{form.student_name}</h2>
        <div className="ra-result-age"><small>Reading Age</small><strong>{result.result.reading_age}</strong><small>{readingAgeLabel(result.result.reading_age)}</small></div>
        <h3>Complete Result</h3>
        <div className="ra-result-grid ra-complete-grid">
          <div><small>Student</small><strong>{form.student_name}</strong></div><div><small>Chronological age</small><strong>{form.age} years ({result.result.chronological_age_months} months)</strong></div>
          <div><small>Class / Grade</small><strong>{form.class_name}</strong></div><div><small>School</small><strong>{form.school_name}</strong></div>
          <div><small>Location</small><strong>{form.city}, {form.country}</strong></div><div><small>Parent email</small><strong>{form.email}</strong></div>
          <div><small>Reading age</small><strong>{readingAgeLabel(result.result.reading_age)}</strong></div><div><small>Reading gap</small><strong>{gapLabel(result.result.reading_gap_months)}</strong></div>
          <div><small>Classification</small><strong>{result.result.classification}</strong></div><div><small>Recommended starting area</small><strong>{result.result.intervention}</strong></div>
          <div><small>Correct answers</small><strong>{result.result.correct_count}</strong></div><div><small>Incorrect answers</small><strong>{result.result.incorrect_count}</strong></div>
          <div><small>Total attempted</small><strong>{result.result.total_attempted}</strong></div><div><small>Last correct item</small><strong>{result.result.last_correct?.text || "None"}</strong></div>
          <div><small>Assessment ID</small><strong>{result.assessment_number}</strong></div><div><small>Completed</small><strong>{new Date(result.result.completed_at).toLocaleString()}</strong></div>
        </div>
        <p className={result.email_delivery?.sent ? "ra-email-sent" : "ra-email-failed"}>{result.email_delivery?.sent ? `PDF result sent to ${form.email}` : `Assessment saved, but the email could not be sent: ${result.email_delivery?.error || "Please contact the administrator."}`}</p>
        <div className="ra-result-actions">{result.pdf && <button className="ra-download" onClick={downloadPdf}>Download Result PDF</button>}<button className="primary-btn" onClick={() => { setForm(initialForm); setStep(1); }}>Take another test</button></div>
        <div className="ra-program-lead"><h3>Thanks for connecting.</h3><p>Would you like to connect with our Program Lead?</p><Link className="primary-btn" to="/contact">Connect with Program Lead</Link></div>
        {responses.length > 0 && <details className="ra-response-details"><summary>View all {responses.length} assessment responses</summary><div className="ra-response-list">{responses.map((answer, answerIndex) => <div key={answer.item_index}><span>{answerIndex + 1}. {items[answer.item_index]?.text}</span><span>RA {items[answer.item_index]?.ra}</span><strong className={answer.correct ? "response-correct" : "response-wrong"}>{answer.correct ? "Correct" : "Incorrect"}</strong></div>)}</div></details>}
      </div>}
      {error && <p className="ra-error">{error}</p>}
    </div></section>
    <Footer />
  </>;
}