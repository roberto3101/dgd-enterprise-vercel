import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch

aprobadas = [
    "Desarrollo de Habilidades Profesionales I",
    "Desarrollo de Habilidades Profesionales II",
    "Desarrollo de Habilidades Profesionales III",
    "Desarrollo de Habilidades Profesionales IV",
    "Matemática I",
    "Matemática II",
    "Tecnologías de la Información",
    "Análisis y Diseño de Sistemas I",
    "Análisis y Diseño de Sistemas II",
    "Lenguaje de Programación I",
    "Lenguaje de Programación II",
    "Introducción a la Algoritmia",
    "Algoritmos y Estructura de Datos",
    "Programación Orientada a Objetos I",
    "Programación Orientada a Objetos II",
    "Base de Datos",
    "Base de Datos Avanzado I",
    "Gestión de Datos Dinámicos",
    "Arquitectura de Entornos Web",
    "Desarrollo de Entornos Web",
    "Fundamentos de Gestión Empresarial",
    "Modelado de Procesos de Negocio",
    "Gestión de Proyectos de TI",
    "Gestión de Servicios de TI",
    "Innovación y Emprendimiento",
    "Seguridad de Aplicaciones",
    "Experiencias Formativas en Sit. Reales de T. I",
    "Experiencias Formativas en Sit. Reales de T. II",
    "Experiencias Formativas en Sit. Reales de T. III",
    "Experiencias Formativas en Sit. Reales de T. IV",
]

en_curso = [
    "Base de Datos Avanzado II",
    "Desarrollo de Servicios Web I",
    "Desarrollo de Aplicaciones Web I",
    "Proyecto Integrador",
    "Pruebas de Software",
    "Plan de Negocios  (2do módulo de este ciclo)",
]

restantes = [
    "Desarrollo de Servicios Web II",
    "Desarrollo de Aplicaciones Web II",
    "Desarrollo de Aplicaciones Móviles I",
    "Desarrollo de Aplicaciones Móviles II",
]

max_len = max(len(aprobadas), len(en_curso), len(restantes))

fig, ax = plt.subplots(figsize=(16, 13))
ax.set_xlim(0, 100)
ax.set_ylim(0, 100)
ax.axis('off')

# Title
ax.text(50, 97, 'Plan de Estudios - Estado de Cursos',
        ha='center', va='center', fontsize=22, fontweight='bold', color='#1a1a2e')
ax.text(50, 93.5, 'Total: 40 cursos', ha='center', va='center',
        fontsize=13, color='#555', style='italic')

# Column setup
col_x = [3, 36, 69]
col_w = 28
header_y = 89
header_h = 4
row_start_y = 84
row_h = 2.4

headers = [
    ('APROBADAS', f'{len(aprobadas)} cursos', '#2d8a4f', '#d4f4dd'),
    ('EN CURSO', f'{len(en_curso)} cursos', '#c89000', '#fff4d6'),
    ('RESTANTES', f'{len(restantes)} cursos', '#b73838', '#fde0e0'),
]

columns_data = [aprobadas, en_curso, restantes]

for i, ((title, count, color, bg), data) in enumerate(zip(headers, columns_data)):
    x = col_x[i]
    # Header box
    header_box = FancyBboxPatch((x, header_y), col_w, header_h,
                                 boxstyle="round,pad=0.05,rounding_size=0.4",
                                 linewidth=0, facecolor=color)
    ax.add_patch(header_box)
    ax.text(x + col_w/2, header_y + header_h/2 + 0.6, title,
            ha='center', va='center', fontsize=13, fontweight='bold', color='white')
    ax.text(x + col_w/2, header_y + header_h/2 - 1.0, count,
            ha='center', va='center', fontsize=9, color='white')

    # Rows
    for j, course in enumerate(data):
        y = row_start_y - j * row_h
        row_box = FancyBboxPatch((x, y - row_h + 0.3), col_w, row_h - 0.4,
                                  boxstyle="round,pad=0.02,rounding_size=0.2",
                                  linewidth=0.5, edgecolor='#cccccc', facecolor=bg)
        ax.add_patch(row_box)
        ax.text(x + 0.7, y - row_h/2 + 0.1, f"{j+1}.",
                ha='left', va='center', fontsize=8, fontweight='bold', color=color)
        ax.text(x + 2.8, y - row_h/2 + 0.1, course,
                ha='left', va='center', fontsize=8.2, color='#222')

plt.savefig(r'C:\dgd-enterprise\plan_estudios.png',
            dpi=200, bbox_inches='tight', facecolor='white')
print("OK: plan_estudios.png generado")
