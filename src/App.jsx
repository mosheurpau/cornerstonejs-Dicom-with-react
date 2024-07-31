import CornerstoneViewer from "./CornerstoneViewer";
import initVolumeLoader from "./Component/initVolumeLoader";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    initVolumeLoader();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-2">DICOM Viewer</h1>
      <div className="flex justify-center items-center">
        <CornerstoneViewer />
      </div>
    </div>
  );
}

export default App;
