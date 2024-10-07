# Near Space

This is our project to participate in **NASA Space Challenger App**, a web-based application designed to allow users to explore space objects like Near-Earth Objects (NEOs) and planets in a 3D interactive environment. The app simulates celestial bodies' orbits and movements using Kepler's laws, offering an immersive experience in space exploration.

## Features

- **3D Visualization of Space Objects**: The app leverages Three.js to render asteroids, planets, and other celestial objects in a 3D space, allowing users to observe their orbits and explore space interactively.
- **Simulated Orbital Mechanics**: The orbits of planets and NEOs are simulated based on Kepler’s laws, providing an accurate yet simulated representation of how these objects move in space.
- **Interactive Camera Control**: Users can toggle between `focus` (first-person view) and `orbit` modes to dynamically explore the environment from different perspectives.

## Development Tools

During the development of the NASA Space Challenger App, two powerful tools were instrumental in improving productivity:

1. **Supermaven**:
   - **Supermaven** was used for code completion and suggestions throughout the development process. It helped streamline writing repetitive boilerplate code and accelerate coding efficiency by auto-completing complex patterns.
2. **ChatGPT**:
   - We used **ChatGPT** to assist in generating the logic for solving **Kepler's equation** and other orbital calculations. It also contributed to design decisions and general programming tasks, including 3D designs in Three.js and overall architecture guidance.

> These tools were used to improve the development process and are not features exposed to the end users of the application.

## Dependencies

This project relies on the following specific versions of libraries:

```json
"dependencies": {
    "@react-three/drei": "9.114.0",
    "@react-three/fiber": "8.17.9",
    "@react-three/postprocessing": "2.16.3",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "three": "0.169.0",
    "zustand": "5.0.0-rc.2"
}
```

### Core Libraries

- **React** (`18.3.1`): The library for building the user interface.
- **React-DOM** (`18.3.1`): For rendering React components in the DOM.
- **Three.js** (`0.169.0`): The 3D engine used for rendering space objects and their environments.
- **React-Three-Fiber** (`8.17.9`): A React renderer for Three.js, facilitating easy integration of 3D elements within a React environment.
- **React-Three-Drei** (`9.114.0`): A collection of useful helpers and abstractions for `react-three-fiber`.
- **React-Three-Postprocessing** (`2.16.3`): For adding post-processing effects such as bloom, SSAO, etc., to enhance the visual quality.
- **Zustand** (`5.0.0-rc.2`): A lightweight state management library used to handle the app’s global state, such as camera modes and selected objects.

### Optional Development Tools

- **Vite**: A fast build tool recommended for development.
  - Install: `npm install vite`
- **Prettier & ESLint**: For maintaining code style and quality.
  - Install: `npm install prettier eslint --save-dev`

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EstebanAP1/near-space.git
   cd near-space
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to explore the app.

## How It Works

### Simulated Orbits

The orbits of planets and NEOs are based on **Kepler's laws of planetary motion** but are not computed in real-time. Instead, we use pre-calculated orbital elements to simulate the motion of celestial bodies in space. This gives users a near-realistic experience without the computational complexity of real-time calculations.

### Camera Controls

Users can switch between:

- **Orbit Mode**: Move around the objects and zoom in/out to get a better view.
- **Focus Mode**: Get a first-person view that follows the path of the space objects as they move through their simulated orbits.

## Usage

- In `orbit` mode, you can zoom in and out and pan around the objects.
- In `focus` mode, you follow a space object from a first-person perspective, allowing you to experience its journey through space.

## Contributing

We welcome contributions to improve the NASA Space Challenger App. Feel free to submit pull requests or open issues on GitHub.
