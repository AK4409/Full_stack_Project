```bash
git init
git add .
git commit -m "message"
git branch -M main
git remote add origin url
git push origin main
```


```bash
 npm create vite@latest my-project
 cd my-project
 ```

 ```bash
 npm install tailwindcss @tailwindcss/vite 
 ```

 Add the @tailwindcss/vite plugin to your Vite configuration.<br>

```bash
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' # include this in vite.config.js
```
```javascript
export default defineConfig({
  plugins: [
    tailwindcss(), # add this plugin
  ],
})
```

<br><br>
***Import Tailwind CSS***
Add an @import to your CSS file that imports Tailwind CSS.<br> <br>

```javascript 
@import "tailwindcss";
```


Run your build process with `npm run dev` or whatever command is configured in your package.json file.

```bash 
npm run dev
```

***Use This to see in other devices in same network***

```bash
npm run dev
```

***Folder Structure***

src/
│
├── assets/
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   │
│   └── course/
│       ├── CourseCard.tsx
│       ├── CourseGrid.tsx
│       └── CourseFilter.tsx
│
├── data/
│   ├── courses.ts
│   ├── categories.ts
│   └── users.ts
│
├── pages/
│   ├── Home.tsx
│   ├── Courses.tsx
│   ├── CourseDetails.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   │
│   ├── student/
│   │   ├── Dashboard.tsx
│   │   ├── MyCourses.tsx
│   │   └── Profile.tsx
│   │
│   └── instructor/
│       ├── Dashboard.tsx
│       ├── Courses.tsx
│       └── CreateCourse.tsx
│
├── App.tsx
├── main.tsx
└── index.css
