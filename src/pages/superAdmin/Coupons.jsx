import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";
import "../../styles/PlatformAdmin.css";
import "../../styles/PlatformAdminActions.css";

const blank = { code: "", description: "", discount_type: "percent", discount_value: "", minimum_order: "0",
  maximum_discount: "", maximum_uses: "", uses_per_email: "", starts_at: "", expires_at: "", is_active: true };
const headers = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function Coupons() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    const response = await fetch(`${API_URL}/coupons`, { headers: headers() });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    setRows(data.data || []);
  };
  useEffect(() => { load().catch((requestError) => setError(requestError.message)); }, []);

  const save = async (event) => {
    event.preventDefault(); setError(""); setMessage("");
    const response = await fetch(`${API_URL}/coupons${editing ? `/${editing}` : ""}`, {
      method: editing ? "PUT" : "POST", headers: headers(), body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) return setError(data.message);
    setForm(blank); setEditing(null); setMessage(data.message); await load();
  };
  const edit = (coupon) => {
    setEditing(coupon.id);
    setForm({ ...coupon, starts_at: coupon.starts_at ? coupon.starts_at.slice(0, 16) : "",
      expires_at: coupon.expires_at ? coupon.expires_at.slice(0, 16) : "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggle = async (coupon) => {
    setBusy(coupon.id); setError("");
    try {
      const response = await fetch(`${API_URL}/coupons/${coupon.id}/status`, { method: "PATCH", headers: headers(),
        body: JSON.stringify({ is_active: !coupon.is_active }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await load();
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(null); }
  };
  const remove = async (coupon) => {
    if (!window.confirm(`Remove coupon ${coupon.code}? Historical orders will remain unchanged.`)) return;
    setBusy(coupon.id); setError(""); setMessage("");
    try {
      const response = await fetch(`${API_URL}/coupons/${coupon.id}`, { method: "DELETE", headers: headers() });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      if (editing === coupon.id) { setEditing(null); setForm(blank); }
      setMessage(data.message); await load();
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(null); }
  };

  return <div className="platform-admin">
    <header><div><span>Super Admin</span><h1>Coupons</h1><p>Create controlled discounts and monitor redemption counts. Removing a used coupon safely preserves its order history.</p></div><strong>{rows.length} codes</strong></header>
    <form className="platform-form" onSubmit={save}>
      <input required placeholder="CODE" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
      <input placeholder="Description" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <select value={form.discount_type} onChange={(e) => setForm({ ...form, discount_type: e.target.value })}><option value="percent">Percentage</option><option value="fixed">Fixed ₹</option></select>
      <input required type="number" min="0.01" step="0.01" placeholder="Value" value={form.discount_value} onChange={(e) => setForm({ ...form, discount_value: e.target.value })} />
      <input type="number" min="0" placeholder="Minimum order" value={form.minimum_order} onChange={(e) => setForm({ ...form, minimum_order: e.target.value })} />
      <input type="number" min="0" placeholder="Maximum discount" value={form.maximum_discount || ""} onChange={(e) => setForm({ ...form, maximum_discount: e.target.value })} />
      <input type="number" min="1" placeholder="Total use limit" value={form.maximum_uses || ""} onChange={(e) => setForm({ ...form, maximum_uses: e.target.value })} />
      <input type="number" min="1" placeholder="Uses per email" value={form.uses_per_email || ""} onChange={(e) => setForm({ ...form, uses_per_email: e.target.value })} />
      <label>Starts<input type="datetime-local" value={form.starts_at || ""} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} /></label>
      <label>Expires<input type="datetime-local" value={form.expires_at || ""} onChange={(e) => setForm({ ...form, expires_at: e.target.value })} /></label>
      <button>{editing ? "Update coupon" : "Create coupon"}</button>{editing && <button type="button" className="muted" onClick={() => { setEditing(null); setForm(blank); }}>Cancel</button>}
    </form>
    {message && <p className="admin-success">{message}</p>}{error && <p className="admin-error">{error}</p>}
    <div className="admin-table-wrap"><table><thead><tr><th>Code</th><th>Discount</th><th>Minimum</th><th>Uses</th><th>Validity</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map((coupon) => <tr key={coupon.id}>
      <td><strong>{coupon.code}</strong><small>{coupon.description}</small></td><td>{coupon.discount_type === "percent" ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`}</td><td>₹{coupon.minimum_order}</td><td>{coupon.uses}{coupon.maximum_uses ? ` / ${coupon.maximum_uses}` : ""}</td>
      <td><small>{coupon.starts_at ? new Date(coupon.starts_at).toLocaleString() : "Immediately"}<br />{coupon.expires_at ? `to ${new Date(coupon.expires_at).toLocaleString()}` : "No expiry"}</small></td>
      <td><button disabled={busy === coupon.id} className={coupon.is_active ? "status-on" : "status-off"} onClick={() => toggle(coupon)}>{coupon.is_active ? "Active" : "Inactive"}</button></td>
      <td><div className="admin-actions"><button className="small" onClick={() => edit(coupon)}>Edit</button><button disabled={busy === coupon.id} className="danger" onClick={() => remove(coupon)}>{busy === coupon.id ? "Working…" : "Delete"}</button></div></td>
    </tr>)}</tbody></table></div>
  </div>;
}
