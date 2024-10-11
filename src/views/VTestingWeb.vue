<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Deteksi Wajah Web</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div>
                <video autoplay="true" id="video-webcam">
                    Browsermu tidak mendukung bro, upgrade donk!
                </video>
            </div>
            <ion-input v-model="faceId" placeholder="Masukkan ID Wajah"></ion-input>
            <ion-button @click="saveFaceDetection">Simpan Gambar</ion-button>
            <ion-button @click="checkFace">Periksa Wajah</ion-button>
            <ion-button @click="checkGender">Periksa Gender </ion-button>
            <ion-button @click="checkExpression">Periksa Ekspresi</ion-button>
            <ion-button @click="checkAge">Periksa Umur</ion-button>

            <ion-item>
                <ion-label position="stacked">Threshold (0.1 - 1.0)</ion-label>
                <ion-range v-model="threshold" min="0.1" max="1" step="0.1" snaps="true"></ion-range>
                <ion-note slot="end">{{ threshold.toFixed(1) }}</ion-note>
            </ion-item>

            <ion-item>
                <ion-label>Ukuran Deteksi</ion-label>
                <ion-select v-model="selectedSize" interface="popover">
                    <ion-select-option v-for="size in commonSizes" :key="size.width" :value="size">
                        {{ size.width }}x{{ size.height }}
                    </ion-select-option>
                </ion-select>
            </ion-item>

            <ion-item v-if="detectedGender">
                <ion-label>Jenis Kelamin Terdeteksi: {{ detectedGender }}</ion-label>
            </ion-item>
            <ion-item v-if="detectedExpression">
                <ion-label>Ekspresi Terdeteksi: {{ detectedExpression }}</ion-label>
            </ion-item>
            <ion-item v-if="detectedAge">
                <ion-label>Umur Terdeteksi: {{ detectedAge }}</ion-label>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as faceapi from '@vladmandic/face-api';
import { IonButton, IonInput, IonItem, IonLabel, IonRange, IonNote, IonSelect, IonSelectOption } from '@ionic/vue';
import { Camera, CameraResultType } from '@capacitor/camera';

const loadModels = async () => {
    const MODEL_URL = '/models'; // Pastikan path ini benar
    try {
        console.log('Mulai memuat model...');
        // await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        // await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        // await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        // await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
        // await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        console.log('Semua model berhasil dimuat');
        return true;
    } catch (error) {
        console.error('Terjadi kesalahan saat memuat model:', error);
        return false;
    }
};

const detectFace = async (video) => {
    if (
        faceapi.nets.tinyFaceDetector.isLoaded &&
        faceapi.nets.faceLandmark68Net.isLoaded &&
        faceapi.nets.faceRecognitionNet.isLoaded &&
        faceapi.nets.ageGenderNet.isLoaded &&
        faceapi.nets.faceExpressionNet.isLoaded
    ) {
        const detection = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: selectedSize.value.width }))
            .withFaceLandmarks()
            .withFaceDescriptor()
            .withAgeAndGender()
            .withFaceExpressions(); // Tambahkan deteksi ekspresi

        if (detection) {
            console.log('Wajah terdeteksi:', detection);
            lastDetection.value = detection;
            detectedGender.value = detection.gender;
            detectedExpression.value = getTopExpression(detection.expressions);
            detectedAge.value = Math.round(detection.age); // Tambahkan ini
        } else {
            console.log('Tidak ada wajah yang terdeteksi');
            lastDetection.value = null;
            detectedGender.value = null;
            detectedExpression.value = null;
            detectedAge.value = null; // Tambahkan ini
        }
    } else {
        console.log('Model belum dimuat sepenuhnya. Menunggu...');
    }
};

const getTopExpression = (expressions) => {
    return Object.entries(expressions).reduce((a, b) => a[1] > b[1] ? a : b)[0];
};

const saveFaceDetection = () => {
    if (!faceId.value.trim()) {
        alert('Mohon masukkan ID wajah terlebih dahulu.');
        return;
    }

    if (lastDetection.value) {
        const detectionData = {
            id: faceId.value.trim(),
            timestamp: new Date().toISOString(),
            faceDescriptor: Array.from(lastDetection.value.descriptor),
            landmarks: lastDetection.value.landmarks.positions.map(pos => ({ x: pos.x, y: pos.y })),
        };

        let savedFaces = JSON.parse(localStorage.getItem('savedFaces') || '{}');
        savedFaces[detectionData.id] = detectionData;
        localStorage.setItem('savedFaces', JSON.stringify(savedFaces));

        alert(`Data deteksi wajah untuk ID ${detectionData.id} berhasil disimpan!`);
        faceId.value = ''; // Reset input ID
    } else {
        alert('Tidak ada data deteksi wajah yang tersedia untuk disimpan.');
    }
};

const checkFace = async () => {
    if (!lastDetection.value) {
        alert('Tidak ada wajah yang terdeteksi saat ini. Silakan tunggu deteksi berikutnya.');
        return;
    }

    const savedFaces = JSON.parse(localStorage.getItem('savedFaces') || '{}');
    if (Object.keys(savedFaces).length === 0) {
        alert('Tidak ada data wajah yang tersimpan. Silakan simpan wajah terlebih dahulu.');
        return;
    }

    const currentFaceDescriptor = lastDetection.value.descriptor;
    let bestMatch = null;
    let bestDistance = Infinity;

    for (const [id, savedFace] of Object.entries(savedFaces)) {
        const savedFaceDescriptor = new Float32Array(savedFace.faceDescriptor);
        const distance = faceapi.euclideanDistance(currentFaceDescriptor, savedFaceDescriptor);

        if (distance < bestDistance) {
            bestDistance = distance;
            bestMatch = { id, distance };
        }
    }

    if (bestMatch && bestMatch.distance < threshold.value) {
        alert(`Wajah cocok dengan ID: ${bestMatch.id}. Tingkat kecocokan: ${((1 - bestMatch.distance) * 100).toFixed(2)}%`);
    } else {
        alert(`Wajah tidak cocok dengan data yang tersimpan. Tingkat perbedaan terkecil: ${(bestMatch ? bestMatch.distance * 100 : 0).toFixed(2)}%`);
    }
};

const checkGender = () => {
    if (detectedGender.value) {
        alert(`Jenis kelamin terdeteksi: ${detectedGender.value}`);
    } else {
        alert('Tidak ada jenis kelamin yang terdeteksi. Silakan tunggu deteksi berikutnya.');
    }
};

const checkExpression = () => {
    if (detectedExpression.value) {
        alert(`Ekspresi terdeteksi: ${detectedExpression.value}`);
    } else {
        alert('Tidak ada ekspresi yang terdeteksi. Silakan tunggu deteksi berikutnya.');
    }
};

const checkAge = () => {
    if (detectedAge.value) {
        alert(`Umur terdeteksi: ${detectedAge.value} tahun`);
    } else {
        alert('Tidak ada umur yang terdeteksi. Silakan tunggu deteksi berikutnya.');
    }
};

const lastDetection = ref(null);
const faceId = ref('');
const threshold = ref(0.6);
const commonSizes = [
    { width: 320, height: 240 },
    { width: 640, height: 480 },
    { width: 1280, height: 720 },
];
const selectedSize = ref(commonSizes[1]);
const detectedGender = ref(null);
const detectedExpression = ref(null);
const detectedAge = ref(null);

watch(selectedSize, () => {
    const video = document.querySelector("#video-webcam");
    if (video) {
        video.width = selectedSize.value.width;
        video.height = selectedSize.value.height;
    }
});


// android area 
// Start of Selection
const getPermissions = async () => {
    const permissions = await Camera.requestPermissions();
    if (permissions) {
        console.log('Permission granted');
    }
};

// mounted area 
onMounted(async () => {
    await getPermissions();
    await loadModels();
    const video = document.querySelector("#video-webcam");

    const handleVideo = (stream) => {
        video.srcObject = stream;
        video.width = selectedSize.value.width;
        video.height = selectedSize.value.height;
        video.addEventListener('play', () => {
            setInterval(() => detectFace(video), 10000); // Deteksi setiap 1 detik
        });
    };

    const videoError = () => {
        alert("Izinkan menggunakan webcam untuk demo!");
    };

    navigator.mediaDevices.getUserMedia({
        video: {
            width: { ideal: selectedSize.value.width },
            height: { ideal: selectedSize.value.height }
        }
    })
        .then(handleVideo)
        .catch(videoError);
});
</script>

<style scoped>
img,
video {
    max-width: 100%;
    height: auto;
    display: block;
    margin-top: 20px;
}
</style>