"""根据最新的 JPG 重新生成 WebP（v2 — 包括新增 gallery 图）。"""
import os
from PIL import Image

DST = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/images"


def regen_webp(jpg_name, quality=80):
    base = os.path.splitext(jpg_name)[0]
    src = os.path.join(DST, jpg_name)
    dst = os.path.join(DST, base + ".webp")
    if not os.path.exists(src):
        print(f"[SKIP] missing {src}")
        return
    img = Image.open(src)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.save(dst, "WEBP", quality=quality, method=6)
    src_kb = os.path.getsize(src) // 1024
    dst_kb = os.path.getsize(dst) // 1024
    print(f"[OK] {jpg_name:24} -> {base + '.webp':24} ({src_kb}KB -> {dst_kb}KB)")


def main():
    # 主图 23 + gallery 17 + accessories 1
    targets = [
        "tiller-001.jpg", "tiller-002.jpg", "tiller-003.jpg", "tiller-004.jpg",
        "tiller-005.jpg", "tiller-006.jpg", "tiller-007.jpg", "tiller-008.jpg",
        "tiller-009.jpg", "tiller-010.jpg", "tiller-011.jpg",
        # gallery (17)
        "tiller-003-2.jpg", "tiller-003-3.jpg", "tiller-003-4.jpg",
        "tiller-004-2.jpg", "tiller-004-3.jpg",
        "tiller-005-2.jpg", "tiller-005-3.jpg",
        "tiller-006-2.jpg",
        "tiller-007-2.jpg", "tiller-007-3.jpg", "tiller-007-4.jpg",
        "tiller-008-2.jpg",
        "tiller-009-2.jpg", "tiller-009-3.jpg", "tiller-009-4.jpg", "tiller-009-5.jpg",
        "tiller-010-2.jpg",
        # ditching
        "ditch-001.jpg", "ditch-002.jpg", "ditch-003.jpg", "ditch-004.jpg",
        # pump
        "pump-001.jpg", "pump-002.jpg", "pump-003.jpg", "pump-004.jpg",
        "pump-005.jpg", "pump-006.jpg", "pump-007.jpg", "pump-008.jpg",
        # accessories
        "tiller_acc_v10.jpg",
    ]
    for name in targets:
        regen_webp(name)


if __name__ == "__main__":
    main()