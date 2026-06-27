import { create } from "zustand";
import type {
  QRState, ExportFormat, QRDataType, PlatformId, TextMode, CodeType, BarcodeFormat,
} from "@/types/qr";
import { cardThemes } from "@/qr/themes";

const defaultTheme = cardThemes[0];

interface QRActions {
  setCodeType: (type: CodeType) => void;
  setData: (data: string) => void;
  setUrl: (url: string) => void;
  setUsername: (username: string) => void;
  setPlatform: (platform: PlatformId) => void;
  setTheme: (themeId: string) => void;
  setColors: (colors: string[]) => void;
  setModuleSize: (size: number) => void;
  setDotSize: (size: number) => void;
  setErrorCorrection: (ec: "L" | "M" | "Q" | "H") => void;
  setQRType: (type: QRDataType) => void;
  setBackground: (bg: string) => void;
  setDownloadFormat: (fmt: ExportFormat) => void;
  setTextMode: (mode: TextMode) => void;
  setCustomText: (text: string) => void;
  setUppercase: (val: boolean) => void;
  setLogo: (logo?: string) => void;
  setBarcodeFormat: (fmt: BarcodeFormat) => void;
  setBarcodeShowText: (val: boolean) => void;
  setBarcodeHeight: (h: number) => void;
  setBarcodeWidth: (w: number) => void;
  setBarcodeCardTheme: (id: string) => void;
  setScannerFlash: (val: boolean) => void;
  setScannerActiveCamera: (id: string) => void;
  reset: () => void;
}

const initialState: QRState = {
  codeType: "qr",
  data: "",
  url: "",
  username: "",
  platform: "none",
  theme: "instagram",
  colors: defaultTheme.qrColors,
  moduleSize: 10,
  dotSize: 7,
  errorCorrection: "H",
  qrType: "url",
  background: "#FFFFFF",
  downloadFormat: "png",
  textMode: "username",
  customText: "",
  uppercase: true,
  barcodeFormat: "CODE128",
  barcodeShowText: true,
  barcodeHeight: 80,
  barcodeWidth: 2,
  barcodeCardTheme: "classic",
  scannerFlash: false,
  scannerActiveCamera: "",
};

export const useQRStore = create<QRState & QRActions>((set) => ({
  ...initialState,
  setCodeType: (codeType) => set({ codeType }),
  setData: (data) => set({ data }),
  setUrl: (url) => set({ url, data: url }),
  setUsername: (username) => set({ username }),
  setPlatform: (platform) => set({ platform }),
  setTheme: (themeId) => {
    const theme = cardThemes.find((t) => t.id === themeId);
    if (theme) set({ theme: themeId, colors: theme.qrColors });
  },
  setColors: (colors) => set({ colors }),
  setModuleSize: (moduleSize) => set({ moduleSize }),
  setDotSize: (dotSize) => set({ dotSize }),
  setErrorCorrection: (errorCorrection) => set({ errorCorrection }),
  setQRType: (qrType) => set({ qrType }),
  setBackground: (background) => set({ background }),
  setDownloadFormat: (downloadFormat) => set({ downloadFormat }),
  setTextMode: (textMode) => set({ textMode }),
  setCustomText: (customText) => set({ customText }),
  setUppercase: (uppercase) => set({ uppercase }),
  setLogo: (logo) => set({ logo }),
  setBarcodeFormat: (barcodeFormat) => set({ barcodeFormat }),
  setBarcodeShowText: (barcodeShowText) => set({ barcodeShowText }),
  setBarcodeHeight: (barcodeHeight) => set({ barcodeHeight }),
  setBarcodeWidth: (barcodeWidth) => set({ barcodeWidth }),
  setBarcodeCardTheme: (barcodeCardTheme) => set({ barcodeCardTheme }),
  setScannerFlash: (scannerFlash) => set({ scannerFlash }),
  setScannerActiveCamera: (scannerActiveCamera) => set({ scannerActiveCamera }),
  reset: () => set(initialState),
}));
