import { ChangeEvent, useEffect, useState } from 'react';
import { FileUpload, FlexBlock, Label } from './Components.styled';

interface UploadPhotoProps {
  setImgUrl(url: string): void;
}
const UploadPhoto = ({ setImgUrl }: UploadPhotoProps) => {
  const [file, setFile] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState('');

  const onInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile((event.target as HTMLInputElement).files?.[0]);
  };

  useEffect(() => {
    if (!file) return;
    uploadFileInCloudinary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const uploadFileInCloudinary = () => {
    const formData = new FormData();
    formData.append('file', file as any);
    formData.append('upload_preset', 'pm-preset');
    setUploadStatus('Uploading...');
    fetch('https://api.cloudinary.com/v1_1/playmeets/upload', {
      method: 'post',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImgUrl(data.secure_url);
        setUploadStatus('Uploaded');
      });
  };

  return (
    <FlexBlock>
      <FileUpload
        type="file"
        onChange={onInputFileChange}
        title="Upload a photo"
        disabled={Boolean(file) || uploadStatus === 'Uploading'}
      />
      <Label>{uploadStatus}</Label>
      {/* {<Button
        type="default"
        disabled={!Boolean(file) || uploadStatus === 'Uploaded'}
        onClick={onUploadButtonClick}
        icon={<UploadOutlined />}
      >
        {uploadStatus}
      </Button> */}
      {/* <Upload name="file" customRequest={uploadFileInCloudinary} /> */}
    </FlexBlock>
  );
};

export default UploadPhoto;
