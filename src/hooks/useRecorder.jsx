import { useEffect, useState } from "react";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audio, setAudio] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [blob, setBlob] = useState(false);
  const [permissions, setPermissions] = useState(false);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then((data) => {
          if (data?.error) {
            setPermissions(false);
            return;
          }

          setPermissions(true), setRecorder(data), console.error;
        });
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder?.start();
    } else {
      //
      recorder.stream.getTracks().forEach((track) => track.stop());
      recorder?.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      setBlob(
        new Blob([e.data], {
          type: "audio/mp3",
        })
      );

      setAudioURL(URL.createObjectURL(e.data));
      setAudio(new Audio(URL.createObjectURL(e.data)));
      setRecorder(null);
    };

    recorder?.addEventListener("dataavailable", handleData);
    return () => recorder?.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }
  }, [audio]);

  return { audioURL, isRecording, startRecording, stopRecording, playing, toggle, audio, blob, recorder, permissions };
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => stream)
    .catch((err) => {
      console.error(`You got an error: ${err}`);
    });

  if (!stream) {
    return { error: true };
  } else {
    return new MediaRecorder(stream);
  }

  //
}
export default useRecorder;
