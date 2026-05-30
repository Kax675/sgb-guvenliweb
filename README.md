# SGB Güvenli Web

[Türkçe versiyon için tıklayınız.](README-TR.md)

[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=flat&logo=apache&logoColor=white)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Preact](https://img.shields.io/badge/Preact-673AB7?style=flat&logo=preact&logoColor=white)](https://preactjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

A browser extension designed to protect users from malicious websites by leveraging the official API of the Turkish Cyber Security Presidency (Siber Güvenlik Başkanlığı - SGB).

## Features

- **Real-time Protection**: Monitors browser navigation and automatically checks domains against the SGB database before they are loaded.
- **Criticality Filtering**: Allows users to define a minimum criticality threshold for blocking websites.
- **Performance Optimized Caching**: Implements an intelligent local cache for API responses to ensure minimal impact on browsing speed.
- **Domain Whitelisting**: Support for excluding specific domains from the protection engine.
- **Detailed Blocking Information**: Provides a dedicated blocked page displaying the reason, source, and severity of the threat.
- **Automated Metadata Synchronization**: Periodically fetches and updates threat metadata (sources, descriptions, connection types) from SGB APIs.

## Tech Stack

- **Core**: Preact with TypeScript
- **Styling**: Tailwind CSS v4
- **Build System**: Vite
- **API Integration**: SGB (Cyber Security Presidency) Public API
- **Extension Format**: Manifest V3

## Installation

### Downloading the Extension
1. Head to the [releases page](https://github.com/Kax675/sgb-guvenliweb/releases) and download the latest version of the extension (e.g., `sgb-guvenliweb-v1.0.0.zip`).
   *Note: Releases are automatically generated when a new version tag is pushed.*
2. Extract the downloaded ZIP file to a location of your choice.

### Loading into Browser

1. Open your browser and navigate to the extensions management page:
   - Chrome/Edge: `chrome://extensions`
   - Brave: `brave://extensions`
2. Enable **Developer mode**.
3. Click on **Load unpacked**.
4. Select the `dist` folder generated in the previous step.

## Configuration

Access the extension options page by clicking on the extension icon and selecting **Options** or **Settings**. Here you can:
- Toggle protection on/off.
- Set the minimum criticality level for blocking.
- Manage the excluded domains list.
- Configure cache duration and size.
- View metadata update status.

## Development

To start a development server with HMR (Hot Module Replacement):

```bash
npm run dev
```

## License

This project is licensed under the Apache License 2.0.