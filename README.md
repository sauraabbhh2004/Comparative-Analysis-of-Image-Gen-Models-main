# Comparative Analysis of Image Generation Models

This project utilizes **SAM2** for image segmentation, **MongoDB** for data storage, and an image generation module. It is optimized to run in a **Linux-based environment**, preferably through a **WSL terminal**, to handle dependencies effectively.

---

## Prerequisites
Before setting up the project, ensure you have the following installed:

1. **WSL or Linux Environment** (Recommended for dependency management)
2. **Python 3.8 or higher**
3. **MongoDB Compass** (For database interaction)
4. **ngrok** (For secure tunneling and domain setup)
5. **Node.js and npm** (Required for running the React frontend)

---

## Project Setup

### Step 1: Set Up the SAM2 Segmentation Model
The project uses the **SAM2 model** for segmentation. Follow these steps to install it:

```bash
# Clone the SAM2 repository (if not done already)
git clone https://github.com/facebookresearch/sam2.git
cd sam2

# Follow the setup instructions in the SAM2 README
```

> **Note:** Ensure all dependencies required by SAM2 are installed, as the model may have specific requirements.

### Step 2: MongoDB Setup

- **Database Connection:** Open `final_receiver.ipynb` and provide the MongoDB connection string.
- **Ensure MongoDB is running** locally or through **MongoDB Atlas** before proceeding.

### Step 3: ngrok Configuration

1. **Create an ngrok account** to expose your local servers securely.
2. **Retrieve the Authentication Token** from your ngrok account.
3. **Update the settings** in `image.ipynb`:
   - Add the **authentication token**.
   - Set the **domain link** for public access.

### Step 4: Run the Application
The project consists of multiple components. Run them in the following order for smooth execution:

#### 1. Start the Backend Servers
Run the following files in separate terminal windows:

```bash
# Start the Flask backend
python app.py

# Run MongoDB data receiver (Jupyter Notebook)
jupyter notebook final_receiver.ipynb

# Start image processing module (Jupyter Notebook)
jupyter notebook image.ipynb
```

#### 2. Run the React Frontend
Navigate to the React app directory and start the frontend:

```bash
cd path/to/react-app
npm install
npm start
```

---

## Final Notes

- **Environment Management:**
  - Consider using a **virtual environment** (`venv` or `conda`) for Python dependencies.
  - Example:
    ```bash
    python -m venv venv
    source venv/bin/activate  # Linux/macOS
    venv\Scripts\activate  # Windows
    ```

- **Troubleshooting:**
  - For **SAM2-specific** issues, refer to the [SAM2 GitHub page](https://github.com/facebookresearch/sam2).
  - For **MongoDB errors**, check the [MongoDB documentation](https://www.mongodb.com/docs/).
  - For **ngrok setup issues**, visit the [ngrok documentation](https://ngrok.com/docs/).

---

**Happy Coding! 🚀**

