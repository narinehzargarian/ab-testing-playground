/**
 * UploadCombined — Combined variant for the upload experience experiment.
 *
 * A drop zone (like DragDrop) that also has a "Browse Files" button inside it.
 * Both drag-and-drop and click-to-browse work in this variant.
 */

import { useState, useRef } from 'react';
import { View, Text, Flex, Button, ProgressBar } from '@adobe/react-spectrum';

export default function UploadCombined({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); // 'idle' | 'uploading' | 'done'
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const simulateUpload = (name) => {
    setFileName(name);
    setUploadState('uploading');

    setTimeout(() => {
      setUploadState('done');
      onUpload?.(name);
    }, 1500);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedName = e.dataTransfer.files?.[0]?.name || 'document.pdf';
    simulateUpload(droppedName);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedName = e.target.files?.[0]?.name || 'document.pdf';
    simulateUpload(selectedName);
  };

  const zoneClass = [
    'upload-dropzone',
    isDragging ? 'upload-dropzone-active' : '',
    uploadState === 'done' ? 'upload-dropzone-done' : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={zoneClass}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Flex direction="column" alignItems="center" gap="size-200">
        {uploadState === 'idle' && (
          <>
            <Text UNSAFE_className="upload-icon" UNSAFE_style={{ display: 'block' }}>📄</Text>
            <Text UNSAFE_style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              Drag & Drop or Browse
            </Text>
            <Text UNSAFE_style={{ display: 'block', fontSize: '14px', color: '#888' }}>
              Drop a file here or click the button below
            </Text>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              style={{ display: 'none' }}
            />
            <Button variant="accent" style="fill" onPress={handleButtonClick}>
              Browse Files
            </Button>
          </>
        )}

        {uploadState === 'uploading' && (
          <>
            <Text UNSAFE_className="upload-icon" UNSAFE_style={{ display: 'block' }}>⏳</Text>
            <Text UNSAFE_style={{ display: 'block', fontSize: '16px', color: '#333' }}>
              Uploading...
            </Text>
            <View width="size-3000">
              <ProgressBar label="Uploading..." isIndeterminate />
            </View>
            <Text UNSAFE_className="upload-file-name">{fileName}</Text>
          </>
        )}

        {uploadState === 'done' && (
          <>
            <Text UNSAFE_className="upload-icon" UNSAFE_style={{ display: 'block' }}>✅</Text>
            <Text UNSAFE_className="upload-success" UNSAFE_style={{ display: 'block' }}>
              Upload Complete!
            </Text>
            <Text UNSAFE_className="upload-file-name">{fileName}</Text>
          </>
        )}
      </Flex>
    </div>
  );
}
