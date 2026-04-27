# EboSuite → OBS → Premiere → Export Workflow

A clean, repeatable pipeline for recording EboSuite compositions and producing high-quality video outputs.

---

# 1. Screen Resolution (Mac)

1. Open **System Settings → Displays**
2. Click **Scaled**
3. Note your resolution (example: `1512 × 982`)
4. This is your **Base (Canvas) resolution in OBS**

---

# 2. OBS Setup

Using: OBS Studio

## 2.1 Create Scene

- Open OBS
- In **Scenes** → click `+`
- Name: `EboSuite Recording`

## 2.2 Add Source

- In **Sources** → click `+`
- Select **Window Capture**
- Choose your browser with EboSuite open

## 2.3 Fix Position / Alignment

If composition is cut off or shifted:

- Right click source → **Transform → Reset Transform**
- Right click → **Transform → Fit to Screen**
- Right click → **Transform → Center to Screen**

## 2.4 Crop (optional but recommended)

- Hold **Option (⌥)** and drag edges
- Frame only the composition (remove browser UI)

## 2.5 Lock Source

- Right click source → **Lock**

---

# 3. OBS Video Settings

Go to **Settings → Video**

## Recommended Setup

- Base (Canvas): `1512 × 982`
- Output (Scaled): `1512 × 982` ← IMPORTANT (no upscaling)
- FPS: `30` (or `60` if needed)

### Why

- Avoids blur from double scaling
- Preserves original sharpness

---

# 4. OBS Recording Settings

Go to **Settings → Output → Recording**

- Format: `.mp4`
- Encoder:
  - Mac: Apple VT H264
- Quality: High Quality
- Recording Path: set a known folder

---

# 5. Recording Process

1. Fullscreen your browser (optional)
2. Click **Start Recording**
3. Wait ~2 seconds
4. Play composition
5. Wait ~2 seconds after it ends
6. Click **Stop Recording**

---

# 6. Import into Premiere

Using: Adobe Premiere Pro

## 6.1 Import Clip

- Drag OBS recording into project

## 6.2 Create Sequence

Option A:

- Right click clip → **New Sequence from Clip**

Option B:

- Manually create sequence:
  - 1920 × 1080 (or 2560 × 1440)

---

# 7. Fix Scaling in Premiere

- Right click clip → **Set to Frame Size** (IMPORTANT)

### Do NOT use:

- “Scale to Frame Size” (reduces quality)

---

# 8. Improve Visual Quality

## 8.1 Add Sharpen

- Effects → **Sharpen**
- Amount: `5–15`

## 8.2 Optional Upscale (Recommended)

- Use a **1440p sequence (2560×1440)**

### Why:

- Better perceived sharpness
- Higher bitrate on YouTube

---

# 9. Export Settings

## 9.1 YouTube Export

- Format: H.264
- Preset: YouTube 1080p (or 1440p)

### Bitrate:

- Target: 20 Mbps
- Max: 30 Mbps

---

# 10. Quality Expectations

## Normal Behavior

- Looks sharp in smaller preview
- Slightly softer fullscreen (especially on Retina)

## NOT Normal

- Extremely blurry
- Unreadable text

---

# 11. Platform Strategy

## Master File

- 1080p or 1440p horizontal
- High quality export
- Used for:
  - YouTube
  - Website

## Optional Variants

### Vertical (TikTok / Instagram)

- 1080 × 1920
- Reframe content

### Social Clip (X)

- Reuse master
- Optional shorter edit

---

# 12. Key Principles

- Avoid scaling in OBS
- Scale in Premiere instead
- Use “Set to Frame Size”
- Add slight sharpening
- Prefer 1440p export for best results

---

# 13. Troubleshooting

## Issue: Composition Cut Off

→ Reset Transform in OBS

## Issue: Looks Zoomed in Premiere

→ Use “Set to Frame Size”

## Issue: Blurry Fullscreen

→ Check:

- OBS not upscaling
- Export bitrate
- Try 1440p export
- Add sharpen

---

# Final Pipeline Summary

EboSuite → OBS (capture native resolution) → Premiere (scale + sharpen) → Export (1080p or 1440p)

---
