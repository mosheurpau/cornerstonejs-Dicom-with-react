import { RenderingEngine, Enums } from "@cornerstonejs/core";
import { createImageIdsAndCacheMetaData } from "./helper";
import { initDemo } from "./Component/initDemo";
import scalingMetaDataManager from "./Component/ptScalingMetaDataProvider";
import { useEffect, useState } from "react";

const { ViewportType } = Enums;

const CornerstoneViewer = () => {
  const [viewport, setViewport] = useState(null);
  const [imageIds, setImageIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInverted, setIsInverted] = useState(false); // State to manage invert status

  useEffect(() => {
    const setupViewer = async () => {
      try {
        // Initialize Cornerstone
        await initDemo();

        // Fetch image IDs
        const fetchedImageIds = await createImageIdsAndCacheMetaData({
          StudyInstanceUID:
            "1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463",
          SeriesInstanceUID:
            "1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561",
          wadoRsRoot: "https://d3t6nz73ql33tx.cloudfront.net/dicomweb",
        });

        if (fetchedImageIds.length === 0) {
          console.error("No image IDs found");
          setLoading(false);
          return;
        }

        // Add scaling metadata if required
        fetchedImageIds.forEach((imageId) => {
          const scalingMetaData = { scaleFactor: 1.0, offset: 0.0 };
          scalingMetaDataManager.addInstance(imageId, scalingMetaData);
        });

        // Set up the viewport container
        const content = document.getElementById("content");
        if (!content) {
          console.error("Content element not found");
          setLoading(false);
          return;
        }

        // Create and style the viewport element
        const element = document.createElement("div");
        element.style.width = "540px"; // Full width
        element.style.height = "540px"; // Full height
        element.style.display = "flex";
        element.style.justifyContent = "center";
        element.style.alignItems = "center";
        content.appendChild(element);

        // Initialize Rendering Engine
        const renderingEngineId = "myRenderingEngine";
        const viewportId = "CT_AXIAL_STACK";
        const renderingEngine = new RenderingEngine(renderingEngineId);

        // Configure and enable the viewport
        const viewportInput = {
          viewportId,
          element,
          type: ViewportType.STACK,
        };
        renderingEngine.enableElement(viewportInput);

        const viewport = renderingEngine.getViewport(viewportInput.viewportId);
        // Set the stack with image IDs
        viewport.setStack(fetchedImageIds, 60);

        // Render the viewport
        viewport.render();

        // Save the viewport and imageIds to state
        setViewport(viewport);
        setImageIds(fetchedImageIds);
        setLoading(false);
      } catch (error) {
        console.error("Error setting up Cornerstone:", error);
        setLoading(false);
      }
    };

    setupViewer();
  }, []);

  const handleZoomIn = () => {
    if (viewport) {
      const currentZoom = viewport.getZoom();
      viewport.setZoom(currentZoom * 1.2); // Increase zoom by 20%
      viewport.render();
    }
  };

  const handleZoomOut = () => {
    if (viewport) {
      const currentZoom = viewport.getZoom();
      viewport.setZoom(currentZoom / 1.2); // Decrease zoom by 20%
      viewport.render();
    }
  };

  const handleRandomZoom = () => {
    if (viewport) {
      const randomZoom = Math.random() * 3 + 0.5; // Random zoom between 0.5 and 3.5
      viewport.setZoom(randomZoom);
      viewport.render();
    }
  };

  const handleRotateDelta = () => {
    if (viewport) {
      const currentRotation = viewport.getRotation();
      viewport.setRotation(currentRotation + 30); // Rotate by 30 degrees
      viewport.render();
    }
  };

  const handleResetViewport = () => {
    if (viewport && imageIds.length > 0) {
      viewport.setZoom(1.0);
      viewport.setRotation(0);
      viewport.setPan({ x: 0, y: 0 });
      viewport.setStack(imageIds, 60); // Ensure the image stack is set again
      viewport.render();
    }
  };

  const handleInvert = () => {
    if (viewport) {
      const invertValue = !isInverted; // Toggle the invert state
      viewport.setProperties({ invert: invertValue }); // Update viewport properties
      viewport.render();
      setIsInverted(invertValue); // Update the state
    }
  };
  if (loading) {
    return (
      <div>
        <progress className="progress w-56 my-32"></progress>
      </div>
    );
  }
  return (
    <div className="bg-slate-700 border-4 border-slate-700 shadow-2xl">
      <div id="content" style={{ width: "100%", height: "100%" }}></div>
      <div
        className="w-full"
        style={{
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <div className="mt-5 text-center">
          <button className="btn btn-sm" onClick={handleZoomIn}>
            Zoom In
          </button>
          <button
            className="btn btn-sm"
            onClick={handleZoomOut}
            style={{ marginLeft: "10px" }}
          >
            Zoom Out
          </button>
          <button
            className="btn btn-sm"
            onClick={handleRandomZoom}
            style={{ marginLeft: "10px" }}
          >
            Random Zoom
          </button>
        </div>

        <div className="my-5 text-center">
          <button
            className="btn btn-sm"
            onClick={handleRotateDelta}
            style={{ marginLeft: "10px" }}
          >
            Rotate Delta 30
          </button>
          <button
            className="btn btn-sm"
            onClick={handleInvert}
            style={{ marginLeft: "10px" }}
          >
            Invert
          </button>
          <button
            className="btn btn-sm"
            onClick={handleResetViewport}
            style={{ marginLeft: "10px" }}
          >
            Reset Viewport
          </button>
        </div>
      </div>
    </div>
  );
};

export default CornerstoneViewer;
