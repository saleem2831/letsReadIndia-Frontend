import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";
import "../../styles/PlatformAdmin.css";
import "../../styles/PlatformAdminActions.css";

const auth = (json = false) => ({ ...(json ? { "Content-Type": "application/json" } : {}),
  Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function ReadingAssessments() {
  const [rows, setRows] = useState([]); const [page, setPage] = useState(1); const [pages, setPages] = useState(1);
  const [search, setSearch] = useState(""); const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(null); const [error, setError] = useState(""); const [message, setMessage] = useState("");

  const load = async (target = page) => {
    const response = await fetch(`${API_URL}/admin/reading-assessments?page=${target}&search=${encodeURIComponent(search)}`, { headers: auth() });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    setRows(data.data); setPage(target); setPages(data.pagination.pages || 1);
  };
  useEffect(() => { load(1).catch((requestError) => setError(requestError.message)); }, []);
  const details = async (id) => {
    setError("");
    const response = await fetch(`${API_URL}/admin/reading-assessments/${id}`, { headers: auth() });
    const data = await response.json();
    if (response.ok) setSelected(data.data); else setError(data.message);
  };
  const sendEmail = async (assessment) => {
    setBusy(assessment.id); setError(""); setMessage("");
    try {
      const response = await fetch(`${API_URL}/admin/reading-assessments/${assessment.id}/email`, { method: "POST", headers: auth(true) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message); await load(page); if (selected?.id === assessment.id) await details(assessment.id);
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(null); }
  };
  const downloadPdf = async (assessment) => {
    setBusy(assessment.id); setError("");
    try {
      const response = await fetch(`${API_URL}/admin/reading-assessments/${assessment.id}/pdf`, { headers: auth() });
      if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.message || "PDF download failed"); }
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url; link.download = `${assessment.assessment_number}-reading-age-result.pdf`; link.click();
      URL.revokeObjectURL(url);
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(null); }
  };
  const remove = async (assessment) => {
    if (!window.confirm(`Permanently delete assessment ${assessment.assessment_number} for ${assessment.student_name}?`)) return;
    setBusy(assessment.id); setError(""); setMessage("");
    try {
      const response = await fetch(`${API_URL}/admin/reading-assessments/${assessment.id}`, { method: "DELETE", headers: auth() });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      if (selected?.id === assessment.id) setSelected(null);
      setMessage(data.message); await load(rows.length === 1 && page > 1 ? page - 1 : page);
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(null); }
  };
  const emailStatus = (row) => row.parent_email_sent
    ? <span className="email-ok">Sent</span>
    : <span className="email-failed" title={row.email_error || "Not sent"}>{row.email_error ? "Failed" : "Not sent"}</span>;

  return <div className="platform-admin">
    <header><div><span>Super Admin</span><h1>Reading Assessments</h1><p>Every completed public Reading Age test appears here.</p></div></header>
    <form className="admin-search" onSubmit={(event) => { event.preventDefault(); load(1); }}><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search student, school or assessment ID" /><button>Search</button></form>
    {message && <p className="admin-success">{message}</p>}{error && <p className="admin-error">{error}</p>}
    <div className="admin-table-wrap"><table><thead><tr><th>Assessment</th><th>Student</th><th>School</th><th>Reading age</th><th>Classification</th><th>Parent PDF email</th><th>Completed</th><th>Actions</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}>
      <td><strong>{row.assessment_number}</strong></td><td>{row.student_name}<small>Age {row.age_years} • {row.class_name}</small></td><td>{row.school_name}<small>{row.city}, {row.country}</small></td><td><strong>{row.reading_age_code}</strong></td><td>{row.classification}<small>{row.intervention}</small></td>
      <td>{emailStatus(row)}<small>{row.email || "No parent email"}</small></td><td>{new Date(row.completed_at).toLocaleString()}</td>
      <td><div className="admin-actions"><button className="small" onClick={() => details(row.id)}>View</button><button className="download-action" disabled={busy === row.id} onClick={() => downloadPdf(row)}>Download PDF</button><button className="email-action" disabled={busy === row.id || !row.email} onClick={() => sendEmail(row)}>{row.parent_email_sent ? "Resend PDF" : "Send PDF"}</button><button className="danger" disabled={busy === row.id} onClick={() => remove(row)}>{busy === row.id ? "Working…" : "Delete"}</button></div></td>
    </tr>)}</tbody></table></div>
    <div className="admin-pages"><button disabled={page <= 1} onClick={() => load(page - 1)}>Previous</button><span>{page} / {pages}</span><button disabled={page >= pages} onClick={() => load(page + 1)}>Next</button></div>
    {selected && <div className="admin-modal-bg" onMouseDown={() => setSelected(null)}><section className="admin-modal" onMouseDown={(event) => event.stopPropagation()}>
      <button className="modal-x" onClick={() => setSelected(null)}>×</button><span>{selected.assessment_number}</span><h2>{selected.student_name}</h2>
      <div className="detail-grid">
        <div><small>Student</small><strong>{selected.student_name}</strong></div><div><small>Age / Class</small><strong>{selected.age_years} years • {selected.class_name}</strong></div>
        <div><small>School</small><strong>{selected.school_name}</strong></div><div><small>Location</small><strong>{selected.city}, {selected.country}</strong></div>
        <div><small>Chronological age</small><strong>{selected.chronological_age_months} months</strong></div><div><small>Reading age</small><strong>{selected.reading_age_code} {selected.reading_age_months != null ? `(${selected.reading_age_months} months)` : ""}</strong></div>
        <div><small>Reading gap</small><strong>{selected.reading_gap_months == null ? "Not available" : selected.reading_gap_months > 0 ? `${selected.reading_gap_months} months below` : selected.reading_gap_months < 0 ? `${Math.abs(selected.reading_gap_months)} months above` : "Age appropriate"}</strong></div><div><small>Classification</small><strong>{selected.classification}</strong></div>
        <div><small>Correct / Incorrect / Attempted</small><strong>{selected.correct_count} / {selected.incorrect_count} / {selected.correct_count + selected.incorrect_count}</strong></div><div><small>Last correct item</small><strong>{selected.last_correct_item || "None"}</strong></div>
        <div><small>Recommended area</small><strong>{selected.intervention}</strong></div><div><small>Completed</small><strong>{new Date(selected.completed_at).toLocaleString()}</strong></div>
        <div><small>Parent email</small><strong>{selected.email || "—"}</strong></div><div><small>Email delivery</small><strong>{selected.parent_email_sent ? `Sent ${selected.parent_email_sent_at ? new Date(selected.parent_email_sent_at).toLocaleString() : ""}` : selected.email_error || "Not sent"}</strong></div>
      </div>
      <div className="modal-actions"><button className="download-action" disabled={busy === selected.id} onClick={() => downloadPdf(selected)}>Download PDF</button><button className="email-action" disabled={busy === selected.id || !selected.email} onClick={() => sendEmail(selected)}>{selected.parent_email_sent ? "Resend PDF email" : "Send PDF email"}</button><button className="danger" disabled={busy === selected.id} onClick={() => remove(selected)}>Delete assessment</button></div>
      <h3>Response history</h3><div className="response-history">{selected.responses.map((answer) => <div key={answer.item_index}><span>{answer.response_order}. {answer.item_text}</span><strong className={answer.is_correct ? "correct" : "wrong"}>{answer.is_correct ? "Correct" : "Incorrect"}</strong></div>)}</div>
    </section></div>}
  </div>;
}
