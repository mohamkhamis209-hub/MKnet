import { t } from "./i18n.js";
import { getDemoDashboard, getDemoDailyUsage, getDemoLiveHistory } from "./demoData.js";

// Same contract as legacy UI + MKnet enhancements: cookie session, dual CSRF headers, cross-origin support.
function nice(m) {
  if (/current password incorrect/i.test(m)) return t("err.pw.bad");
  if (/invalid code/i.test(m)) return t("err.code.bad");
  const h = /^HTTP (\d{3})$/.exec(m); if (h) return t("err.http").replace("{n}", h[1]);
  return m;
}

let onUnauthorized = () => {};
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn; };

let demoMode = false;
export const setDemoMode = (v) => { demoMode = !!v; };
export const isDemoMode = () => demoMode;

export function getApiBase() {
  try {
    return (localStorage.getItem("mknet_api_base") || "").replace(/\/+$/, "");
  } catch {
    return "";
  }
}

export function setApiBase(url) {
  try {
    const clean = (url || "").trim().replace(/\/+$/, "");
    if (clean) localStorage.setItem("mknet_api_base", clean);
    else localStorage.removeItem("mknet_api_base");
  } catch {}
}

async function req(method, path, body) {
  // Demo mode interception: safe read-only simulation without false claims
  if (demoMode) {
    if (method !== "GET") {
      window.dispatchEvent(new CustomEvent("mknet:demo_action_blocked", { detail: { method, path } }));
      return { ok: false, demo: true, detail: "Demo Mode: Action simulated" };
    }
    // Simulated GET endpoints
    if (path.startsWith("/api/usage/daily")) return getDemoDailyUsage();
    if (path.startsWith("/api/history/live")) return getDemoLiveHistory();
    if (path.startsWith("/api/dashboard")) return getDemoDashboard();
    if (path.startsWith("/api/me")) return { authenticated: true, user: "admin", demo: true };
    return {};
  }

  const base = getApiBase();
  const url = base ? `${base}${path.startsWith("/") ? path : "/" + path}` : path;
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-QM-CSRF": "1",
      "X-MK-CSRF": "1"
    },
    credentials: base ? "include" : "same-origin"
  };

  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (res.status === 401 && path !== "/api/login") {
    onUnauthorized();
    throw new Error("unauthorized");
  }
  let data = null;
  try { data = await res.json(); } catch { /* empty body */ }
  if (!res.ok) {
    const msg = (data && data.detail) || `HTTP ${res.status}`;
    throw new Error(typeof msg === "string" ? nice(msg) : JSON.stringify(msg));
  }
  return data;
}

export const api = {
  get: (p) => req("GET", p),
  post: (p, b) => req("POST", p, b),
  patch: (p, b) => req("PATCH", p, b),
  del: (p) => req("DELETE", p),
};
