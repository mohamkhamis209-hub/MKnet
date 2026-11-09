"""Generate high-quality SVG and PNG branding assets for MKnet."""
import os
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ICONS_DIR = ROOT / "icons"
ICONS_DIR.mkdir(parents=True, exist_ok=True)

# 1. Master MKnet SVG (Transparent background)
SVG_CONTENT = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%" role="img" aria-label="MKnet">
  <defs>
    <linearGradient id="mkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F2FE"/>
      <stop offset="45%" stop-color="#38BDF8"/>
      <stop offset="80%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#6366F1"/>
    </linearGradient>
    <linearGradient id="mkGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.2"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Network signal arc -->
  <path d="M 40 18 A 28 28 0 0 1 88 18" fill="none" stroke="url(#mkGrad)" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 0" opacity="0.85"/>
  <circle cx="64" cy="18" r="3" fill="#00F2FE" />

  <!-- Outer tech boundary ring (subtle) -->
  <rect x="10" y="10" width="108" height="108" rx="28" fill="none" stroke="url(#mkGrad)" stroke-width="1.5" stroke-opacity="0.25" stroke-dasharray="6 4"/>

  <!-- Glow underlay -->
  <g filter="url(#glow)" opacity="0.7">
    <!-- M Stroke -->
    <path d="M 26 94 L 26 36 L 47 66 L 68 36 L 68 94" fill="none" stroke="url(#mkGrad)" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- K Arms -->
    <path d="M 68 62 L 98 34 M 68 62 L 98 94" fill="none" stroke="url(#mkGrad)" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Sharp Main Monogram MK -->
  <g id="monogram">
    <!-- M Path -->
    <path d="M 26 94 L 26 36 L 47 66 L 68 36 L 68 94" fill="none" stroke="url(#mkGrad)" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- K Arms -->
    <path d="M 68 62 L 98 34 M 68 62 L 98 94" fill="none" stroke="url(#mkGrad)" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- High-tech circuit / network terminal nodes -->
  <circle cx="26" cy="36" r="4" fill="#E0F2FE" />
  <circle cx="47" cy="66" r="3.5" fill="#E0F2FE" />
  <circle cx="68" cy="36" r="4" fill="#E0F2FE" />
  <circle cx="98" cy="34" r="4" fill="#E0F2FE" />
  <circle cx="98" cy="94" r="4" fill="#E0F2FE" />
  <circle cx="26" cy="94" r="4" fill="#E0F2FE" />
  <circle cx="68" cy="94" r="4" fill="#E0F2FE" />
</svg>
'''

# Favicon SVG (Simpler, higher contrast for small sizes 16px/32px)
FAVICON_SVG = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
  <defs>
    <linearGradient id="favGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F2FE"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="#0B101B"/>
  <path d="M 14 48 L 14 18 L 26 34 L 38 18 L 38 48" fill="none" stroke="url(#favGrad)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 38 32 L 52 18 M 38 32 L 52 48" fill="none" stroke="url(#favGrad)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="14" cy="18" r="2.5" fill="#E0F2FE"/>
  <circle cx="38" cy="18" r="2.5" fill="#E0F2FE"/>
  <circle cx="52" cy="18" r="2.5" fill="#E0F2FE"/>
  <circle cx="52" cy="48" r="2.5" fill="#E0F2FE"/>
  <circle cx="14" cy="48" r="2.5" fill="#E0F2FE"/>
  <circle cx="38" cy="48" r="2.5" fill="#E0F2FE"/>
</svg>
'''

def write_svg_files():
    (ROOT / "favicon.svg").write_text(FAVICON_SVG.strip(), encoding="utf-8")
    (ROOT / "web" / "favicon.svg").write_text(FAVICON_SVG.strip(), encoding="utf-8")
    (ROOT / "web" / "logo.svg").write_text(SVG_CONTENT.strip(), encoding="utf-8")
    (ROOT / "logo.svg").write_text(SVG_CONTENT.strip(), encoding="utf-8")
    print("SVG logos and favicons written successfully.")

def draw_mk_icon(size: int, maskable: bool = False) -> Image.Image:
    # High resolution rendering surface (4x supersampling for ultra smooth antialiased curves)
    scale = 4
    canvas_size = size * scale
    img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background
    if maskable:
        # Full solid dark tech background for maskable icons
        draw.rectangle([0, 0, canvas_size, canvas_size], fill=(11, 16, 27, 255))
    else:
        # Rounded squircle container with dark tech background
        r = int(canvas_size * 0.22)
        draw.rounded_rectangle([scale * 4, scale * 4, canvas_size - scale * 4, canvas_size - scale * 4],
                               radius=r, fill=(11, 16, 27, 255), outline=(56, 189, 248, 100), width=scale * 2)

    # Content margin / safe area for maskable vs standard
    margin = 0.24 if maskable else 0.16
    left = canvas_size * margin
    right = canvas_size * (1 - margin)
    top = canvas_size * margin
    bottom = canvas_size * (1 - margin)
    w = right - left
    h = bottom - top

    # Coordinates
    # M points
    m_x1 = left + w * 0.08
    m_x2 = left + w * 0.40
    m_x3 = left + w * 0.68
    y_top = top + h * 0.18
    y_mid = top + h * 0.58
    y_bot = top + h * 0.92

    # K points
    k_stem_x = m_x3
    k_arm_x = left + w * 0.96
    k_y_joint = top + h * 0.55
    k_y_up = y_top
    k_y_down = y_bot

    line_w = int(w * 0.10)

    # Function to draw line with gradient interpolation
    def draw_segment(p1, p2, col1, col2, width):
        # Draw multi-step lines or smooth thick line
        steps = 40
        for i in range(steps):
            t0 = i / steps
            t1 = (i + 1) / steps
            sx = p1[0] + (p2[0] - p1[0]) * t0
            sy = p1[1] + (p2[1] - p1[1]) * t0
            ex = p1[0] + (p2[0] - p1[0]) * t1
            ey = p1[1] + (p2[1] - p1[1]) * t1
            r = int(col1[0] + (col2[0] - col1[0]) * t0)
            g = int(col1[1] + (col2[1] - col1[1]) * t0)
            b = int(col1[2] + (col2[2] - col1[2]) * t0)
            draw.line([(sx, sy), (ex, ey)], fill=(r, g, b, 255), width=width)

    # Color palette: Cyan -> Sky Blue -> Electric Cobalt
    c_cyan = (0, 242, 254)
    c_sky = (56, 189, 248)
    c_blue = (59, 130, 246)
    c_indigo = (99, 102, 241)

    # M strokes
    draw_segment((m_x1, y_bot), (m_x1, y_top), c_cyan, c_sky, line_w)
    draw_segment((m_x1, y_top), (m_x2, y_mid), c_sky, c_blue, line_w)
    draw_segment((m_x2, y_mid), (m_x3, y_top), c_blue, c_sky, line_w)
    draw_segment((m_x3, y_top), (m_x3, y_bot), c_sky, c_blue, line_w)

    # K arms
    draw_segment((k_stem_x, k_y_joint), (k_arm_x, k_y_up), c_sky, c_cyan, line_w)
    draw_segment((k_stem_x, k_y_joint), (k_arm_x, k_y_down), c_blue, c_indigo, line_w)

    # Terminal node circles
    node_r = int(line_w * 0.42)
    nodes = [
        (m_x1, y_top), (m_x2, y_mid), (m_x3, y_top),
        (m_x1, y_bot), (m_x3, y_bot),
        (k_arm_x, k_y_up), (k_arm_x, k_y_down)
    ]
    for nx, ny in nodes:
        draw.ellipse([nx - node_r, ny - node_r, nx + node_r, ny + node_r], fill=(224, 242, 254, 255))

    # Downscale with high quality Lanczos antialiasing
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

def generate_png_icons():
    # mk-192.png
    icon192 = draw_mk_icon(192, maskable=False)
    icon192.save(ICONS_DIR / "mk-192.png", "PNG")

    # mk-512.png
    icon512 = draw_mk_icon(512, maskable=False)
    icon512.save(ICONS_DIR / "mk-512.png", "PNG")

    # mk-192-maskable.png
    mask192 = draw_mk_icon(192, maskable=True)
    mask192.save(ICONS_DIR / "mk-192-maskable.png", "PNG")

    # mk-512-maskable.png
    mask512 = draw_mk_icon(512, maskable=True)
    mask512.save(ICONS_DIR / "mk-512-maskable.png", "PNG")

    print("Generated all 4 PNG icons successfully in icons/.")

if __name__ == "__main__":
    write_svg_files()
    generate_png_icons()
