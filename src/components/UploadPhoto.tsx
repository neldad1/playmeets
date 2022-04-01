import { ChangeEvent, useEffect, useState } from 'react';
import { FileUpload, FlexRowLeft } from './Components.styled';

interface UploadPhotoProps {
  setImgUrl(url: string): void;
}
const UploadPhoto = ({ setImgUrl }: UploadPhotoProps) => {
  const [file, setFile] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState('Start Upload');

  const onInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile((event.target as HTMLInputElement).files?.[0]);
  };

  useEffect(() => {
    if (!file) return;
    uploadFileInCloudinary();
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

  // onChange(info: any) {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     displayMessage(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     displayError(`${info.file.name} file upload failed.`);
  //   }
  // }

  return (
    <FlexRowLeft>
      <FileUpload
        type="file"
        onChange={onInputFileChange}
        title="Upload a photo"
        disabled={Boolean(file) || uploadStatus === 'Uploading'}
      />
      {/* {<Button
        type="default"
        disabled={!Boolean(file) || uploadStatus === 'Uploaded'}
        onClick={onUploadButtonClick}
        icon={<UploadOutlined />}
      >
        {uploadStatus}
      </Button> */}
      {/* <Upload name="file" customRequest={uploadFileInCloudinary} /> */}
    </FlexRowLeft>
  );
};

export default UploadPhoto;
