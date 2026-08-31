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
# Restricted to the bottom of the frame (where the shoe shadow actually is):
# an unrestricted neutral/near-white threshold also matches the white shirt,
# which then leaked through the underarm gap and got cut out as "background".
# The 0.75 cutoff is hand-tuned to this photo's shadow position, same caveat
# as WHITE_THRESHOLD above — re-check it if the source photo changes.
height = arr.shape[0]
in_shadow_zone = np.zeros(arr.shape[:2], dtype=bool)
in_shadow_zone[int(height * 0.75) :, :] = True
shadow_candidate = (channel_spread <= 6) & (channel_min >= 120) & in_shadow_zone
combined = strong_bg | shadow_candidate

# Erode before flood-filling to sever thin leak channels — e.g. the gap
# between the bent arm and torso from the hand-in-pocket pose — that would
# otherwise connect the true background to interior near-white regions like
# the shirt and get them wrongly cut out too. Dilate the confirmed background
# back out afterward to restore its real extent.
# picked empirically (verified by scanning for zero interior alpha holes
# afterward), not derived from anything measurable about the photo — a wider
# leak gap in a future source photo may need a larger value here.
EROSION_ITERS = 3
eroded = ndimage.binary_erosion(combined, iterations=EROSION_ITERS, border_value=1)

labels, n = ndimage.label(eroded, structure=np.ones((3, 3)))
border_labels = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
border_labels.discard(0)
# only keep border components that actually reach the confirmed white paper,
# so a shoe/suit region merely touching the frame edge isn't swept in
strong_labels = set(np.unique(labels[strong_bg & eroded]))
background_labels = border_labels & strong_labels

background_seed = np.isin(labels, list(background_labels))
background_mask = ndimage.binary_dilation(background_seed, iterations=EROSION_ITERS) & combined
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
