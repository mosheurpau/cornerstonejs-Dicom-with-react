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

  ## Summary

- **initVolumeLoader.js**: Registers volume loaders for Cornerstone.js, including streaming image and dynamic image volume loaders.

- **ptScalingMetaDataProvider.js**: Manages and provides image scaling metadata for use in Cornerstone.js.

- **initCornerstoneDICOMImageLoader.js**: Configures and initializes the Cornerstone DICOM image loader with WebAssembly support and worker configuration.

- **initProviders.js**: Sets up metadata providers for Cornerstone.js, including scaling and pixel spacing metadata.

- **CornerstoneViewer.js**: Initializes and renders DICOM images using Cornerstone.js, setting up the viewport and handling image stacks.

- **App.js**: Main React component that integrates the DICOM viewer, initializes volume loaders, and sets up the application's layout and styling.
