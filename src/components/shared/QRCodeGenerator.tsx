"use client";

import { QRCodeSVG } from "qrcode.react";

export function QRCodeGenerator({ value, size = 128 }: { value: string; size?: number }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-md inline-block">
      <QRCodeSVG 
        value={value} 
        size={size} 
        level="Q" 
        includeMargin={false} 
        fgColor="#08080C"
      />
    </div>
  );
}
