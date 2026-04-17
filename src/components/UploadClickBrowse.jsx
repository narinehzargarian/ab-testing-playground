/**
 * UploadClickBrowse — Click-to-browse variant for the upload experience experiment.
 *
 * A simple centered card with a file input button. Uses a hidden <input type="file">
 * triggered by a React Spectrum Button click. On file select, simulates an upload.
 */

import { useState, useRef } from 'react';
import { View, Text, Flex, Button, ProgressBar } from '@adobe/react-spectrum';

export default function UploadClickBrowse({ onUpload }) {
  const [uploadState, setUploadState] = useState('idle'); // 'idle' | 'uploading' | 'done'
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedName = e.target.files?.[0]?.name || 'document.pdf';
    setFileName(selectedName);
    setUploadState('uploading');

    setTimeout(() => {
      setUploadState('done');
      onUpload?.(selectedName);
    }, 1500);
  };

  return (
    <div className="upload-browse-card">
      <Flex direction="column" alignItems="center" gap="size-200">
        {uploadState === 'idle' && (
          <>
            <Text UNSAFE_className="upload-icon" UNSAFE_style={{ display: 'block' }}>📁</Text>
            <Text UNSAFE_style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              Select Your PDF
            </Text>
            <Text UNSAFE_style={{ display: 'block', fontSize: '14px', color: '#888' }}>
              Click the button below to browse your files
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
