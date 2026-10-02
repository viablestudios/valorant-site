"use client";

import { useMemo, useState } from "react";
import type { StoredReview } from "@/lib/reviewStore";
import { SOURCE_BADGE } from "@/lib/reviewDisplay";
import styles from "./AdminReviews.module.css";

type ProductOption = { slug: string; name: string; group: string };
type Source = StoredReview["source"];
const SOURCES: Source[] = ["customer", "verified-buyer", "tester", "community"];
const today = () => new Date().toISOString().slice(0, 10);

const blank = (productSlug = "") => ({
  productSlug,
  name: "",
  rating: 5,
  title: "",
  body: "",
  date: today(),
  source: "customer" as Source,
  confirmedReal: false,
  status: "approved" as StoredReview["status"],
});

async function api(url: string, method: string, body?: unknown) {
  const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
  return json;
}

export function AdminReviews({
  enabled,
  signedIn,
  products,
  initialReviews,
}: {
  enabled: boolean;
  signedIn: boolean;
  products: ProductOption[];
  initialReviews: StoredReview[];
}) {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [reviews, setReviews] = useState<StoredReview[]>(initialReviews);
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [fProduct, setFProduct] = useState("all");
  const [fStatus, setFStatus] = useState("all");

  const nameOf = useMemo(() => Object.fromEntries(products.map((p) => [p.slug, p.name])), [products]);
  const groups = useMemo(() => {
    const g: Record<string, ProductOption[]> = {};
    products.forEach((p) => (g[p.group] ??= []).push(p));
    return g;
  }, [products]);

  // Per-product rating and count: approved, confirmed-real reviews assigned to that product only.
  const perProduct = useMemo(() => {
    const m: Record<string, { n: number; sum: number }> = {};
    reviews.filter((r) => r.status === "approved" && r.confirmedReal).forEach((r) => {
      const x = (m[r.productSlug] ??= { n: 0, sum: 0 });
      x.n += 1;
      x.sum += r.rating;
    });
    return Object.entries(m).map(([slug, v]) => ({ slug, n: v.n, avg: v.sum / v.n }));
  }, [reviews]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      await api("/api/admin/login", "POST", { password });
      window.location.reload();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Could not sign in.");
    }
  }
  async function signOut() {
    await api("/api/admin/logout", "POST");
    window.location.reload();
  }

  function startEdit(r: StoredReview) {
    setEditing(r.id);
    setForm({ productSlug: r.productSlug, name: r.name, rating: r.rating, title: r.title, body: r.body, date: r.date, source: r.source, confirmedReal: r.confirmedReal, status: r.status });
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function reset() {
    setEditing(null);
    setForm(blank(form.productSlug));
    setError("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    try {
      if (editing) {
        const { review } = await api(`/api/admin/reviews/${editing}`, "PATCH", form);
        setReviews((list) => list.map((r) => (r.id === editing ? review : r)));
        setNotice("Review updated.");
      } else {
        const { review } = await api("/api/admin/reviews", "POST", form);
        setReviews((list) => [review, ...list]);
        setNotice(form.status === "approved" ? "Review added and showing on the shop." : "Review saved but not showing on the shop yet.");
      }
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(r: StoredReview, status: StoredReview["status"]) {
    setError("");
    setNotice("");
    try {
      const { review } = await api(`/api/admin/reviews/${r.id}`, "PATCH", { status });
      setReviews((list) => list.map((x) => (x.id === r.id ? review : x)));
      setNotice(status === "approved" ? "Approved: it now shows on the shop." : "Hidden: it no longer shows on the shop.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change it.");
      if (status === "approved") startEdit(r);
    }
  }
  async function remove(r: StoredReview) {
    if (!window.confirm(`Delete this review by ${r.name}? This cannot be undone.`)) return;
    try {
      await api(`/api/admin/reviews/${r.id}`, "DELETE");
      setReviews((list) => list.filter((x) => x.id !== r.id));
      if (editing === r.id) reset();
      setNotice("Review deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete it.");
    }
  }

  if (!signedIn) {
    return (
      <main className={styles.page}>
        <div className={styles.login}>
          <h1>Reviews admin</h1>
          {!enabled ? (
            <p className={styles.error}>The admin is switched off. Set <code>ADMIN_PASSWORD</code> (8+ characters) in <code>.env.local</code>, then restart the shop.</p>
          ) : (
            <form onSubmit={signIn}>
              <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" autoFocus />
              </label>
              {loginError && <p className={styles.error}>{loginError}</p>}
              <button className={styles.primary} type="submit">Sign in</button>
            </form>
          )}
        </div>
      </main>
    );
  }

  const shown = reviews.filter((r) => (fProduct === "all" || r.productSlug === fProduct) && (fStatus === "all" || r.status === fStatus));

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <div>
          <h1>Reviews admin</h1>
          <p className={styles.muted}>Add real reviews and choose which product each one belongs to. Fictional sample reviews are not listed here and always stay marked as samples.</p>
        </div>
        <button className={styles.ghost} onClick={signOut}>Sign out</button>
      </header>

      <section className={styles.card}>
        <h2>{editing ? "Edit review" : "Add a review"}</h2>
        <form onSubmit={save} className={styles.form}>
          <label>
            Product
            <select value={form.productSlug} onChange={(e) => setForm({ ...form, productSlug: e.target.value })} required>
              <option value="">Choose a product</option>
              {Object.entries(groups).map(([g, list]) => (
                <optgroup key={g} label={g}>
                  {list.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <label>
            Reviewer name or username
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} required />
          </label>
          <div className={styles.row}>
            <fieldset className={styles.stars}>
              <legend>Star rating</legend>
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={form.rating === n} className={n <= form.rating ? styles.on : ""} onClick={() => setForm({ ...form, rating: n })}>★</button>
              ))}
            </fieldset>
            <label>
              Date
              <input type="date" value={form.date} max={today()} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <small className={styles.muted}>Leave blank if the original review date is unknown.</small>
            </label>
            <label>
              Review type
              <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as Source })}>
                {SOURCES.map((s) => (
                  <option key={s} value={s}>{SOURCE_BADGE[s]}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Title (optional)
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={120} />
          </label>
          <label>
            Review text
            <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} maxLength={2000} required />
          </label>
          <label className={styles.check}>
            <input type="checkbox" checked={form.confirmedReal} onChange={(e) => setForm({ ...form, confirmedReal: e.target.checked })} />
            <span>I confirm this review came from a real person who gave this feedback. Reviews without this are never shown on the shop.</span>
          </label>
          <label>
            Show it on the shop?
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as StoredReview["status"] })}>
              <option value="approved">Yes, approved (shows on its product)</option>
              <option value="hidden">No, keep it hidden for now</option>
              <option value="pending">No, mark it as waiting for a check</option>
            </select>
          </label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          {notice && <p className={styles.notice} role="status">{notice}</p>}
          <div className={styles.actions}>
            <button className={styles.primary} type="submit" disabled={busy}>{editing ? "Save changes" : "Add review"}</button>
            {editing && <button className={styles.ghost} type="button" onClick={reset}>Cancel</button>}
          </div>
        </form>
      </section>

      {perProduct.length > 0 && (
        <section className={styles.card}>
          <h2>Ratings per product</h2>
          <p className={styles.muted}>Calculated only from approved, confirmed reviews assigned to each product.</p>
          <ul className={styles.summary}>
            {perProduct.map((p) => (
              <li key={p.slug}><strong>{nameOf[p.slug] ?? p.slug}</strong> {p.avg.toFixed(1)} from {p.n} review{p.n === 1 ? "" : "s"}</li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.card}>
        <div className={styles.listHead}>
          <h2>All reviews ({shown.length})</h2>
          <div className={styles.filters}>
            <select value={fProduct} onChange={(e) => setFProduct(e.target.value)} aria-label="Filter by product">
              <option value="all">All products</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>
            <select value={fStatus} onChange={(e) => setFStatus(e.target.value)} aria-label="Filter by status">
              <option value="all">Any status</option>
              <option value="approved">Approved</option>
              <option value="pending">Waiting for a check</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>
        {shown.length === 0 && <p className={styles.muted}>No reviews yet. Add the first one above, or visitors can send them from the shop and they will appear here as waiting for a check.</p>}
        <ul className={styles.list}>
          {shown.map((r) => (
            <li key={r.id} className={styles.item}>
              <div className={styles.itemHead}>
                <span className={styles.stars2} aria-label={`${r.rating} out of 5`}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                <span className={`${styles.pill} ${styles[r.status]}`}>{r.status === "pending" ? "Waiting for a check" : r.status === "approved" ? "Approved" : "Hidden"}</span>
                <span className={styles.pill}>{SOURCE_BADGE[r.source]}</span>
                {!r.confirmedReal && <span className={`${styles.pill} ${styles.warn}`}>Not confirmed as real</span>}
              </div>
              <p className={styles.meta}><strong>{nameOf[r.productSlug] ?? r.productSlug}</strong> · {r.name} · {r.date}</p>
              {r.title && <p className={styles.title}>{r.title}</p>}
              <p className={styles.body}>{r.body}</p>
              <div className={styles.actions}>
                {r.status !== "approved" && <button className={styles.small} onClick={() => setStatus(r, "approved")}>Approve</button>}
                {r.status !== "hidden" && <button className={styles.small} onClick={() => setStatus(r, "hidden")}>Hide</button>}
                <button className={styles.small} onClick={() => startEdit(r)}>Edit</button>
                <button className={`${styles.small} ${styles.danger}`} onClick={() => remove(r)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
