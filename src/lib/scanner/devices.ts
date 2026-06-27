export interface CameraDevice {
  id: string;
  label: string;
  facing?: "front" | "back" | "environment" | "user";
}

export async function getAvailableCameras(): Promise<CameraDevice[]> {
  if (!navigator.mediaDevices?.enumerateDevices) return [];
  
  try {
    await navigator.mediaDevices.getUserMedia({ video: true }).then(s => s.getTracks().forEach(t => t.stop()));
    
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(d => d.kind === "videoinput");
    
    return videoDevices.map((d, i) => ({
      id: d.deviceId,
      label: d.label || `Camera ${i + 1}`,
      facing: d.label.toLowerCase().includes("back") || d.label.toLowerCase().includes("rear")
        ? "environment" : d.label.toLowerCase().includes("front") ? "user" : undefined,
    }));
  } catch {
    return [];
  }
}

export async function requestCameraPermission(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach(t => t.stop());
    return true;
  } catch {
    return false;
  }
}
