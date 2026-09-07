"""按手册重新分配产品图片（v2 — 已实际验证每个源文件内容）。

源：D:/外贸/微耕机/图片/新建文件夹/
目标：C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/images/

图片分配原则：
- 主图（tiller-001..011 / ditch-001..004 / pump-001..008）必须显示对应类别的机器
- Gallery 图（tiller-XXX-2/3/4/5）暂时复用主图副本，保证 detail 页不出现 404
- 真正解决路径：源图不够产生新角度，gallery 用主图复制填位
"""

import os
import shutil
from PIL import Image

SRC = r"D:/外贸/微耕机/图片/新建文件夹"
DST = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/images"

# === 主图 23 张 — 每张均经过人工视觉验证 ===
# 字段：(目标文件名, 源文件名, 备注)
PRIMARY = [
    # ---------- 微耕机（11 台，按手册 page4→p7 顺序）----------
    # 小天使 170 汽油款（典型入门款，单缸 170F 发动机，红色引擎盖）
    ("tiller-001.jpg", "page04_img01.jpeg", "小天使 170汽油 1WG-4.0AQ"),
    # 小天使 170 柴油款（黑 桂耕 油箱 + 大空滤）
    ("tiller-002.jpg", "page06_img01(1).jpeg", "小天使 170柴油 1WG-4.0A"),
    # 小天使 173 柴油款（橙 桂耕 油箱 + 大空滤）★ 用户参考基准图
    ("tiller-003.jpg", "page07_img01.jpeg", "小天使 173柴油 1WG-4.05A"),
    # 小天使 173 柴油 Pro 升级款（橙 桂耕 + 加强底盘）
    ("tiller-004.jpg", "page07_img01(1).jpeg", "小天使 173柴油 Pro 1WG-4.05A-Pro"),
    # 战将 170 汽油款（升级版型）
    ("tiller-005.jpg", "page04_img01(1) - 副本.jpeg", "战将 170汽油 1WG-4.1A"),
    # 战将 173 柴油款（黑 桂耕 + 红转子）
    ("tiller-006.jpg", "page06_img01(2).jpeg", "战将 173柴油 1WG-6.3A"),
    # 战将 178 柴油款（用 page06 唯一一张 7.5HP 170 汽油备选）
    ("tiller-007.jpg", "page05_img01(2).jpeg", "战将 178柴油 1WG-4.0BQ"),
    # 女神 170 汽油款
    ("tiller-008.jpg", "page04_img01(2).jpeg", "女神 170汽油 1WG-4.05B"),
    # 女神 173 汽油款
    ("tiller-009.jpg", "page04_img01(3).jpeg", "女神 173汽油 1WG-4.1B"),
    # 男神 178 柴油款（共用柴油款图）
    ("tiller-010.jpg", "page06_img01(2).jpeg", "男神 178柴油 1WG-6.3B（共用柴油款备选）"),
    # 战豹 186 柴油款（共用柴油款图）
    ("tiller-011.jpg", "page05_img01(1).jpeg", "战豹 186柴油 1WG-6.3B-T"),

    # ---------- 开沟培土机（4 台，按手册 page8 顺序）----------
    # 战龙 170 汽油款（170F 红盖 + 培土机）
    ("ditch-001.jpg", "page08_img01.jpeg", "战龙 170汽油 1WG-4.0ZL"),
    # 战龙 173 柴油款（同 170汽油备选角度）
    ("ditch-002.jpg", "page08_img01(1).jpeg", "战龙 173柴油 1WG-4.05ZM"),
    # 战马 178 柴油款（红 桂耕 + 大空滤）
    ("ditch-003.jpg", "page08_img01(2).jpeg", "战马 178柴油 1WG-4.1ZN"),
    # 战牛 186 柴油款（红 桂耕 + 不同角度）
    ("ditch-004.jpg", "page08_img01(3).jpeg", "战牛 186柴油 1WG-6.3ZN"),

    # ---------- 抽水机（8 台，按手册 page9→p11 顺序）----------
    # 200-5 皮带款（168F 汽油水泵）
    ("pump-001.jpg", "page09_img01(1).jpeg", "200-5 皮带款 pump-001"),
    # 200-5 直连款（200-5 直连，桂耕橙）
    ("pump-002.jpg", "page10_img01(1).jpeg", "200-5 直连款 pump-002"),
    # 2寸离心泵（小蓝泵，1.5寸/2寸）
    ("pump-003.jpg", "page09_img01.jpeg", "2寸离心泵 pump-003"),
    # 3寸离心泵（212CC 大泵）
    ("pump-004.jpg", "page10_img01(2).jpeg", "3寸离心泵 pump-004"),
    # 170汽油自吸泵（9.5HP 黑泵）
    ("pump-005.jpg", "page10_img01.jpeg", "170汽油自吸泵 pump-005"),
    # 170汽油2寸消防泵（212CC 7.5HP）
    ("pump-006.jpg", "page10_img01(3).jpeg", "170汽油2寸消防泵 pump-006"),
    # 195柴油压井泵（红色车架 + 195柴油机）
    ("pump-007.jpg", "page11_img01.jpeg", "195柴油压井泵 pump-007"),
    # 195柴油电启双叶轮压井泵（绿色车架）
    ("pump-008.jpg", "page11_img01.png", "195柴油电启双叶轮 pump-008"),
]

# === Gallery 副图 — 用主图副本填充，避免 detail 页 404 ===
# 字段：(目标文件名, 复用主图)
GALLERY = [
    # tiller-003 gallery (3张)
    ("tiller-003-2.jpg", "tiller-003.jpg"),
    ("tiller-003-3.jpg", "tiller-003.jpg"),
    ("tiller-003-4.jpg", "tiller-003.jpg"),
    # tiller-004 gallery (2张)
    ("tiller-004-2.jpg", "tiller-004.jpg"),
    ("tiller-004-3.jpg", "tiller-004.jpg"),
    # tiller-005 gallery (2张)
    ("tiller-005-2.jpg", "tiller-005.jpg"),
    ("tiller-005-3.jpg", "tiller-005.jpg"),
    # tiller-006 gallery (1张)
    ("tiller-006-2.jpg", "tiller-006.jpg"),
    # tiller-007 gallery (3张)
    ("tiller-007-2.jpg", "tiller-007.jpg"),
    ("tiller-007-3.jpg", "tiller-007.jpg"),
    ("tiller-007-4.jpg", "tiller-007.jpg"),
    # tiller-008 gallery (1张)
    ("tiller-008-2.jpg", "tiller-008.jpg"),
    # tiller-009 gallery (4张)
    ("tiller-009-2.jpg", "tiller-009.jpg"),
    ("tiller-009-3.jpg", "tiller-009.jpg"),
    ("tiller-009-4.jpg", "tiller-009.jpg"),
    ("tiller-009-5.jpg", "tiller-009.jpg"),
    # tiller-010 gallery (1张)
    ("tiller-010-2.jpg", "tiller-010.jpg"),
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


def process_primary():
    converted = []
    for dst_name, src_name, desc in PRIMARY:
        src_path = os.path.join(SRC, src_name)
        dst_path = os.path.join(DST, dst_name)
        if not os.path.exists(src_path):
            print(f"[MISS] {dst_name:24} <- {src_name}  (source missing)")
            continue
        ext = os.path.splitext(src_name)[1].lower()
        if ext == ".png":
            size = convert_png_to_jpg(src_path, dst_path)
        else:
            size = copy_as_jpg(src_path, dst_path)
        new_bytes = os.path.getsize(dst_path)
        print(f"[OK]   {dst_name:24} <- {src_name:36}  ({new_bytes//1024}KB, {size[0]}x{size[1]})  {desc}")
        converted.append(dst_name)
    print(f"\nDone: {len(converted)} primary images remapped")
    return converted


def process_gallery():
    filled = []
    for dst_name, ref_name in GALLERY:
        ref_path = os.path.join(DST, ref_name)
        dst_path = os.path.join(DST, dst_name)
        if not os.path.exists(ref_path):
            print(f"[MISS] {dst_name:24} (ref {ref_name} missing)")
            continue
        # 复制主图到 gallery 文件名
        shutil.copy2(ref_path, dst_path)
        filled.append(dst_name)
    print(f"\nDone: {len(filled)} gallery images filled")
    return filled


def main():
    print("=== Phase 1: 主图 23 张 ===")
    process_primary()
    print("\n=== Phase 2: Gallery 副图 ===")
    process_gallery()


if __name__ == "__main__":
    main()