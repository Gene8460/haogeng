"""按手册重新分配产品图片。

源：D:/外贸/微耕机/图片/新建文件夹/
目标：C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/images/

手册产品顺序：
- 微耕机 (page4-7)：11 台
- 开沟培土机 (page8)：4 台
- 抽水机 (page9-11)：8 台
"""

import os
import shutil
import sys
from PIL import Image

SRC = r"D:/外贸/微耕机/图片/新建文件夹"
DST = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/images"

# (目标文件名, 源文件名, 描述)
MAPPING = [
    # === 微耕机（11 台）按手册 page4→p7 顺序 ===
    # tiller-001：1WG-4.0AQ 小天使170汽油款（page2 大图，hero shot）
    ("tiller-001.jpg", "page02_img01.png", "小天使170汽油款 1WG-4.0AQ"),
    # 1WG-4-0A 1WG-4.0A 小天使170柴油款
    ("tiller-002.jpg", "page04_img01.jpeg", "小天使170汽油款（备用，170汽同款）"),
    # 1WG-4-05A 小天使173柴油款（page4 第3张柴油机）
    ("tiller-003.jpg", "page04_img01(1) - 副本.jpeg", "小天使170汽油（备用）"),
    # 1WG-4-05A Pro 战将173柴油 Pro
    ("tiller-004.jpg", "page04_img01(2).jpeg", "小天使173柴油款 1WG-4.05A"),
    # 1WG-4-1A 战将178柴油款
    ("tiller-005.jpg", "page05_img01.jpeg", "战将170汽油款（同 1WG-4.0AQ 战将系列）"),
    # 1WG-6-3A 战将186柴油款
    ("tiller-006.jpg", "page05_img01(1).jpeg", "战将173柴油款 1WG-4.05A"),
    # 1WG-4-0BQ 女神170汽油款
    ("tiller-007.jpg", "page04_img01(3).jpeg", "战将170汽油（备用）"),
    # 1WG-4-05B 男神173汽油款
    ("tiller-008.jpg", "page05_img01(2).jpeg", "战将173汽油升级款"),
    # 1WG-4-1B 女神178柴油款
    ("tiller-009.jpg", "page06_img01.jpeg", "战将173柴油升级款"),
    # 1WG-6-3B 战豹186柴油款
    ("tiller-010.jpg", "page06_img01(1).jpeg", "战将178柴油款 1WG-4.1A"),
    # 1WG-6-3B-T 战虎186柴油款
    ("tiller-011.jpg", "page06_img01(2).jpeg", "战豹186柴油款 1WG-6.3B"),

    # === 开沟培土机（4 台）按手册 page8 顺序 ===
    # 1WG-4-0ZL 战龙170汽油款
    ("ditch-001.jpg", "page08_img01.jpeg", "战龙号170汽油款 1WG-4.0PT"),
    # 1WG-4-05ZM 战龙173柴油款
    ("ditch-002.jpg", "page08_img01.png", "战龙号170汽油款（高分辨率）"),
    # 1WG-4-1ZN 战马178柴油款
    ("ditch-003.jpg", "page08_img01(1).jpeg", "战龙号173柴油款 1WG-4.05PT"),
    # 1WG-6-3ZN 战牛186柴油款
    ("ditch-004.jpg", "page08_img01(2).jpeg", "战马号178柴油款 1WG-4.1ZM"),

    # === 抽水机（8 台）按手册 page9-11 顺序 ===
    # pump-001 200-5皮带款
    ("pump-001.jpg", "page09_img01.jpeg", "200-5 皮带款（9.5HP 汽油）"),
    # 200-5-Direct 直连款
    ("pump-002.jpg", "page09_img01(1).jpeg", "200-5 直连款（柴油自吸泵）"),
    # 2in-Centrifugal 2寸离心泵
    ("pump-003.jpg", "page10_img01.jpeg", "2寸离心泵（汽油）"),
    # 3in-Centrifugal 3寸离心泵
    ("pump-004.jpg", "page10_img01(1).jpeg", "3寸离心泵（柴油）"),
    # Self-Priming-2-3in 170汽自吸泵
    ("pump-005.jpg", "page10_img01(2).jpeg", "170汽油自吸泵"),
    # Fire-2in 消防泵
    ("pump-006.jpg", "page10_img01(3).jpeg", "170汽油2寸消防泵"),
    # 195-Diesel 195柴油压井泵
    ("pump-007.jpg", "page11_img01.jpeg", "195柴油双叶轮压井泵（红色车架）"),
    # Double-Impeller 195柴油电启双叶轮压井泵
    ("pump-008.jpg", "page11_img01(1).jpeg", "195柴油双叶轮压井泵（小红车架）"),
]


def convert_png_to_jpg(src_path, dst_path, quality=82):
    """PNG → JPG 转换（减小体积）"""
    img = Image.open(src_path)
    if img.mode in ("RGBA", "P"):
        bg = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "P":
            img = img.convert("RGBA")
        bg.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
        img = bg
    elif img.mode != "RGB":
        img = img.convert("RGB")
    img.save(dst_path, "JPEG", quality=quality, optimize=True, progressive=True)
    return img.size


def copy_as_jpg(src_path, dst_path, quality=82):
    """JPEG 直传（重新压缩）"""
    img = Image.open(src_path)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.save(dst_path, "JPEG", quality=quality, optimize=True, progressive=True)
    return img.size


def main():
    converted = []
    for dst_name, src_name, desc in MAPPING:
        src_path = os.path.join(SRC, src_name)
        dst_path = os.path.join(DST, dst_name)
        if not os.path.exists(src_path):
            print(f"❌ MISSING: {src_path}")
            continue
        ext = os.path.splitext(src_name)[1].lower()
        size = None
        if ext == ".png":
            size = convert_png_to_jpg(src_path, dst_path)
        else:
            size = copy_as_jpg(src_path, dst_path)
        new_bytes = os.path.getsize(dst_path)
        src_bytes = os.path.getsize(src_path)
        print(f"[OK] {dst_name:24} <- {src_name:36} ({src_bytes//1024}KB -> {new_bytes//1024}KB, {size[0]}x{size[1]})  {desc}")
        converted.append(dst_name)
    print(f"\nDone: {len(converted)} images remapped")
    return converted


if __name__ == "__main__":
    main()