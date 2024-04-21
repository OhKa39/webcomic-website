<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#database-scheme">Database Scheme</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



## About The Project

[![Product Name Screen Shot][product-screenshot]](https://webcomic-website.vercel.app/)

The WebComic Website is a labor of love, born from a passion for storytelling and a deep appreciation for the art of comics. As avid comic enthusiasts ourselves, we recognized the need for a platform that celebrates the diverse talents of creators while providing readers with an immersive and engaging experience.

Our vision for the WebComic Website is to create a thriving community for everyone to read together and comment about the comic.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features
- 🚀 **SignIn Account**: Users can sign in to their accounts by using Clerk provider and gain access to specify features and functionalities.
- 🚀 **SignOut Account**: Users have to sign out their account, terminating their session and ensuring their privacy and security information.
- 🚀 **View Comic Information And Read Comic**: Users can have the ability to view the comic information: view counts, followers, comments, comic chapter and read it.
- 🚀 **Comic Search**: Users can search comic by name.
- 🚀 **Comic Filter By Tags**: Users can filter comic by comic tags in advanced search.
- 🚀 **RealTime Interaction**: Users can comment about the comic or comic's chapter and interact with another user's comment.
- 🚀 **Follow Comic**: Users can follow the favorite comic for more advantage checking new chapter or quick navagation.
- 🚀 **RealTime Notification**: Users will receive notification about comments or newest comic's chapters (ComingSoon) if they triggered event of these.
- 🚀 **Stores story reading progress**: Users can continue reading the chapter they have viewed.

### Built With

These are all technology integrated in our project:

* [![Next][Next.js]][Next-url]
* [![Tailwindcss][tailwindcss.com]][tailwindcss-url]
* [![Prisma][prisma.io]][prisma-url]
* [![MongoDB][mongodb.com]][MongoDB-url]
* [![Vercel][Vercel.com]][Vercel-url]
* [![TypeScript][TypeScript.com]][TypeScript-url]
* [![Clerk][Clerk.com]][Clerk-url]
* [![Pusher][Pusher.com]][Pusher-url]
* [![NextUI][NextUI.org]][NextUI-url]
* [![ShadcnUI][ShadcnUI.com]][ShadcnUI-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
Make sure that you have the following installed dependencies:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) -> Required Node.js 18.17 or later.
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app.
1. Clone the repo
   ```sh
   git clone https://github.com/ohka39/webcomic-website.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a new file named `.env` in the root of your project and add api key in the following content:
  ```env
    DATABASE_URL=""
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
    CLERK_SECRET_KEY=""
    
    NEXT_PUBLIC_URL = http://localhost:3000
    
    PUSHER_APP_ID =""
    NEXT_PUBLIC_PUSHER_APP_KEY =""
    PUSHER_SECRET =""
    cluster =""
  ```
4. Running the Project
```bash
npm run dev
```
  Caution
  
  > Note:
  - If you want to get key `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`, you should access the website [Clerk](https://clerk.com/)
  - If you want to get key `PUSHER_APP_ID`, `NEXT_PUBLIC_PUSHER_APP_KEY`, `PUSHER_SECRET` and `cluster`, you should access the website [Pusher](https://pusher.com/)
  - To have `MONGODB_URI`, you can ask a private key from my mongodb database or use your own database(but must to crawl data have scheme belike in database structure below).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Database Scheme
[![Database Scheme Screen Shot][database-scheme-screenshot]](https://drive.google.com/file/d/1JYCQYjEgiigdF9Xc9qN9nHyyBgloEwm6/view?usp=drive_link)

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ohka39/webcomic-website.svg?style=for-the-badge
[contributors-url]: https://github.com/ohka39/webcomic-website/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ohka39/webcomic-website.svg?style=for-the-badge
[forks-url]: https://github.com/ohka39/webcomic-website/network/members
[stars-shield]: https://img.shields.io/github/stars/ohka39/webcomic-website.svg?style=for-the-badge
[stars-url]: https://github.com/ohka39/webcomic-website/stargazers
[issues-shield]: https://img.shields.io/github/issues/ohka39/webcomic-website.svg?style=for-the-badge
[issues-url]: https://github.com/ohka39/webcomic-website/issues
[license-shield]: https://img.shields.io/github/license/ohka39/webcomic-website.svg?style=for-the-badge
[license-url]: https://github.com/ohka39/webcomic-website/blob/master/LICENSE.txt
[product-screenshot]: public/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[tailwindcss.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwindcss-url]: https://tailwindcss.com/
[prisma.io]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[mongodb.com]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Vercel.com]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[TypeScript.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Clerk.com]: https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=fff&style=for-the-badge
[Clerk-url]: https://clerk.com/
[Pusher.com]: https://img.shields.io/badge/Pusher-300D4F?logo=pusher&logoColor=fff&style=for-the-badge
[Pusher-url]: https://pusher.com/
[NextUI.org]: https://img.shields.io/badge/NextUI-000?logo=nextui&logoColor=fff&style=for-the-badge
[NextUI-url]: https://nextjs.org/
[ShadcnUI.com]: https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge
[ShadcnUI-url]: https://ui.shadcn.com/

