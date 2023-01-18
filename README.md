<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center" style="font-size: 25px">Connect</h3>

  <p align="center">
    The social media platform!
    <br />
    <a href="https://connect-si.web.app"><strong>See it live »</strong></a>
    <br />
    <br />
    <a href="https://connect-si.web.app">View Demo</a>
    ·
    <a href="https://github.com/heronet/connectui/issues">Report Bug</a>
    ·
    <a href="https://github.com/heronet/connectui/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Connect is a social media platform with real-time text support. It is a two part project. This is the `Frontend`. The backend can be found [here](https://github.com/heronet/connect).

- Connect uses `ASP.Net Core` including `SignalR` in the `Backend` and `Angular` in the `Frontend`. It uses `PostgreSQL` to persist data.
- The UI uses `REST API` and `SignalR` to fetch all the data.
- The `Backend` uses `Docker` which is hosted on `Google Cloud Run`.

<!-- SCREENSHOT -->

<!-- [![Connect Screen Shot][screenshot]](https://connect-si.web.app) -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Angular][angular.io]][angular-url]
- [![Dotnet][dotnet.microsoft.com]][dotnet-url]
- [![PostgreSQL][postgresql.org]][postgresql-url]
- [![Docker][docker.io]][docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/heronet/connectui.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the project
   ```sh
   ng serve --host="0.0.0.0"
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add real-time messaging with SignalR
- [x] Add authentication
- [x] Add photo upload
- [x] Add light / dark theme switcher
- [x] Add Likes
- [ ] Add comments

See the [open issues](https://github.com/heronet/connectui/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GPLv3 License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Sirat - sirat4757@gmail.com

Project Link: [https://github.com/heronet/connectui](https://github.com/heronet/connectui)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Img Shields](https://shields.io)
- [Font Awesome](https://fontawesome.com)
- [Othneildrew](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/heronet/connectui.svg?style=for-the-badge
[contributors-url]: https://github.com/heronet/connectui/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/heronet/connectui.svg?style=for-the-badge
[forks-url]: https://github.com/heronet/connectui/network/members
[stars-shield]: https://img.shields.io/github/stars/heronet/connectui.svg?style=for-the-badge
[stars-url]: https://github.com/heronet/connectui/stargazers
[issues-shield]: https://img.shields.io/github/issues/heronet/connectui.svg?style=for-the-badge
[issues-url]: https://github.com/heronet/connectui/issues
[license-shield]: https://img.shields.io/github/license/heronet/connectui.svg?style=for-the-badge
[license-url]: https://github.com/heronet/connectui/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/siratul-islam
[screenshot]: images/scr.png
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[dotnet.microsoft.com]: https://img.shields.io/badge/Dotnet-512BD4?style=for-the-badge&logo=dotnet&logoColor=white
[dotnet-url]: https://dotnet.microsoft.com/
[postgresql.org]: https://img.shields.io/badge/Postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://postgresql.org/
[docker.io]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://docker.io/
