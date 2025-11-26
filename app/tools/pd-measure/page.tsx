'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Upload, Check, Copy, AlertCircle, Move, Camera, CreditCard, Eye } from 'lucide-react';

interface Marker {
  id: string;
  x: number;
  y: number;
  color: string;
  label: string;
}

const CREDIT_CARD_WIDTH_MM = 85.6;

export default function PDMeasurePage() {
  const [image, setImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [referenceWidth, setReferenceWidth] = useState(CREDIT_CARD_WIDTH_MM);
  const [pdResult, setPdResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeMarkerRef = useRef<string | null>(null);
  
  const [markers, setMarkers] = useState<Marker[]>([
    { id: 'cardLeft', x: 0.25, y: 0.7, color: '#EAB308', label: 'Card Left' },
    { id: 'cardRight', x: 0.75, y: 0.7, color: '#EAB308', label: 'Card Right' },
    { id: 'pupilLeft', x: 0.35, y: 0.35, color: '#3B82F6', label: 'Left Pupil' },
    { id: 'pupilRight', x: 0.65, y: 0.35, color: '#3B82F6', label: 'Right Pupil' },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setImageLoaded(false);
      setPdResult(null);
      setError(null);
      setStep(2);
    };
    reader.readAsDataURL(file);
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = img.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    markers.forEach((marker) => {
      const x = marker.x * canvas.width;
      const y = marker.y * canvas.height;
      
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fillStyle = marker.color + '40';
      ctx.fill();
      ctx.strokeStyle = marker.color;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = marker.color;
      ctx.fill();

      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#1f2937';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      const textX = x + 15;
      const textY = y + 4;
      ctx.strokeText(marker.label, textX, textY);
      ctx.fillText(marker.label, textX, textY);
    });

    const cardLeft = markers.find(m => m.id === 'cardLeft')!;
    const cardRight = markers.find(m => m.id === 'cardRight')!;
    ctx.beginPath();
    ctx.moveTo(cardLeft.x * canvas.width, cardLeft.y * canvas.height);
    ctx.lineTo(cardRight.x * canvas.width, cardRight.y * canvas.height);
    ctx.strokeStyle = '#EAB308';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    const pupilLeft = markers.find(m => m.id === 'pupilLeft')!;
    const pupilRight = markers.find(m => m.id === 'pupilRight')!;
    ctx.beginPath();
    ctx.moveTo(pupilLeft.x * canvas.width, pupilLeft.y * canvas.height);
    ctx.lineTo(pupilRight.x * canvas.width, pupilRight.y * canvas.height);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [markers, imageLoaded]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    const handleResize = () => {
      drawCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawCanvas]);

  const getEventPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const pos = getEventPos(e);
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (const marker of markers) {
      const dx = (marker.x - pos.x) * canvas.width;
      const dy = (marker.y - pos.y) * canvas.height;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 20) {
        activeMarkerRef.current = marker.id;
        return;
      }
    }
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!activeMarkerRef.current) return;
    e.preventDefault();
    
    const pos = getEventPos(e);
    const clampedX = Math.max(0.02, Math.min(0.98, pos.x));
    const clampedY = Math.max(0.02, Math.min(0.98, pos.y));
    
    setMarkers(prev => prev.map(m => 
      m.id === activeMarkerRef.current 
        ? { ...m, x: clampedX, y: clampedY }
        : m
    ));
  };

  const handlePointerUp = () => {
    activeMarkerRef.current = null;
  };

  const calculatePD = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cardLeft = markers.find(m => m.id === 'cardLeft')!;
    const cardRight = markers.find(m => m.id === 'cardRight')!;
    const pupilLeft = markers.find(m => m.id === 'pupilLeft')!;
    const pupilRight = markers.find(m => m.id === 'pupilRight')!;

    const cardWidthPx = Math.sqrt(
      Math.pow((cardRight.x - cardLeft.x) * canvas.width, 2) +
      Math.pow((cardRight.y - cardLeft.y) * canvas.height, 2)
    );

    const pupilWidthPx = Math.sqrt(
      Math.pow((pupilRight.x - pupilLeft.x) * canvas.width, 2) +
      Math.pow((pupilRight.y - pupilLeft.y) * canvas.height, 2)
    );

    if (cardWidthPx < 20) {
      setError('Card markers are too close together. Please adjust them.');
      return;
    }

    if (pupilWidthPx < 10) {
      setError('Pupil markers are too close together. Please adjust them.');
      return;
    }

    const mmPerPixel = referenceWidth / cardWidthPx;
    const pdMm = pupilWidthPx * mmPerPixel;
    const pdRounded = Math.round(pdMm * 10) / 10;

    if (pdRounded < 40 || pdRounded > 80) {
      setError(`Calculated PD (${pdRounded}mm) seems unusual. Typical adult PD is 54-74mm. Please verify your markers.`);
    } else {
      setError(null);
    }

    setPdResult(pdRounded);
    setStep(4);
  };

  const handleCopy = async () => {
    if (pdResult === null) return;
    try {
      await navigator.clipboard.writeText(pdResult.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const steps = [
    { num: 1, label: 'Upload Photo', icon: Camera },
    { num: 2, label: 'Set Scale', icon: CreditCard },
    { num: 3, label: 'Mark Pupils', icon: Eye },
    { num: 4, label: 'Get PD', icon: Check },
  ];

  return (
    <>
      <Navbar />
      
      <title>Free Online PD Measurement Tool - Measure Pupillary Distance</title>
      <meta name="description" content="Free online tool to measure your pupillary distance (PD) using a selfie and a credit card reference. No sign-up, no app, completely free and private." />
      <meta property="og:title" content="Free Online PD Measurement Tool" />
      <meta property="og:description" content="Measure your pupillary distance online using a selfie and credit card reference. Free, private, no sign-up required." />
      <meta property="og:type" content="website" />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online PD Measurement Tool",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Measure your pupillary distance (PD) online using a selfie and a credit card as a reference. 100% free and private.",
            "featureList": [
              "Upload selfie photo",
              "Use credit card as size reference",
              "Drag markers to mark pupils",
              "Calculate PD in millimeters",
              "100% client-side processing"
            ]
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is pupillary distance (PD)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pupillary distance (PD) is the distance in millimeters between the centers of your pupils. It's essential for ordering prescription glasses online to ensure the optical centers of the lenses align with your eyes."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate is this online PD tool?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This tool provides an approximate measurement suitable for most standard prescriptions. For complex prescriptions or progressive lenses, we recommend getting your PD measured by an optician."
                }
              },
              {
                "@type": "Question",
                "name": "Why do I need a credit card for PD measurement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A credit card has a standard width of 85.6mm worldwide. By using it as a reference object in your photo, the tool can calculate the real-world scale and accurately measure your pupillary distance."
                }
              },
              {
                "@type": "Question",
                "name": "Is my photo saved or uploaded anywhere?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. All processing happens entirely in your browser. Your photo is never uploaded to any server, ensuring complete privacy."
                }
              },
              {
                "@type": "Question",
                "name": "What is a normal PD measurement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Adult PD typically ranges from 54mm to 74mm, with the average being around 63mm. Children's PD is usually between 43mm and 58mm."
                }
              }
            ]
          })
        }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Free Online PD Measurement Tool
          </h1>
          <p className="text-xl text-stone-600 mb-2">
            Measure Your Pupillary Distance Online
          </p>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Upload a selfie with a credit card under your nose to measure your PD for online glasses orders. No app, no sign-up, 100% free and private.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 md:p-8 mb-8">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 md:gap-4">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    step >= s.num 
                      ? 'bg-yellow-500 text-stone-900' 
                      : 'bg-stone-100 text-stone-500'
                  }`}>
                    <s.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{s.label}</span>
                    <span className="md:hidden">{s.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-6 md:w-10 h-0.5 mx-1 ${
                      step > s.num ? 'bg-yellow-500' : 'bg-stone-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {!image ? (
            <div className="text-center">
              <h2 className="text-lg font-semibold text-stone-800 mb-4">
                Step 1: Upload a Front-Facing Selfie
              </h2>
              <div className="bg-stone-50 rounded-xl p-6 mb-6 max-w-md mx-auto">
                <h3 className="font-medium text-stone-700 mb-3">Photo Tips:</h3>
                <ul className="text-sm text-stone-600 text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Face the camera straight on
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Remove your glasses
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Good, even lighting on your face
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Hold a credit card horizontally under your nose
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Keep the camera at arm&apos;s length (avoid distortion)
                  </li>
                </ul>
              </div>
              
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-semibold rounded-full cursor-pointer transition-all">
                <Upload className="w-5 h-5" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                {step === 2 && (
                  <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold text-stone-800 mb-2">
                      Step 2: Set the Scale Reference
                    </h2>
                    <p className="text-stone-600 text-sm mb-3">
                      Drag the <span className="text-yellow-600 font-semibold">yellow markers</span> to the left and right edges of your credit card.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <label className="text-sm text-stone-600">Reference width:</label>
                      <input
                        type="number"
                        value={referenceWidth}
                        onChange={(e) => setReferenceWidth(parseFloat(e.target.value) || CREDIT_CARD_WIDTH_MM)}
                        className="w-24 px-3 py-1.5 border border-stone-300 rounded-lg text-center text-sm"
                        step="0.1"
                      />
                      <span className="text-sm text-stone-500">mm</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1">Standard credit card = 85.6mm</p>
                    <button
                      onClick={() => setStep(3)}
                      className="mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-semibold rounded-full transition-all"
                    >
                      Next: Mark Pupils
                    </button>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold text-stone-800 mb-2">
                      Step 3: Mark Your Pupils
                    </h2>
                    <p className="text-stone-600 text-sm mb-4">
                      Drag the <span className="text-blue-600 font-semibold">blue markers</span> to the center of each pupil.
                    </p>
                    <button
                      onClick={calculatePD}
                      className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-semibold rounded-full transition-all"
                    >
                      Calculate My PD
                    </button>
                  </div>
                )}

                {step === 4 && pdResult !== null && (
                  <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold text-stone-800 mb-4">
                      Your Pupillary Distance
                    </h2>
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-2xl p-6 max-w-sm mx-auto">
                      <div className="text-5xl font-bold text-stone-900 mb-2">
                        {pdResult} <span className="text-2xl text-stone-600">mm</span>
                      </div>
                      <p className="text-sm text-stone-600 mb-4">
                        This is your approximate binocular PD
                      </p>
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-full transition-all"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy PD'}
                      </button>
                    </div>
                    <p className="text-xs text-stone-500 mt-4 max-w-md mx-auto">
                      This is an approximate measurement. For medical use or complex prescriptions, please consult your optician.
                    </p>
                    <button
                      onClick={() => {
                        setStep(2);
                        setPdResult(null);
                      }}
                      className="mt-3 text-sm text-stone-600 hover:text-stone-900 underline"
                    >
                      Re-measure
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div 
                ref={containerRef}
                className="relative mx-auto max-w-xl bg-stone-100 rounded-xl overflow-hidden"
              >
                <img
                  ref={imageRef}
                  src={image}
                  alt="Your selfie for PD measurement"
                  className="w-full h-auto block"
                  onLoad={() => {
                    setImageLoaded(true);
                    setTimeout(drawCanvas, 50);
                  }}
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full cursor-move touch-none"
                  onMouseDown={handlePointerDown}
                  onMouseMove={handlePointerMove}
                  onMouseUp={handlePointerUp}
                  onMouseLeave={handlePointerUp}
                  onTouchStart={handlePointerDown}
                  onTouchMove={handlePointerMove}
                  onTouchEnd={handlePointerUp}
                />
              </div>

              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>Card edges (scale reference)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Pupil centers</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-stone-400">
                <Move className="w-3.5 h-3.5" />
                Drag markers to adjust positions
              </div>

              <div className="text-center mt-6">
                <label className="text-sm text-stone-500 hover:text-stone-700 cursor-pointer underline">
                  Upload a different photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="bg-stone-900 rounded-2xl p-8 md:p-12 text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Build Tools Like This & Monetize Them
          </h2>
          <p className="text-stone-300 mb-6 max-w-xl mx-auto">
            VCM OS and APE (Auto Paywall Everything) let you launch and monetize your own online tools with paywalls, tips, and subscriptions—no coding required.
          </p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-semibold rounded-full transition-all"
          >
            Explore VCM OS & APE
          </Link>
        </div>

        <div className="prose prose-stone max-w-none">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            What Is Pupillary Distance (PD)?
          </h2>
          <p className="text-stone-600 mb-6">
            Pupillary distance (PD) is the measurement in millimeters between the centers of your pupils. This measurement is essential when ordering prescription glasses online because it ensures the optical centers of the lenses align perfectly with your eyes. An incorrect PD can cause eye strain, headaches, and blurred vision.
          </p>
          <p className="text-stone-600 mb-6">
            There are two types of PD measurements: <strong>binocular PD</strong> (the total distance between both pupils) and <strong>monocular PD</strong> (the distance from each pupil to the center of your nose). Most online eyewear retailers accept a single binocular PD measurement, which is what this tool provides.
          </p>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            How This Online PD Measurement Tool Works
          </h2>
          <p className="text-stone-600 mb-4">
            This free online tool to measure PD uses a simple principle: by including a known reference object in your photo (a standard credit card), we can calculate the real-world scale of everything in the image. Here&apos;s how it works:
          </p>
          <ol className="list-decimal list-inside text-stone-600 mb-6 space-y-2">
            <li>You upload a front-facing selfie with a credit card held horizontally under your nose</li>
            <li>You drag the yellow markers to the left and right edges of the card</li>
            <li>You drag the blue markers to the center of each pupil</li>
            <li>The tool calculates your PD based on the known card width (85.6mm)</li>
          </ol>
          <p className="text-stone-600 mb-6">
            <strong>Privacy note:</strong> All processing happens entirely in your browser. Your photo is never uploaded to any server—it stays on your device.
          </p>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            How Accurate Is an Online PD Tool?
          </h2>
          <p className="text-stone-600 mb-6">
            This online PD measurement tool provides an approximate measurement that&apos;s suitable for most standard single-vision prescriptions. The accuracy depends on several factors: photo quality, how straight you&apos;re facing the camera, and how precisely you place the markers.
          </p>
          <p className="text-stone-600 mb-6">
            For most people ordering standard glasses online, this measurement is sufficient. However, if you have a complex prescription, are ordering progressive lenses, or need precise measurements for specialty eyewear, we recommend having your PD measured by a licensed optician.
          </p>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            Tips for Getting the Most Accurate PD Measurement
          </h2>
          <ul className="list-disc list-inside text-stone-600 mb-6 space-y-2">
            <li>Use a high-resolution photo with good lighting</li>
            <li>Face the camera directly—don&apos;t tilt your head</li>
            <li>Remove your glasses before taking the photo</li>
            <li>Use a real credit card or standard-sized card (85.6mm wide)</li>
            <li>Hold the card level, parallel to your face</li>
            <li>Keep the camera at arm&apos;s length to avoid wide-angle distortion</li>
            <li>Look directly at the camera lens, not the screen</li>
            <li>Take multiple measurements and average the results</li>
          </ul>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            What Is a Normal PD Measurement?
          </h2>
          <p className="text-stone-600 mb-6">
            Adult pupillary distance typically ranges from <strong>54mm to 74mm</strong>, with the average adult PD being around <strong>63mm</strong>. Women tend to have slightly smaller PDs (averaging 62mm) compared to men (averaging 64mm). Children&apos;s PD typically ranges from 43mm to 58mm.
          </p>
          <p className="text-stone-600 mb-6">
            If your measured PD falls significantly outside the normal range (below 50mm or above 75mm for adults), you may want to retake your photo and measurement to ensure accuracy.
          </p>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 mb-10">
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">What is pupillary distance (PD)?</h3>
              <p className="text-stone-600 text-sm">
                Pupillary distance is the distance in millimeters between the centers of your pupils. It&apos;s essential for ordering prescription glasses online to ensure proper lens alignment.
              </p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">How accurate is this online PD tool?</h3>
              <p className="text-stone-600 text-sm">
                This tool provides an approximate measurement suitable for most standard prescriptions. For complex prescriptions or progressive lenses, consult an optician.
              </p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">Why do I need a credit card?</h3>
              <p className="text-stone-600 text-sm">
                A credit card has a standard width of 85.6mm worldwide. By using it as a reference, the tool can calculate real-world measurements from your photo.
              </p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">Is my photo saved or uploaded?</h3>
              <p className="text-stone-600 text-sm">
                No. All processing happens entirely in your browser. Your photo never leaves your device, ensuring complete privacy.
              </p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">What is a normal PD?</h3>
              <p className="text-stone-600 text-sm">
                Adult PD typically ranges from 54-74mm, with an average around 63mm. Children&apos;s PD is usually 43-58mm.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
            <strong>Disclaimer:</strong> This tool is provided for informational purposes only and is not a substitute for a professional eye exam or optician measurement. For medical use or complex prescriptions, always consult a licensed eye care professional.
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-stone-500">
          <p className="mb-3">Part of the VCM creator tools stack. Build and monetize tools like this with APE and VCM OS.</p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/tools/gif-compressor" className="hover:text-stone-700">GIF Compressor</Link>
            <Link href="/tools/image-compressor" className="hover:text-stone-700">Image Compressor</Link>
            <Link href="/tools/word-counter" className="hover:text-stone-700">Word Counter</Link>
            <Link href="/store" className="hover:text-stone-700">VCM Store</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
