import { useFormikContext } from "formik";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useToast } from "./Toast";
import Webcam from "react-webcam";
import { Button } from "../shad-cn/button";
import { cn } from "../../lib/utils";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};


async function checkCameraPermission() {
  try {
  
    const permissionStatus = await navigator.permissions.query({ name: 'camera' });  
    if (permissionStatus.state === 'denied') return false
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    if (videoDevices.length === 0) return false;
    return true;
    
  } catch (error) {
    return false;
  }
}

const CameraCapture = ({keyName}:{keyName:keyof FormInitValueType})=>{
  const [isCameraOn,setIsCameraOn] = useState(false);
  const webcamRef = useRef<RefObject<Webcam>>(null);
  const {showToast}  = useToast();
  const {setFieldValue,values:{photo},touched,errors} = useFormikContext<FormInitValueType>();
  const error = touched[keyName] && errors[keyName];
  const errorMessage = touched[keyName] ? errors[keyName] : null;

  const capture = useCallback(() => {
    const imageSrc = (webcamRef as unknown as RefObject<Webcam>).current.getScreenshot();
    photoSetter(imageSrc);
    
  },[webcamRef]);


  const startCamera = async()=>{
    if(!isCameraOn){
      const isPermitted = await checkCameraPermission();
      if(isPermitted) setIsCameraOn(true);
      else showToast({message:'Unable to access camera',variant:'error'});
    }else {
      setIsCameraOn(false);
    } 
  }

  const photoSetter=(link : null | string)=>setFieldValue(keyName,link);
  const retry = ()=>photoSetter(null);

useEffect(()=>{
  checkCameraPermission();
},[])

  return <div className="relative">
    <div className={cn("w-[20rem] h-[11.4rem] border-amber-400 border-2 !rounded-[var(--radius)] overflow-hidden",error && 'border-destructive')}>

      {photo && <ImagePreview src={photo}/>}

      {!photo && isCameraOn && <Webcam
        audio={false}
        ref={webcamRef as any}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />}
    </div>
    {errorMessage && <div className="text-[0.8rem] absolute text-destructive">{errorMessage + '*'}</div>}
    <div className="flex gap-5 items-center">

      {photo && <Button className="w-full flex-1 mt-9 py-5.5" onClick={retry}>Retry</Button>}

      {!photo && <>
        <Button className="w-full flex-1 mt-9 py-5.5" onClick={startCamera}>{!isCameraOn ? 'Start' : 'Stop'} Camera</Button>
        {isCameraOn && !photo && <Button className="w-full flex-1 mt-9 py-5.5 bg-green-500 text-white" onClick={capture}>Capture</Button>}
      </>}
    </div>

  </div>
}

const ImagePreview = ({src}:{src:string})=>{
  return <img src={src} className="h-full w-full object-fill"/>
}

export default CameraCapture;