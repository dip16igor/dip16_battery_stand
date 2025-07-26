[Русская версия](README.ru.md)

# DIP-16 Battery Test Stand

Firmware for a test stand designed to measure the capacity and characteristics of small batteries, potentially those fitting a DIP-16 socket. This project is built using the PlatformIO IDE.

## ✨ Features

- Measures battery voltage and discharge current.
- Calculates discharged capacity in mAh.
- Logs data to the Serial port for analysis.
- OLED display for real-time monitoring of key parameters.

## 🛠️ Hardware

A detailed list of components can be found in the project documentation. Key components include:
- Microcontroller (e.g., ESP32, ESP8266)
- Current and voltage sensor (e.g., INA219)
- OLED Display (e.g., SSD1306)
- DIP-16 socket
- Load resistor

*(Optional: Add a link to your schematic or PCB files here.)*

## 🚀 Firmware Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```
2.  **Open in PlatformIO:**
    - Open Visual Studio Code.
    - Click on the PlatformIO icon in the sidebar.
    - Choose "Open Project" and select the cloned repository folder.
3.  **Build and Upload:**
    - PlatformIO will automatically install the required libraries.
    - Connect your microcontroller.
    - Click the "Upload" button in the PlatformIO toolbar.

## ⚙️ Usage

1.  Insert a battery into the DIP-16 socket.
2.  Power on the device.
3.  The test will start automatically (or after a button press, depending on the configuration).
4.  Monitor the process on the OLED screen or by opening the Serial Monitor in PlatformIO (`115200` baud).

## 🤝 Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.