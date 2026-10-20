"""Optimize selected local project photos and trace the supplied logo to SVG."""
from pathlib import Path
from PIL import Image
import math

root = Path(__file__).resolve().parents[1]
out = root / 'public' / 'showcase'
out.mkdir(exist_ok=True)
photos = {
    'zona-sofa': ('ZonaMuebles-landing', 'monaco--beige--01.webp'),
    'zona-blue': ('ZonaMuebles-landing', 'monaco--azul-piedra--01.webp'),
    'zona-room': ('ZonaMuebles-landing', 'zona-muebles-bg.webp'),
    'canaritas': ('canaritas', '2empanadas.webp'),
    'renis': ('renis-burger', 'americana.png'),
    'martinos': ('martinos', 'big-burger.webp'),
}
for name, (project, source) in photos.items():
    im = Image.open(root.parent / project / 'public' / source)
    im.thumbnail((1000, 850))
    im.save(out / f'{name}.webp', 'WEBP', quality=84)

# Trace the green foreground. Edges follow the supplied symbol, including its cutouts.
im = Image.open(root / 'logo-nuevo.png').convert('RGB')
mask = {(x, y) for y in range(im.height) for x in range(im.width)
        if (lambda c: c[0] > 110 and c[1] > 145 and c[1] > c[2] * 1.2)(im.getpixel((x, y)))}
edges = {}
for x, y in mask:
    for neighbor, a, b in [((x, y-1), (x, y), (x+1, y)), ((x+1, y), (x+1, y), (x+1, y+1)),
                            ((x, y+1), (x+1, y+1), (x, y+1)), ((x-1, y), (x, y+1), (x, y))]:
        if neighbor not in mask: edges[a] = b
def simplify(points, epsilon=0.9):
    if len(points) < 3: return points
    a, b = points[0], points[-1]
    dx, dy = b[0]-a[0], b[1]-a[1]
    den = math.hypot(dx, dy)
    distances = [abs(dy*(p[0]-a[0])-dx*(p[1]-a[1])) / den if den else math.dist(a,p) for p in points]
    k = max(range(len(points)), key=distances.__getitem__)
    if distances[k] <= epsilon: return [a, b]
    return simplify(points[:k+1], epsilon)[:-1] + simplify(points[k:], epsilon)
paths = []
while edges:
    start = next(iter(edges)); p = start; points = [p]
    while p in edges:
        p = edges.pop(p); points.append(p)
        if p == start: break
    if len(points) < 20: continue
    mid = len(points)//2
    points = simplify(points[:mid+1])[:-1] + simplify(points[mid:])
    paths.append('M' + 'L'.join(f'{x},{y}' for x,y in points) + 'Z')
xs = [p[0] for p in mask]; ys = [p[1] for p in mask]
view = f'{min(xs)-8} {min(ys)-8} {max(xs)-min(xs)+16} {max(ys)-min(ys)+16}'
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}"><path fill="#c6fa5f" fill-rule="evenodd" d="{"".join(paths)}"/></svg>'
(root / 'public' / 'clientesya-symbol.svg').write_text(svg)
print(f'Prepared {len(photos)} photos and traced logo ({len(svg)} bytes).')
