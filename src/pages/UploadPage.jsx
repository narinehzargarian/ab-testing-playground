/**
 * UploadPage — runs the upload experience experiment (exp_upload_experience).
 *
 * Based on the assigned variant, renders one of three upload components:
 * - Drag & Drop only (control)
 * - Click to Browse only
 * - Combined (drag-drop + browse button)
 *
 * On successful upload, tracks a conversion event with the file name.
 */

import { useEffect } from 'react';
import { Heading, Text, View, Flex } from '@adobe/react-spectrum';
import { useExperiment } from '../experimentation/useExperiment';
import { useTracking } from '../experimentation/useTracking';
import UploadDragDrop from '../components/UploadDragDrop';
import UploadClickBrowse from '../components/UploadClickBrowse';
import UploadCombined from '../components/UploadCombined';

export default function UploadPage() {
  const { trackPageView } = useTracking();
  const { variant, experiment, trackConversion } = useExperiment('exp_upload_experience');

  useEffect(() => {
    trackPageView('upload');
  }, []);

  const uploadStyle = variant?.props?.uploadStyle || 'drag-drop';

  const handleUpload = (fileName) => {
    trackConversion({ action: 'upload_complete', fileName });
  };

  const renderUploadComponent = () => {
    switch (uploadStyle) {
      case 'click-browse':
        return <UploadClickBrowse onUpload={handleUpload} />;
      case 'combined':
        return <UploadCombined onUpload={handleUpload} />;
      case 'drag-drop':
      default:
        return <UploadDragDrop onUpload={handleUpload} />;
    }
  };

  return (
    <View UNSAFE_className="upload-page" padding="size-500">
      <Flex direction="column" alignItems="center" gap="size-400">
        <Heading level={1} margin={0}>Upload Your PDF</Heading>
        <Text UNSAFE_style={{ display: 'block', color: '#666', textAlign: 'center', maxWidth: '400px' }}>
          Upload a PDF file to get started with conversion, compression, and editing tools.
        </Text>

        {renderUploadComponent()}

        {variant && (
          <View UNSAFE_className="variant-badge" UNSAFE_style={{ background: 'rgba(0,0,0,0.05)', borderColor: 'rgba(0,0,0,0.2)' }}>
            <Text UNSAFE_className="variant-badge-text" UNSAFE_style={{ color: '#888' }}>
              Experiment: exp_upload_experience | Variant: {uploadStyle}
            </Text>
          </View>
        )}
      </Flex>
    </View>
  );
}
