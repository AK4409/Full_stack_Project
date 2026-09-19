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
npm run dev -- --host
```








***Folder Structure***

```text
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── favicon.svg
│   ├── icons.svg
│   ├── images
│   │   ├── admin
│   │   │   └── admin.jpg
│   │   ├── course
│   │   │   ├── Nodejs.png
│   │   │   ├── Python.png
│   │   │   ├── docker.png
│   │   │   ├── figma.avif
│   │   │   ├── js.jpeg
│   │   │   ├── mongodb.png
│   │   │   ├── react.png
│   │   │   └── reactnative.png
│   │   ├── instructors
│   │   │   ├── ajay.jpeg
│   │   │   ├── keshav.jpeg
│   │   │   ├── nirajan.jpeg
│   │   │   ├── nischal.jpeg
│   │   │   └── sobit.jpeg
│   │   ├── testimonials
│   │   │   ├── anjali.jpeg
│   │   │   ├── priyasharma.jpg
│   │   │   └── rohan.jpeg
│   │   └── users
│   │       ├── anish.webp
│   │       ├── anjila.jpeg
│   │       ├── rohan.jpeg
│   │       └── sangita.jpeg
│   ├── logo.png
│   ├── logo1.jpg
│   ├── logo2.avif
│   └── logo3.png
├── src
│   ├── App.tsx
│   ├── assets
│   │   ├── brand
│   │   │   ├── img1.png
│   │   │   ├── img2.png
│   │   │   ├── img3.png
│   │   │   └── img4.png
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── componets
│   │   ├── common
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── SocialLinks.tsx
│   │   │   └── StarRating.tsx
│   │   ├── course
│   │   │   ├── CourseCard.tsx
│   │   │   ├── CourseFilter.tsx
│   │   │   └── CourseGrid.tsx
│   │   └── layout
│   │       ├── DashboardLayout.tsx
│   │       ├── Footer.tsx
│   │       ├── Navbar.tsx
│   │       ├── SearchBox.tsx
│   │       └── Sidebar.tsx
│   ├── context
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data
│   │   ├── assignments.ts
│   │   ├── categories.ts
│   │   ├── certificates.ts
│   │   ├── client.ts
│   │   ├── courses.ts
│   │   ├── instructor.ts
│   │   ├── lessons.ts
│   │   ├── notifications.ts
│   │   ├── quizzes.ts
│   │   ├── reviews.ts
│   │   └── users.ts
│   ├── index.css
│   ├── main.tsx
│   └── pages
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── CourseDetails.tsx
│       ├── Courses.tsx
│       ├── Home.tsx
│       ├── Login.tsx
│       ├── Register.tsx
│       ├── admin
│       │   ├── Courses.tsx
│       │   ├── Dashboard.tsx
│       │   └── Users.tsx
│       ├── instructor
│       │   ├── Courses.tsx
│       │   ├── CreateCourse.tsx
│       │   └── Dashboard.tsx
│       └── student
│           ├── CourseLearn.tsx
│           ├── Dashboard.tsx
│           ├── MyCourses.tsx
│           ├── Profile.tsx
│           └── Quiz.tsx
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

21 directories, 91 files
```


***Current folder Structure can be seen by running this command in integrated terminal***

```bash
tree -I 'node_modules|.git'