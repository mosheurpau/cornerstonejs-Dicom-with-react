# Cornerstone.js Viewer with DICOMweb Integration

This project sets up a DICOM image viewer using Cornerstone.js integrated with DICOMweb. It fetches DICOM images from a DICOMweb server, processes them, and displays them using Cornerstone.js in a React application.

## Project Structure

- `CornerstoneViewer.jsx`: The main React component that initializes and configures the Cornerstone viewer.
- `helper.jsx`: Contains the `createImageIdsAndCacheMetaData` function to fetch and process DICOM metadata.
- `Component/initDemo.jsx`: Initializes the Cornerstone.js library.
- `public/`: Contains static assets.
- `src/`: Contains source code files.

3. **View DICOM Images:**
   The application will display the first image from the specified DICOM series in the Cornerstone.js viewer.

## Code Overview

- **`CornerstoneViewer.jsx`**:

  - Initializes Cornerstone.js.
  - Fetches DICOM image metadata and image IDs.
  - Sets up the viewer and renders the images.

- **`helper.jsx`**:

  - Contains `createImageIdsAndCacheMetaData` function that fetches DICOM metadata from the DICOMweb server and processes it for Cornerstone.js.

- **`initDemo.jsx`**:
  - Initializes Cornerstone.js library and registers necessary tools and utilities.
