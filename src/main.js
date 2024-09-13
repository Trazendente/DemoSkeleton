// Import the necessary Camera Kit modules.
import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
  } from '@snap/camera-kit';
  
  // Create an async function to initialize Camera Kit and start the video stream.
  (async function() {
    // Bootstrap Camera Kit using your API token.
    const cameraKit = await bootstrapCameraKit({
      apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI1OTk1ODg4LCJzdWIiOiJmZTBlYTZkNS0wNjkyLTQ3MGEtYmVlNi1kNDQ1NDkyY2ZhNzd-UFJPRFVDVElPTn4zOGMyYWVmNy05OGEyLTQ4MzctYWQzNC1lYTRhZDk1Y2RkODYifQ.ZcL4d_QOzSnF7HAXsvWVdsqGG_uzELwoqw54-EayvQk'
    });
  
    // Create a new CameraKit session.
    const session = await cameraKit.createSession();
  
    // Replace the `canvas` element with the live output from the CameraKit session.
    document.getElementById('canvas').replaceWith(session.output.live);
  
    // Load the specified lens group.
    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['29d898eb-93c9-45ca-9862-246b410fb01d'])
  
    // Apply the first lens in the lens group to the CameraKit session.
    session.applyLens(lenses[0]);
  
    // Get the user's media stream.
    let mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
  
    // Create a CameraKit media stream source from the user's media stream.
    const source = createMediaStreamSource(
      mediaStream, { cameraType: 'back' }
    );
  
    // Set the source of the CameraKit session.
    await session.setSource(source);
  
    // Set the render size of the CameraKit session to the size of the browser window.
    session.source.setRenderSize( window.innerWidth,  window.innerHeight);
  
    // Start the CameraKit session.
    session.play();
  })();
  
