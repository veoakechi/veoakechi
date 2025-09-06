/* tslint:disable */
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GenerateVideosParameters, GoogleGenAI, Modality } from '@google/genai';

// Declare FFmpeg types from the UMD scripts loaded in index.html
declare const FFmpeg: any;
declare const FFmpegUtil: any;

// Base64 encoded string of the user-provided image.
const PRELOADED_IMAGE_BASE64 = "/9j/4AAQSkZJRgABAQEASABIAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIbGNtcwIQAABtbnRyUkdCIFhZWiAH4gADABQACQAOAB1hY3NwTVNGVAAAAABzYXdzY3RybAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWhhbmQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYAAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAkwAAAAUYlhZWgAAAlgAAAAUdW1hYwAAAAoAAAFsY2hhZAAAAogAAAAsYXBwbAAAAIAAAAAIdmNndAAAA4AAAAAAYm1tb2QAAAVIۆAAAAGdmY2dwAAAVkAAAACZTbW5kAAAWAAAAACn//////7////28////9wAAlwEAAgUBAQAAAAAAAAAAAAABAgMEAAAAAAAAAAAAAAsBAgAAAAAAAAAAAAACAwQF//8AAEQgEAAOCAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDQ2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/dAAQAsf/aAAwDAQACE_MRAD8A+qaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAC-";
const PRELOADED_PROMPT = '';

const GEMINI_API_KEY = process.env.API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const loadingMessages = [
    'Initializing video generation...',
    'Warming up the video model...',
    'Crafting the opening scene...',
    'Animating the main subject...',
    'This can take a few minutes, please wait.',
    'Rendering the frames...',
    'Adding the finishing touches...',
    'Almost there...',
    'Merging audio and video...',
];

// Current image and audio data
let currentImageBase64: string;
let currentImageMimeType: string;
let currentAudioFile: File | null = null;
let currentAudioUrl: string | null = null;
let ffmpeg: any = null;
let videoHistory: string[] = [];


// DOM Elements
let promptEl: HTMLTextAreaElement;
let negativePromptEl: HTMLTextAreaElement;
let removeWatermarkCheckbox: HTMLInputElement;
let aspectRatioSelect: HTMLSelectElement;
let durationSelect: HTMLSelectElement;
let generateButton: HTMLButtonElement;
let statusEl: HTMLDivElement;
let video: HTMLVideoElement;
let quotaErrorEl: HTMLDivElement;
let openKeyEl: HTMLButtonElement;
let sourceImageEl: HTMLImageElement;
let downloadButton: HTMLAnchorElement;
let imageUploadInput: HTMLInputElement;
let uploadButton: HTMLLabelElement;
let audioUploadInput: HTMLInputElement;
let uploadAudioButton: HTMLLabelElement;
let audioUrlInput: HTMLInputElement;
let audioInputContainer: HTMLDivElement;
let audioInfoEl: HTMLDivElement;
let audioNameEl: HTMLSpanElement;
let removeAudioButton: HTMLButtonElement;
let historyGridEl: HTMLDivElement;


let statusInterval: number;

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadFFmpeg() {
    if (ffmpeg) return;
    const { createFFmpeg } = FFmpeg;
    ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();
}

async function mergeVideoAndAudio(videoBlob: Blob, audioFile: File): Promise<Blob> {
    if (!ffmpeg) await loadFFmpeg();
    const { fetchFile } = FFmpegUtil;

    // Write files to FFmpeg's virtual file system
    await ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoBlob));
    await ffmpeg.FS('writeFile', 'input.audio', await fetchFile(audioFile));

    // Run the FFmpeg command to merge
    // -c:v copy: Copies the video stream without re-encoding
    // -c:a aac: Re-encodes audio to AAC for broad compatibility
    // -shortest: Finishes encoding when the shortest input stream ends
    await ffmpeg.run('-i', 'input.mp4', '-i', 'input.audio', '-c:v', 'copy', '-c:a', 'aac', '-shortest', 'output.mp4');

    // Read the resulting file
    const data = ffmpeg.FS('readFile', 'output.mp4');

    // Clean up the virtual file system
    ffmpeg.FS('unlink', 'input.mp4');
    ffmpeg.FS('unlink', 'input.audio');
    ffmpeg.FS('unlink', 'output.mp4');

    return new Blob([data.buffer], { type: 'video/mp4' });
}


function setUIState(isLoading: boolean) {
    generateButton.disabled = isLoading;
    promptEl.disabled = isLoading;
    negativePromptEl.disabled = isLoading;
    removeWatermarkCheckbox.disabled = isLoading;
    aspectRatioSelect.disabled = isLoading;
    durationSelect.disabled = isLoading;
    imageUploadInput.disabled = isLoading;
    uploadButton.setAttribute('aria-disabled', String(isLoading));
    audioUploadInput.disabled = isLoading;
    uploadAudioButton.setAttribute('aria-disabled', String(isLoading));
    audioUrlInput.disabled = isLoading;
    removeAudioButton.disabled = isLoading;

    if (isLoading) {
        let messageIndex = 0;
        statusEl.textContent = loadingMessages[messageIndex];
        statusEl.style.display = 'block';
        video.style.display = 'none';
        quotaErrorEl.style.display = 'none';
        downloadButton.style.display = 'none';

        statusInterval = window.setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            statusEl.textContent = loadingMessages[messageIndex];
        }, 3000);
    } else {
        clearInterval(statusInterval);
    }
}

function renderHistory() {
    historyGridEl.innerHTML = '';
    for (const url of videoHistory) {
        const item = document.createElement('button');
        item.className = 'history-item';
        item.setAttribute('aria-label', 'View generated video');

        const thumbVideo = document.createElement('video');
        thumbVideo.src = url;
        thumbVideo.muted = true;
        thumbVideo.loop = true;
        thumbVideo.playsInline = true;
        // Play on hover/focus
        item.addEventListener('mouseenter', () => thumbVideo.play());
        item.addEventListener('mouseleave', () => thumbVideo.pause());


        item.onclick = () => {
            video.src = url;
            downloadButton.href = url;
            video.style.display = 'block';
            downloadButton.style.display = 'inline-flex';
            statusEl.style.display = 'none';
        };

        item.appendChild(thumbVideo);
        historyGridEl.appendChild(item);
    }
}

async function generateVideo() {
  if (!currentImageBase64 || !currentImageMimeType) {
    statusEl.textContent = 'Please upload an image first.';
    statusEl.style.color = 'var(--error-color)';
    return;
  }

  setUIState(true);
  video.muted = !currentAudioFile && !currentAudioUrl;

  const prompt = promptEl.value;
  const negativePrompt = negativePromptEl.value.trim();
  const aspectRatio = aspectRatioSelect.value as '16:9' | '9:16' | '1:1' | '4:3' | '3:4';
  const duration = parseInt(durationSelect.value, 10);
  const shouldRemoveWatermark = removeWatermarkCheckbox.checked;

  let imageBytesForVideo = currentImageBase64;
  let mimeTypeForVideo = currentImageMimeType;

  try {
    if (shouldRemoveWatermark) {
        statusEl.textContent = 'Removing watermark from image...';
        clearInterval(statusInterval); // Stop rotating messages for this step
        try {
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image-preview',
              contents: {
                parts: [
                  {
                    inlineData: {
                      data: currentImageBase64,
                      mimeType: currentImageMimeType,
                    },
                  },
                  {
                    text: 'Remove any watermarks, logos, or text overlays from this image. Preserve the original image quality and composition.',
                  },
                ],
              },
              config: {
                  responseModalities: [Modality.IMAGE, Modality.TEXT],
              },
            });

            const imagePart = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);
            if (imagePart && imagePart.inlineData) {
                imageBytesForVideo = imagePart.inlineData.data;
                mimeTypeForVideo = imagePart.inlineData.mimeType;
                sourceImageEl.src = `data:${mimeTypeForVideo};base64,${imageBytesForVideo}`;
            } else {
                statusEl.textContent = 'Warning: Could not remove watermark. Proceeding with original image.';
                await delay(3000);
            }
        } catch (editError: any) {
             console.error('Error during watermark removal:', editError);
             statusEl.textContent = 'Warning: Watermark removal failed. Proceeding with original image.';
             await delay(3000);
        }
    }


    const params: GenerateVideosParameters = {
      model: 'veo-2.0-generate-001',
      prompt,
      image: {
        imageBytes: imageBytesForVideo,
        mimeType: mimeTypeForVideo,
      },
      config: {
        numberOfVideos: 1,
        aspectRatio: aspectRatio,
        durationSeconds: duration,
        ...(negativePrompt && { negativePrompt }),
      },
    };

    let operation = await ai.models.generateVideos(params);

    while (!operation.done) {
      await delay(10000); // Poll every 10 seconds
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const firstVideo = operation.response?.generatedVideos?.[0];
    if (!firstVideo?.video?.uri) {
      throw new Error('Video generation failed or returned no result.');
    }

    const videoUri = decodeURIComponent(firstVideo.video.uri);
    // The download URI requires the API key to be appended
    const downloadUrl = `${videoUri}&key=${GEMINI_API_KEY}`;

    const res = await fetch(downloadUrl);
    if (!res.ok) {
        throw new Error(`Failed to fetch video: ${res.statusText}`);
    }
    const videoBlob = await res.blob();
    let finalBlob = videoBlob;

    let audioToMerge: File | null = currentAudioFile;

    if (currentAudioUrl) {
        try {
            statusEl.textContent = 'Downloading audio from URL...';
            const audioRes = await fetch(currentAudioUrl);
            if (!audioRes.ok) {
                throw new Error(`Failed to fetch audio: ${audioRes.statusText}`);
            }
            const audioBlob = await audioRes.blob();
            const fileName = currentAudioUrl.split('/').pop() || 'downloaded_audio';
            audioToMerge = new File([audioBlob], fileName, { type: audioBlob.type });
        } catch (audioError: any) {
            console.error('Failed to download audio from URL:', audioError);
            statusEl.textContent = `Warning: Could not load audio from URL. Generating silent video. Error: ${audioError.message}`;
            await delay(4000); // Show warning for a few seconds
            audioToMerge = null;
        }
    }

    if (audioToMerge) {
        statusEl.textContent = 'Merging audio and video...';
        finalBlob = await mergeVideoAndAudio(videoBlob, audioToMerge);
    }

    const objectURL = URL.createObjectURL(finalBlob);

    // Add to history and render
    videoHistory.unshift(objectURL);
    if (videoHistory.length > 8) { // Keep history to a reasonable size
        const oldestUrl = videoHistory.pop();
        if(oldestUrl) URL.revokeObjectURL(oldestUrl); // Clean up memory
    }
    renderHistory();

    video.src = objectURL;
    video.style.display = 'block';
    downloadButton.href = objectURL;
    downloadButton.style.display = 'inline-flex';
    statusEl.style.display = 'none';


  } catch (e: any) {
    console.error(e);
    let errorMessage = 'An unexpected error occurred.';
    try {
        // Handle specific API errors if possible
        const errObj = JSON.parse(e.message || '{}');
        if (errObj?.error?.code === 429) {
            quotaErrorEl.style.display = 'block';
            statusEl.style.display = 'none';
            return; // Exit without setting general error message
        }
        if (errObj?.error?.message) {
            errorMessage = errObj.error.message;
        }
    } catch (parseError) {
        if (e.message) {
            errorMessage = e.message;
        }
    }
    statusEl.textContent = `Error: ${errorMessage}`;
    statusEl.style.color = 'var(--error-color)';
    statusEl.style.display = 'block';

  } finally {
    setUIState(false);
  }
}

function handleImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
        statusEl.textContent = 'Please select an image file.';
        statusEl.style.color = 'var(--error-color)';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const result = e.target?.result as string;
        sourceImageEl.src = result;

        const parts = result.split(';base64,');
        const mimeType = parts[0].split(':')[1];
        const base64Data = parts[1];

        currentImageBase64 = base64Data;
        currentImageMimeType = mimeType;

        statusEl.textContent = '';
        statusEl.style.color = '';
    };
    reader.readAsDataURL(file);
}

function showAudioInfo(name: string) {
    audioNameEl.textContent = name;
    audioInfoEl.style.display = 'flex';
    audioInputContainer.style.display = 'none';
}

function handleAudioUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) {
        handleRemoveAudio();
        return;
    }
    currentAudioFile = file;
    currentAudioUrl = null;
    audioUrlInput.value = ''; // Clear other input
    showAudioInfo(file.name);
}

function handleAudioUrlInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const url = target.value.trim();

    if (!url) {
        handleRemoveAudio();
        return;
    }
    currentAudioUrl = url;
    currentAudioFile = null;
    audioUploadInput.value = ''; // Clear other input
    showAudioInfo(url);
}

function handleRemoveAudio() {
    currentAudioFile = null;
    currentAudioUrl = null;
    audioUploadInput.value = '';
    audioUrlInput.value = '';
    audioInfoEl.style.display = 'none';
    audioInputContainer.style.display = 'flex';
}


document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    promptEl = document.querySelector('#prompt-input') as HTMLTextAreaElement;
    negativePromptEl = document.querySelector('#negative-prompt-input') as HTMLTextAreaElement;
    removeWatermarkCheckbox = document.querySelector('#remove-watermark-checkbox') as HTMLInputElement;
    aspectRatioSelect = document.querySelector('#aspect-ratio-select') as HTMLSelectElement;
    durationSelect = document.querySelector('#duration-select') as HTMLSelectElement;
    generateButton = document.querySelector('#generate-button') as HTMLButtonElement;
    statusEl = document.querySelector('#status') as HTMLDivElement;
    video = document.querySelector('#video') as HTMLVideoElement;
    quotaErrorEl = document.querySelector('#quota-error') as HTMLDivElement;
    openKeyEl = document.querySelector('#open-key') as HTMLButtonElement;
    sourceImageEl = document.querySelector('#source-image') as HTMLImageElement;
    downloadButton = document.querySelector('#download-button') as HTMLAnchorElement;
    imageUploadInput = document.querySelector('#image-upload-input') as HTMLInputElement;
    uploadButton = document.querySelector('#upload-button') as HTMLLabelElement;
    audioUploadInput = document.querySelector('#audio-upload-input') as HTMLInputElement;
    uploadAudioButton = document.querySelector('#upload-audio-button') as HTMLLabelElement;
    audioUrlInput = document.querySelector('#audio-url-input') as HTMLInputElement;
    audioInputContainer = document.querySelector('#audio-input-container') as HTMLDivElement;
    audioInfoEl = document.querySelector('#audio-info') as HTMLDivElement;
    audioNameEl = document.querySelector('#audio-name') as HTMLSpanElement;
    removeAudioButton = document.querySelector('#remove-audio-button') as HTMLButtonElement;
    historyGridEl = document.querySelector('#history-grid') as HTMLDivElement;


    // Pre-fill content and set initial image data
    sourceImageEl.src = `data:image/jpeg;base64,${PRELOADED_IMAGE_BASE64}`;
    currentImageBase64 = PRELOADED_IMAGE_BASE64;
    currentImageMimeType = 'image/jpeg';
    promptEl.value = PRELOADED_PROMPT;
    aspectRatioSelect.value = '9:16';
    statusEl.textContent = 'Ready to generate a video. Enter a prompt and click "Generate".';
    statusEl.style.display = 'block';


    // Add event listeners
    generateButton.addEventListener('click', generateVideo);
    imageUploadInput.addEventListener('change', handleImageUpload);
    audioUploadInput.addEventListener('change', handleAudioUpload);
    audioUrlInput.addEventListener('change', handleAudioUrlInput);
    removeAudioButton.addEventListener('click', handleRemoveAudio);
    openKeyEl.addEventListener('click', async () => {
      await (window as any).aistudio?.openSelectKey();
    });

    // Eagerly load FFmpeg in the background for faster merging later
    loadFFmpeg().catch(console.error);
});