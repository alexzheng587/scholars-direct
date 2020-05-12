const peerConnections = {};
const config = {
    iceServers: [
        {
            urls: ["stun:stun.l.google.com:19302"]
        }
    ]
};

const socket = io.connect(window.location.origin);

socket.on("answer", (id, description) => {
    peerConnections[id].setRemoteDescription(description);
});

socket.on("watcher", id => {
    const peerConnection = new RTCPeerConnection(config);
    peerConnections[id] = peerConnection;

    let stream = videoElement.srcObject;
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            socket.emit("candidate", id, event.candidate);
        }
    };

    peerConnection
        .createOffer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
            socket.emit("offer", id, peerConnection.localDescription);
        });
});

socket.on("candidate", (id, candidate) => {
    peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});

socket.on("disconnectPeer", id => {
    peerConnections[id].close();
    delete peerConnections[id];
});

window.onunload = window.onbeforeunload = () => {
    socket.close();
};

// Get camera and microphone
const videoElement = document.getElementById("video");
const audioSelect = document.querySelector("select#audioSource");
const videoSelect = document.querySelector("select#videoSource");

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

getStream()
    .then(getDevices)
    .then(gotDevices);

function getDevices() {
    return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
    window.deviceInfos = deviceInfos;
    for (const deviceInfo of deviceInfos) {
        const option = document.createElement("option");
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === "audioinput") {
            option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
            audioSelect.appendChild(option);
        } else if (deviceInfo.kind === "videoinput") {
            option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
            videoSelect.appendChild(option);
        }
    }
    // Add screen share option
    let screenOption = document.createElement("option");
    screenOption.text = "Screen Share";
    screenOption.value = "screen";
    videoSelect.appendChild(screenOption);
}

function getStream() {
    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }
    const audioSource = audioSelect.value;
    const videoSource = videoSelect.value;

    if (videoSource === "screen") {
        const displayConstraints = {
            video: {
                mediaSource: "screen",
                width: { max: '1920' },
                height: { max: '1080' },
                frameRate: { max: '10' }
            }
        };
        return navigator.mediaDevices
            .getDisplayMedia(displayConstraints)
            .then(addAudio)
            .then(gotStream)
            .catch(handleError);
    }

    const constraints = {
        audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
        video: {deviceId: videoSource ? {exact: videoSource} : undefined},
    };

    return navigator.mediaDevices
        .getUserMedia(constraints)
        .then(gotStream)
        .catch(handleError);

}

async function addAudio(stream) {
    const audioSource = audioSelect.value;
    const constraints = {
        audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
        video: false,
    };
    let audioStream = await navigator.mediaDevices.getUserMedia(constraints);
    let audioTrack = audioStream.getAudioTracks()[0];
    stream.addTrack(audioTrack);
    return stream;
}

function gotStream(stream) {
    window.stream = stream;
    audioSelect.selectedIndex = [...audioSelect.options].findIndex(
        option => option.text === stream.getAudioTracks()[0].label
    );
    videoSelect.selectedIndex = [...videoSelect.options].findIndex(
        option => option.text === stream.getVideoTracks()[0].label
    );
    if (videoSelect.selectedIndex === -1) {
        // find index of screen share
        videoSelect.selectedIndex = [...videoSelect.options].findIndex(
            option => option.text === "Screen Share"
        );
    }
    console.log(videoSelect.options);
    console.log(videoSelect.selectedIndex);
    videoElement.srcObject = stream;
    videoElement.play();
    socket.emit("broadcaster");
}

function handleError(error) {
    console.error("Error: ", error);
}