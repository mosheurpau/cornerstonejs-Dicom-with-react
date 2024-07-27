import { RenderingEngine, Enums } from "@cornerstonejs/core";
import { createImageIdsAndCacheMetaData } from "./helper.jsx";
import { initDemo } from "./Component/initDemo.jsx";
import { useEffect } from "react";

const { ViewportType } = Enums;

const CornerstoneViewer = () => {
  useEffect(() => {
    const setupViewer = async () => {
      try {
        // Initialize Cornerstone
        await initDemo();

        // Register the WADO-RS loader
        const imageIds = await createImageIdsAndCacheMetaData({
          StudyInstanceUID:
            "1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463",
          SeriesInstanceUID:
            "1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561",
          wadoRsRoot: "https://d3t6nz73ql33tx.cloudfront.net/dicomweb",
        });

        console.log("Image IDs:", imageIds);

        // Only use the first image ID
        const singleImageId = imageIds[0];

        const content = document.getElementById("content");
        if (!content) {
          console.error("Content element not found");
          return;
        }

        // Create and style the viewport element
        const element = document.createElement("div");
        element.style.width = "800px"; // Fixed width
        element.style.height = "600px"; // Fixed height
        element.style.display = "flex";
        element.style.justifyContent = "center";
        element.style.alignItems = "center";
        content.appendChild(element);

        // Set up the rendering engine and viewport
        const renderingEngineId = "myRenderingEngine";
        const viewportId = "CT_AXIAL_STACK";
        const renderingEngine = new RenderingEngine(renderingEngineId);

        const viewportInput = {
          viewportId,
          element,
          type: ViewportType.STACK,
        };

        renderingEngine.enableElement(viewportInput);

        const viewport = renderingEngine.getViewport(viewportId);

        // Display only the single image
        viewport.setStack([singleImageId], 0); // Set the stack with the single image
        viewport.displayImage(singleImageId); // Display only this single image

        // Render the viewport
        viewport.render();
      } catch (error) {
        console.error("Error setting up Cornerstone:", error);
      }
    };

    setupViewer();
  }, []);

  return <div id="content" style={{ width: "100%", height: "100%" }}></div>;
};

export default CornerstoneViewer;
