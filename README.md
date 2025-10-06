Looking at the project structure, I'll examine some key files to better understand the project and create a comprehensive README.md file.```markdown

# Cypress Avocado Tests

Repository contains comprehensive E2E and API test automation suite built with Cypress and TypeScript for testing online store functionality.

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Manual Setup](#manual-setup)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Docker Support](#docker-support)
- [Contributing](#contributing)

## 🚀 About

This project provides automated testing capabilities for e-commerce applications, including:

- **GUI Tests**: End-to-end browser testing for user interactions
- **API Tests**: Backend service validation and integration testing
- **Cross-platform compatibility**: Windows, Linux, and macOS support
- **Docker integration**: Containerized test execution environment

## 🛠 Tech Stack

- **TypeScript** 5.8.3 - Type-safe test development
- **Cypress** 14.5.2 - E2E testing framework
- **Docker** - Containerized test execution
- **Allure** - Advanced test reporting
- **Faker.js** - Test data generation
- **Prettier** - Code formatting

## 📁 Project Structure

```

cypress_avocado_tests/
├── e2e/                    # Test specifications
│   ├── api/               # API test cases
│   └── gui/               # GUI test cases
├── fixtures/              # Test data files
├── support/               # Test utilities and helpers
│   ├── api/              # API testing utilities
│   ├── gui/              # GUI testing utilities
│   ├── commands.ts       # Custom Cypress commands
│   ├── dataGenerators.ts # Test data generators
│   └── ...
├── logs/                  # Test execution logs
├── cypress.env.json       # Environment configuration
├── cypress-config.ts      # Cypress configuration
├── docker-compose.yaml    # Docker setup
└── package.json          # Project dependencies
```

## ⚙️ Prerequisites

### All Platforms

- Node.js (latest LTS version)
- npm or yarn package manager

### For Docker Usage

#### Windows

- [Docker Desktop](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose](https://docs.docker.com/compose/install/linux/)
- XServer for GUI testing

#### Linux (Ubuntu)

- [Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose](https://docs.docker.com/compose/install/linux/)

#### Linux (Manjaro)

- Follow [Manjaro Docker setup guide](https://www.ipv6.rs/tutorial/Manjaro/Docker_Compose/)

#### macOS

- [Docker Desktop](https://docs.docker.com/desktop/setup/install/mac-install/)
- [XQuartz](https://www.embird.net/sw/embird/tutorial/wine/xquartz.htm) for GUI testing

## 🚀 Quick Start

### Option 1: Using Scripts (Recommended)

1. **Start XServer (Windows/macOS only):**

   **Windows:**
   - Download and install [VcXsrv Windows X Server](https://sourceforge.net/projects/vcxsrv/)
   - Launch XLaunch from Start Menu
   - Select "Multiple windows" → Next
   - Select "Start no client" → Next
   - Check "Disable access control" → Next → Finish

   **macOS:**
   - Download and install [XQuartz](https://www.xquartz.org/)
   - Launch XQuartz: `open -a XQuartz`
   - In terminal execute: `xhost +localhost`

2. **Start the application:**

   ```bash
   ./start.sh
   ```

3. **Stop the application:**
   ```bash
   ./stop.sh
   ```
   The script will prompt you to remove Docker images after stopping containers.

### Option 2: Manual Setup

1. **Start XServer (Windows/macOS only):**
   Follow step 1 from Option 1 above.

2. **Clone and setup:**

   ```bash
   git clone <repository-url>
   cd cypress_avocado_tests
   npm install
   ```

3. **Configure environment:**

   ```bash
   cp cypress.env.example.json cypress.env.json
   cp cypress-config.config.ts cypress-config.ts
   cp .env-docker

   ```

4. **Edit configuration files as needed**

## 🧪 Running Tests

### Local Execution

```
bash
# Run tests in headless mode
npm run cypress:cli

# Open Cypress Test Runner GUI
npm run cypress:gui
```

### Docker Execution

```
bash
# Start with GUI profile
docker compose --profile gui up -d --build

# Stop containers
docker compose down

# Stop and remove images
docker compose down --rmi all
```

## ⚙️ Configuration

### Environment Configuration

Edit `cypress.env.json` to configure test environments:

```
json
{
  "SUT": "gui_tests",
  "api_tests": {
    "url": "https://your-api-url.com",
    "specPath": "./e2e/api/**/*"
  },
  "gui_tests": {
    "url": "https://your-app-url.com",
    "specPath": "./e2e/gui/**/*"
  }
}
```

### Cypress Configuration

Modify `cypress-config.ts` to adjust:

- Base URLs
- Timeouts
- Viewport settings
- Browser configurations
- Plugin settings

## 🐳 Docker Support

The project includes Docker support for consistent test execution across environments:

- **Containerized execution**: Eliminates "works on my machine" issues
- **GUI testing support**: X11 forwarding for visual test execution
- **Volume mounting**: Real-time code changes without rebuilds
- **Multi-profile setup**: Different configurations for various test types

## 🤝 Contributing

1. **Code formatting**: Run `npm run pretty` before commits
2. **Test structure**: Follow existing patterns in `e2e/` directories
3. **Utilities**: Add reusable functions to `support/` directory
4. **Data generation**: Use Faker.js for dynamic test data

## 📝 Scripts

- `npm run cypress:cli` - Run tests in CLI mode
- `npm run cypress:gui` - Open Cypress Test Runner
- `npm run pretty` - Format code with Prettier

## 🔧 Troubleshooting

### Common Issues

- **Docker GUI tests not displaying**: Ensure XServer/XQuartz is running
- **Permission errors**: Check Docker daemon permissions
- **Test failures**: Verify environment URLs in `cypress.env.json`
- **Module import errors**: Run `npm install` and check TypeScript configuration

---

**Author**: Agata 'Pozanska Pyra' Knapp  
**License**: ISC

```

```
