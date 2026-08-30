"""One-off local background removal for the hero portrait.

Border-connected flood fill on a white-ish threshold mask, so interior
near-white pixels (white shirt, pocket square) are preserved while only
the actual studio background is cut out. Runs fully offline.
"""

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = "assets-source/character-source.png"
DST = "public/character.png"
# thresholds are hand-tuned to this specific studio photo (near-white paper
# background, soft grey drop-shadow) — re-check them if the source photo changes
WHITE_THRESHOLD = 233
PADDING_FRAC = 0.02

im = Image.open(SRC).convert("RGB")
arr = np.array(im)

arr_i = arr.astype(np.int16)
channel_spread = arr_i.max(axis=2) - arr_i.min(axis=2)
channel_min = arr_i.min(axis=2)

strong_bg = np.all(arr >= WHITE_THRESHOLD, axis=2)
# soft drop-shadow under the shoes: neutral grey, connected to the paper-white
# background, but darker than WHITE_THRESHOLD — hysteresis-grow into it too.
shadow_candidate = (channel_spread <= 6) & (channel_min >= 120)
combined = strong_bg | shadow_candidate

labels, n = ndimage.label(combined, structure=np.ones((3, 3)))
border_labels = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
border_labels.discard(0)
# only keep border components that actually reach the confirmed white paper,
# so a shoe/suit region merely touching the frame edge isn't swept in
strong_labels = set(np.unique(labels[strong_bg]))
background_labels = border_labels & strong_labels

background_mask = np.isin(labels, list(background_labels))
alpha = np.where(background_mask, 0, 255).astype(np.float32)

alpha_img = Image.fromarray(alpha.astype(np.uint8), mode="L")
alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.2))

rgba = np.dstack([arr, np.array(alpha_img)])
out = Image.fromarray(rgba, mode="RGBA")

alpha_arr = np.array(alpha_img)
ys, xs = np.where(alpha_arr > 10)
top, bottom = ys.min(), ys.max()
left, right = xs.min(), xs.max()

pad_y = int((bottom - top) * PADDING_FRAC)
pad_x = int((right - left) * PADDING_FRAC)

top = max(0, top - pad_y)
bottom = min(out.height - 1, bottom + pad_y)
left = max(0, left - pad_x)
right = min(out.width - 1, right + pad_x)

out = out.crop((left, top, right + 1, bottom + 1))
out.save(DST)

print(f"saved {DST} size={out.size}")
