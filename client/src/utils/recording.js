//I don't use this module. I used hook instead

let mediaRecorder = null;
let mediaChunks = [];
let mediaType = null;

const audioConstraints = {
  audio: {
    echoCancellation: true,
    autoGainControl: true,
    noSupperssion: true,
    channelCount: 2,
  },
};

const videoConstraints = {
  ...audioConstraints,
  video: {
    width: 1920,
    height: 1080,
    frameRate: 60,
  },
};

const isRecordingStarted = () => !!mediaRecorder;

const pauseRecording = () => {
  mediaRecorder.pause();
};

//continue recording
const resumeRecording = () => {
  mediaRecorder.resume();
};

const startRecording = async (recordType) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(
      recordType === "video" ? videoConstraints : audioConstraints
    );
    mediaType = recordType;

    mediaRecorder = new MediaRecorder(stream, {
      mimeType: `${mediaType}/webm`,
    });
    mediaRecorder.ondataavailable = ({ data }) => {
      mediaChunks.push(data);
    };

    mediaRecorder.start(500);

    return stream;

  } catch (error) {
    console.error(error);
  }
};

const stopRecording = () => {
  mediaRecorder.stop();
  mediaRecorder.stream.getTracks().forEach((streamTrack) => {
    streamTrack.stop();
  });

  const file = new File(mediaChunks, "my_record.webm", {
    type: `${mediaType}/webm`,
  });

  //avoid memory leaks
  mediaRecorder.ondataavailable = null;
  mediaRecorder = null;
  mediaChunks = [];

  return file;
};

export {
  isRecordingStarted,
  pauseRecording,
  resumeRecording,
  startRecording,
  stopRecording,
};
