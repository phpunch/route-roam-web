import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  transform: translateY(-0%);
`;
const DropContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  height: 200px;
  border: 4px dashed #4aa1f3;
`;

const DropMessage = styled.div`
  text-align: center;
  color: #4aa1f3;
  font-family: Arial;
  font-size: 20px;
`;

const FileDisplayContainer = styled.div`
`;
const FileStatusBar = styled.div`
  width: 100%;
  vertical-align: top;
  margin-top: 10px;
  margin-bottom: 20px;
  position: relative;
  line-height: 50px;
  height: 50px;
`;

const FileType = styled.div`
  display: inline-block !important;
  position: absolute;
  font-size: 12px;
  font-weight: 700;
  line-height: 13px;
  margin-top: 25px;
  padding: 0 4px;
  border-radius: 2px;
  box-shadow: 1px 1px 2px #abc;
  color: #fff;
  background: #0080c8;
  text-transform: uppercase;
`;

const FileName = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 50px;
  color: #4aa1f3;
`;
const FileError = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 50px;
  color: #9aa9bb;
`;
const FileErrorMessage = styled.div`
  color: red;
`;
const FileSize = styled.div`
  display: inline-block;
  vertical-align: top;
  color: #30693d;
  margin-left: 10px;
  margin-right: 5px;
  margin-left: 10px;
  color: #444242;
  font-weight: 700;
  font-size: 14px;
`;
const FileRemove = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  line-height: 15px;
  cursor: pointer;
  color: red;
  margin-right: -10px;
`;

const Modal = styled.div`
  z-index: 999;
  display: none;
  overflow: hidden;
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.66);
  position: absolute;
  top: 0;
  left: 0;
`;

const ModalImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  object-fit: cover;
  width: 100%;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ModalClose = styled.div`
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
`;

const fileSize = (size) => {
  if (size === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const fileType = (fileName) => {
  return (
    fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) ||
    fileName
  );
};

const validateFile = (file) => {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/x-icon',
  ];
  if (validTypes.indexOf(file.type) === -1) {
    return false;
  }
  return true;
};

interface DropZoneInterface {
  setCanSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  validFiles: File[];
  setValidFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const DropZone: React.FunctionComponent<DropZoneInterface> = ({
  setCanSubmit,
  validFiles,
  setValidFiles,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidFiles, setInvalidFiles] = useState([]);
  const modalImageRef = useRef<HTMLDivElement>();
  const modalRef = useRef<HTMLDivElement>();

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

  useEffect(() => {
    if (invalidFiles.length > 0) {
      setCanSubmit(false);
      return;
    }
    setCanSubmit(true);
  }, [invalidFiles]);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files: FileList = e.dataTransfer.files;
    console.log(files);
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i]['invalid'] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage('File type not permitted');
        setInvalidFiles([...invalidFiles, files[i]]);
      }
    }
  };

  const removeFile = (name) => {
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    if (selectedFiles[selectedFileIndex]['invalid']) {
      const invalidFileIndex = invalidFiles.findIndex((e) => e.name === name);
      invalidFiles.splice(invalidFileIndex, 1);
      setInvalidFiles([...invalidFiles]);
    } else {
      const validFileIndex = validFiles.findIndex((e) => e.name === name);
      validFiles.splice(validFileIndex, 1);
      setValidFiles([...validFiles]);
    }

    selectedFiles.splice(selectedFileIndex, 1);
    setSelectedFiles([...selectedFiles]);
  };

  const openImageModal = (file) => {
    const reader = new FileReader();
    modalRef.current.style.display = 'block';
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };
  const closeModal = () => {
    modalRef.current.style.display = 'none';
    modalImageRef.current.style.backgroundImage = 'none';
  };

  return (
    <>
      <Container>
        <DropContainer
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <DropMessage>
            <div className="upload-icon"></div>
            Drag & Drop files here or click to upload
          </DropMessage>
        </DropContainer>
        <FileDisplayContainer>
          {validFiles.map((data, i) => (
            <FileStatusBar>
              <div
                onClick={
                  !data['invalid']
                    ? () => openImageModal(data)
                    : () => removeFile(data.name)
                }
              >
                <div className="file-type-logo"></div>
                <FileType>{fileType(data.name)}</FileType>
                <FileName>{data.name}</FileName>
                <FileSize>({fileSize(data.size)})</FileSize>{' '}
                {data['invalid'] && (
                  <FileErrorMessage>({errorMessage})</FileErrorMessage>
                )}
              </div>
              <FileRemove onClick={() => removeFile(data.name)}>X</FileRemove>
            </FileStatusBar>
          ))}
        </FileDisplayContainer>
      </Container>
      <Modal ref={modalRef}>
        <ModalOverlay></ModalOverlay>
        <ModalClose onClick={() => closeModal()}>X</ModalClose>
        <ModalImage ref={modalImageRef}></ModalImage>
      </Modal>
    </>
  );
};
export default DropZone;
