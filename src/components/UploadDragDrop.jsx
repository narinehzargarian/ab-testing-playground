/**
 * UploadDragDrop — Control variant for the upload experience experiment.
 *
 * This is the drag-and-drop only upload experience. Users drag files
 * onto a large dashed-border drop zone. On drag over, the zone highlights.
 * On drop, a simulated upload runs with a progress bar, then shows success.
 */

import { useState } from 'react';
import { View, Text, Flex, ProgressBar } from '@adobe/react-spectrum';

export default function UploadDragDrop({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); // 'idle' | 'uploading' | 'done'
  const [fileName, setFileName] = useState('');

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
    setFileName(droppedName);
    setUploadState('uploading');

    setTimeout(() => {
      setUploadState('done');
      onUpload?.(droppedName);
    }, 1500);
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
              Drag & Drop Your PDF Here
            </Text>
            <Text UNSAFE_style={{ display: 'block', fontSize: '14px', color: '#888' }}>
              Drop a file onto this area to upload
            </Text>
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
