"use client";

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoveUp, Paperclip } from "lucide-react"
import { FileUploader } from "@/components/ui/file-uploader";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AnimatedButton, MovingBorder } from "@/components/custom/moving-border";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";
import { set } from "zod";

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 1000);

  const { toast } = useToast();

  const handleFileUpload = (files: File[]) => {
    console.log("Handling file upload", files);
    setFiles(files);
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Text input changed: ", e.target.value);
    setText(e.target.value);
  }

  const connectToSSE = (route: string) => {
    console.log("Connecting to SSE at: ", route);
    const eventSource = new EventSource(route);

    eventSource.onmessage = function(event) {
      console.log("SSE Event received: ", event.data);
    }

    eventSource.onerror = function(event) {
      console.error("SSE Error: ", event);
      eventSource.close();
    }
  }

  const uploadFile = async (file: File, requestId: string) => {
    setUploading(true);

    const response = await fetch(`http:5000/upload/chunk/init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        filename: file.name,
        size: file.size,
        mimeType: file.type,
        requestId: requestId
      })
    });
    
    const { id, chunkSize } = await response.json();
    
    const chunks = [];
    for (let i = 0; i < file.size; i += chunkSize) {
      chunks.push(file.slice(i, i + chunkSize));
    }
    
    let success = false;
    for (let i = 0; i < chunks.length; i++) {
      const formData = new FormData();
      formData.append('chunk', chunks[i]);
      formData.append('uploadId', id);
      formData.append('chunkIndex', i.toString());
      formData.append('totalChunks', chunks.length.toString());
      
      const response = await fetch(`${baseAPI}/upload/chunk`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        console.log(`Failed to upload chunk ${i}`);
      }

      if (response.status === 201) {
        success = true;
        break;
      }
    }

    setUploading(false);

    return success;
  }

  const handleSubmit = async () => {
    if (!text) {
      toast({
        title: "Something went wrong",
        description: "Please enter a valid text",
        variant: 'destructive'
      });
      return;
    }

    if (files.length === 0 || !files[0]) {
      toast({
        title: "Something went wrong",
        description: "Please upload a file",
        variant: 'destructive'
      });
      return;
    }

    setText("");

    connectToSSE("http://localhost:5000/sse/transform");
    const success = await uploadFile(files[0], "");
    if (success) {
      
    }

    toast({
      description: "Your request has been sent",
    });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed, submitting form");
      handleSubmit();
    }
  }

  
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br to-accent/20 w-full lg:mt-14">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} 
        />
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="inline-block bg-accent px-4 py-2 rounded-full text-sm font-medium tracking-wide">
              AI-Powered File Transformation
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform Your Files with AI
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Convert, transform and optimize your files instantly using our advanced AI assistant
            </p>
            <div className="md:mt-12 mt-6 py-4 flex flex-col items-center">
              <HoverBorderGradient 
                className="relative w-full md:max-w-lg sm:max-w-md max-w-sm mx-auto"
                as="div"
              >
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  className="rounded-full py-6 sm:pl-6 pl-4 w-[calc(100%-5rem)] focus-visible:ring-transparent"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  size="icon"
                  className={cn("absolute right-12 top-1/2 -translate-y-1/2 rounded-full h-8 w-8")}
                  onClick={handleSubmit}
                  variant="ghost"
                >
                  <Paperclip size={24} />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!text}
                  className={cn("absolute right-2 top-1/2 -translate-y-1/2 bg-primary rounded-full h-8 w-8 dark:text-white", { "bg-muted dark:text-gray-500": !text })}
                  onClick={handleSubmit}
                >
                  <motion.div
                    animate={{
                      scale: text ? [1, 1.1, 1] : 1,
                      rotate: text ? [0, 10, 0] : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <MoveUp size={24} />
                  </motion.div>
                </Button>
              </HoverBorderGradient>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
