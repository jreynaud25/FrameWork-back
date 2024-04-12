<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Frame-work.app Backend</h3>

</div>

<!-- GETTING STARTED -->

## Getting Started

Before everything you have to create a .env file.

```
PORT=3000
FRONTEND_URL=http://localhost:5173
#FRONTEND_URL=https://frame-work-front.vercel.app
TOKEN_SECRET=
MONGODB_URI=
#MONGODB_URI=

CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=

#GMAIL_PASSWORD=
```

## Plugin routes

Here will be explained the routes made to work with the plugins

- figma.routes.js
- brand.routes.js

### 1. figma.routes.js

```js
router.get("/:id/change", async (req, res) => {}

router.post("/:id/changeApplied", async (req, res) => {}

router.post("/create", async (req, res) => {}

router.post("/update", async (req, res) => {}

router.post("/createBrand", async (req, res) => {}

router.post("/:figmaId/gettingImagesURL", async (req, res) => {}

```

### 2. brand.routes.js

```js
router.get("/all", async (req, res, next) => {}

router.get("/:figmaName", async (req, res, next) => {}

```

## Frontend routes

### 1. designs.routes.js

```js
router.get("/all", async (req, res, next) => {}

router.get("/owned", async (req, res, next) => {}

router.post("/", uploader.single("picture"), async (req, res, next) => {}

router.get("/:id", async (req, res, next) => {}

router.post("/:id", async (req, res, next) => {}

router.patch("/:id", uploader.array("pictures"), async (req, res, next) => {}

router.get("/notify/:id", async (req, res, next) => {}

router.delete("/:id", async (req, res, next) => {}

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

<!-- CONTACT -->

## Contact

JRJR - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/jreynaud25/Framework-backend](https://github.com/jreynaud25/Framework-backend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/damdamtouch/Framework-generator.svg?style=for-the-badge
[contributors-url]: https://github.com/damdamtouch/Framework-generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/damdamtouch/Framework-generator.svg?style=for-the-badge
[forks-url]: https://github.com/damdamtouch/Framework-generator/network/members
[stars-shield]: https://img.shields.io/github/stars/damdamtouch/Framework-generator.svg?style=for-the-badge
[stars-url]: https://github.com/damdamtouch/Framework-generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/damdamtouch/Framework-generator.svg?style=for-the-badge
[issues-url]: https://github.com/damdamtouch/Framework-generator/issues
[license-shield]: https://img.shields.io/github/license/damdamtouch/Framework-generator.svg?style=for-the-badge
[license-url]: https://github.com/damdamtouch/Framework-generator/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Typescript.com]: https://img.shields.io/badge/Typescript-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[Typescript-url]: https://www.typescriptlang.org
