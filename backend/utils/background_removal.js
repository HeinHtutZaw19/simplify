import React, { useEffect, useRef } from 'react'
import * as bodyPix from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs' // Needed for BodyPix

import { Box } from '@chakra-ui/react'

const IMAGE_SRC = '/img/8.jpg' // Make sure this is in your `public/img` folder

const BackgroundRemovalCanvas = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const loadImageAndProcess = async () => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.src = IMAGE_SRC

            await new Promise((resolve) => {
                img.onload = resolve
            })

            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')

            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)

            // Load BodyPix
            const net = await bodyPix.load({
                architecture: 'ResNet50',
                outputStride: 32,
                quantBytes: 4,
            })

            const segmentation = await net.segmentPerson(canvas, {
                internalResolution: 'medium',
                segmentationThreshold: 0.7,
            })

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const newImage = ctx.createImageData(canvas.width, canvas.height)

            segmentation.data.forEach((segment, i) => {
                const offset = i * 4
                if (segment === 1) {
                    newImage.data[offset] = imageData.data[offset]
                    newImage.data[offset + 1] = imageData.data[offset + 1]
                    newImage.data[offset + 2] = imageData.data[offset + 2]
                    newImage.data[offset + 3] = imageData.data[offset + 3]
                }
            })

            ctx.putImageData(newImage, 0, 0)
        }

        loadImageAndProcess()
    }, [])

    return (
        <Box>
            <canvas ref={canvasRef} />
        </Box>
    )
}

export default BackgroundRemovalCanvas
