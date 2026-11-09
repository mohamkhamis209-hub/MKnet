/**
 * MKnet Demo Data Generator
 * Provides realistic, clean simulated state when running on GitHub Pages
 * or in standalone preview mode without an active gateway backend.
 */

export function getDemoDashboard() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const period_start = `${year}-${month}-01`;
  const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
  const period_end = `${year}-${month}-${lastDay}`;
  const days_left = Math.max(1, lastDay - now.getDate());

  return {
    version: "1.0.0 (Demo Mode)",
    is_demo: true,
    bundle: {
      total_gb: 250,
      used_gb: 142.5,
      remaining_gb: 107.5,
      days_left: days_left,
      period_start: period_start,
      period_end: period_end,
      status: "active",
      over: false,
      allowances: { "1": 80, "2": 60, "3": 50, "4": 30 },
      daily_plan_enabled: false
    },
    users: [
      {
        id: 1,
        name: "محمد (Mohamed)",
        protected: true,
        quota_gb: 90,
        used_gb: 46.2,
        remaining_gb: 43.8,
        pct: 51,
        status: "ok",
        speed: { down_bps: 2450000, up_bps: 380000 },
        devices: [
          { id: 101, name: "Admin Workstation", ip: "192.168.1.10", mac: "bc:24:11:42:aa:01", down_bps: 1850000, up_bps: 290000, online: true, blocked: false, status: "ok" },
          { id: 102, name: "Galaxy Ultra", ip: "192.168.1.11", mac: "bc:24:11:42:aa:02", down_bps: 600000, up_bps: 90000, online: true, blocked: false, status: "ok" }
        ]
      },
      {
        id: 2,
        name: "سارة (Sarah)",
        protected: false,
        quota_gb: 60,
        used_gb: 38.4,
        remaining_gb: 21.6,
        pct: 64,
        status: "ok",
        speed: { down_bps: 1200000, up_bps: 150000 },
        devices: [
          { id: 103, name: "MacBook Pro", ip: "192.168.1.12", mac: "bc:24:11:42:bb:01", down_bps: 1200000, up_bps: 150000, online: true, blocked: false, status: "ok" },
          { id: 104, name: "iPad Air", ip: "192.168.1.13", mac: "bc:24:11:42:bb:02", down_bps: 0, up_bps: 0, online: false, blocked: false, status: "offline" }
        ]
      },
      {
        id: 3,
        name: "عمر (Omar)",
        protected: false,
        quota_gb: 50,
        used_gb: 48.9,
        remaining_gb: 1.1,
        pct: 98,
        status: "warn",
        speed: { down_bps: 3100000, up_bps: 420000 },
        devices: [
          { id: 105, name: "Gaming PC", ip: "192.168.1.14", mac: "bc:24:11:42:cc:01", down_bps: 3100000, up_bps: 420000, online: true, blocked: false, status: "ok" }
        ]
      },
      {
        id: 4,
        name: "شاشة الصالة (Smart TV)",
        protected: false,
        quota_gb: 30,
        used_gb: 9.0,
        remaining_gb: 21.0,
        pct: 30,
        status: "ok",
        speed: { down_bps: 850000, up_bps: 40000 },
        devices: [
          { id: 106, name: "LG WebOS TV", ip: "192.168.1.20", mac: "bc:24:11:42:dd:01", down_bps: 850000, up_bps: 40000, online: true, blocked: false, status: "ok" }
        ]
      }
    ],
    devices: [
      { id: 101, user_id: 1, name: "Admin Workstation", ip: "192.168.1.10", mac: "bc:24:11:42:aa:01", down_bps: 1850000, up_bps: 290000, online: true, blocked: false, status: "ok" },
      { id: 102, user_id: 1, name: "Galaxy Ultra", ip: "192.168.1.11", mac: "bc:24:11:42:aa:02", down_bps: 600000, up_bps: 90000, online: true, blocked: false, status: "ok" },
      { id: 103, user_id: 2, name: "MacBook Pro", ip: "192.168.1.12", mac: "bc:24:11:42:bb:01", down_bps: 1200000, up_bps: 150000, online: true, blocked: false, status: "ok" },
      { id: 104, user_id: 2, name: "iPad Air", ip: "192.168.1.13", mac: "bc:24:11:42:bb:02", down_bps: 0, up_bps: 0, online: false, blocked: false, status: "offline" },
      { id: 105, user_id: 3, name: "Gaming PC", ip: "192.168.1.14", mac: "bc:24:11:42:cc:01", down_bps: 3100000, up_bps: 420000, online: true, blocked: false, status: "ok" },
      { id: 106, user_id: 4, name: "LG WebOS TV", ip: "192.168.1.20", mac: "bc:24:11:42:dd:01", down_bps: 850000, up_bps: 40000, online: true, blocked: false, status: "ok" }
    ],
    total_down_bps: 7600000,
    total_up_bps: 1000000,
    total_lan_down_bps: 1500000,
    total_lan_up_bps: 300000,
    internet: {
      status: "up",
      wan_ip: "197.35.48.91",
      latency_ms: 14.5,
      dns_ok: true,
      gateway: "192.168.1.1"
    },
    network: {
      lan_ip: "192.168.1.1",
      subnet: "255.255.255.0",
      dhcp_range: "192.168.1.10 - 192.168.1.200",
      active_leases: 6
    },
    security: {
      firewall_active: true,
      waf_strict: true,
      dns_filter_active: true,
      blocked_domains_count: 341200,
      queries_blocked_today: 418
    },
    vpn: {
      installed: true,
      active: true,
      type: "wireguard",
      peers_count: 2
    },
    rogue: [],
    pending_guests: [],
    update: {
      available: false,
      enabled: true,
      current_version: "1.0.0"
    }
  };
}

export function getDemoDailyUsage() {
  const rows = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const base = 4.5 + Math.sin(i) * 2;
    rows.push({
      date: dateStr,
      wan_down_bytes: Math.round(base * 1024 * 1024 * 1024),
      wan_up_bytes: Math.round((base * 0.15) * 1024 * 1024 * 1024),
      lan_down_bytes: Math.round(1.2 * 1024 * 1024 * 1024),
      lan_up_bytes: Math.round(0.3 * 1024 * 1024 * 1024)
    });
  }
  return { days: 7, rows };
}

export function getDemoLiveHistory() {
  const now = Date.now() / 1000;
  const samples = [];
  for (let i = 20; i >= 0; i--) {
    const t = now - i * 5;
    samples.push({
      t: round(t, 1),
      down: Math.round(5000000 + Math.random() * 3000000),
      up: Math.round(800000 + Math.random() * 400000),
      lan_down: 800000,
      lan_up: 200000
    });
  }
  return samples;
}

function round(val, digits) {
  const factor = Math.pow(10, digits);
  return Math.round(val * factor) / factor;
}
