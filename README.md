# 🌐 Panel Web - Proyecto SENA

Este es un proyecto desarrollado con [Next.js](https://nextjs.org), diseñado para gestionar y administrar diferentes módulos del sistema del SENA. La aplicación está estructurada para ser escalable, modular y fácil de mantener.

---

## 🚀 Comenzando

### 🛠️ Pasos para configurar el proyecto

1️⃣ **Clonar el repositorio**

```bash
git clone https://github.com/SENA-2025/web-panel.git
cd web-panel
```

2️⃣ **Instalar dependencias**  
Usa tu gestor de paquetes favorito:

```bash
pnpm install
```

3️⃣ **Ejecutar el servidor de desarrollo**

```bash
node --run dev
```

Abre [http://localhost:3170](http://localhost:3170) en tu navegador para ver la aplicación en funcionamiento.

---

## 📂 Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
src/
├── app/                # Páginas y layouts principales
├── components/         # Componentes reutilizables
├── lib/                # Funciones y utilidades compartidas
├── middleware.ts       # Middleware de la aplicación
├── schemas/            # Validaciones y esquemas
├── services/           # Lógica de negocio y servicios
```

### 🗂 Directorios Clave

- **`app/`**: Contiene las páginas principales y layouts organizados por módulos.
- **`components/`**: Componentes reutilizables como formularios, navegación y notificaciones.
- **`lib/`**: Funciones auxiliares como manejo de cookies y autenticación.
- **`schemas/`**: Esquemas de validación para formularios y datos.
- **`services/`**: Lógica de negocio y conexión con APIs externas.

---

## 🌟 Características

- **Framework**: Construido con [Next.js](https://nextjs.org) para un rendimiento óptimo.
- **Estilos**: Utiliza CSS modular para personalización y consistencia.
- **Autenticación**: Implementación de autenticación segura con manejo de cookies.
- **Modularidad**: Estructura organizada para facilitar la escalabilidad.

---

## 📖 Documentación

### Fuentes de aprendizaje:

- [Documentación oficial de Next.js](https://nextjs.org/docs)
- [Tutorial interactivo de Next.js](https://nextjs.org/learn)

### Despliegue:

El proyecto puede ser desplegado fácilmente en [Vercel](https://vercel.com). Consulta la [documentación de despliegue](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

---

## 🛠 Tecnologías Utilizadas

- **Next.js**: Framework principal.
- **TypeScript**: Tipado estático para mayor robustez.
- **CSS Modules**: Estilización modular.

---

## ⚠️ Nota Importante

Este es un proyecto **privado** desarrollado exclusivamente para el SENA. No está permitido su uso, distribución o modificación sin autorización previa.
