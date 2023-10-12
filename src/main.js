import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
 } from '@snap/camera-kit'

 (async function(){
    var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjg0ODMxMTQ0LCJzdWIiOiJlYTg4ZjQyZC0xYmM5LTRkN2YtYTMwMS02Y2M4YzU2OTg2Y2J-U1RBR0lOR340OGY1YjJmYS1iZGNjLTQ5MzAtYjI2NS1jNGYzODliMzAwYjAifQ.BojCwDCBLoh_7wsjjiM59vkpvdCDUyDd0WVMcFjcei0' })

    const session = await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['d1237d2f-cea3-43fb-bd74-49835c2c806f'])

    session.applyLens(lenses[0])
    
    let mediaStream = await navigator.mediaDevices.getUserMedia({ video:
        { facingMode: 'environment' }
    });

    const source = createMediaStreamSource(mediaStream, {
        cameraType: 'back'
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play()
 })();